/**
 * WhisperLive v0.8 streaming client.
 *
 * Protocol:
 *   1. Send config: {"uid":"...", "language":"en", "task":"transcribe", "initial_prompt":"..."}
 *   2. Server: {"uid":"...", "message":"SERVER_READY", "backend":"faster_whisper"}
 *   3. Stream raw PCM as float32 (16kHz mono) — server expects np.float32
 *   4. Server: {"uid":"...", "segments": [{"text":"...", "start":0, "end":1.5}]}
 *   5. Close WS when done
 *
 * Inspired by Claude Code's voice_stream + useVoice pattern:
 *   - Callback-driven: onTranscript(text, isFinal) for each segment update
 *   - Accumulates finalized text internally
 *   - Tracks latest interim separately for live preview
 */

import { WebSocket } from "ws";

export interface Segment {
  text: string;
  start: number;
  end: number;
  completed?: boolean;
}

export type TranscriptCallback = (text: string, isFinal: boolean) => void;

export class WhisperLiveClient {
  private ws: WebSocket | null = null;
  private uid: string;
  private ready = false;

  // Accumulated finalized text (like Claude Code's accumulatedRef)
  private accumulated = "";
  // Latest segment text (interim, may be updated)
  private lastSegmentText = "";
  // Track which segments we've already finalized
  private lastCompletedCount = 0;

  constructor(
    private url: string,
    private opts?: { initialPrompt?: string },
    private onTranscript?: TranscriptCallback,
  ) {
    this.uid = `pi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  get isReady(): boolean {
    return this.ready;
  }

  /** Full transcript: all accumulated finals + latest interim. */
  get transcript(): string {
    const interim = this.lastSegmentText.trim();
    return [this.accumulated, interim].filter(Boolean).join(" ");
  }

  /** Just the latest interim text (for live preview). */
  get partial(): string {
    return this.lastSegmentText.trim();
  }

  /** Just the accumulated final text (no interim). */
  get finalized(): string {
    return this.accumulated.trim();
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      const timeout = setTimeout(() => {
        this.ws?.close();
        reject(new Error("WhisperLive connection timeout"));
      }, 5000);

      this.ws.on("open", () => {
        this.ws!.send(JSON.stringify({
          uid: this.uid,
          language: "en",
          task: "transcribe",
          use_vad: false,
          initial_prompt: this.opts?.initialPrompt || undefined,
        }));
      });

      this.ws.on("message", (raw: Buffer) => {
        try {
          const msg = JSON.parse(raw.toString());

          if (msg.message === "SERVER_READY") {
            clearTimeout(timeout);
            this.ready = true;
            resolve();
            return;
          }

          if (msg.segments && Array.isArray(msg.segments)) {
            this.handleSegments(msg.segments as Segment[]);
          }
        } catch {}
      });

      this.ws.on("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });

      this.ws.on("close", () => {
        clearTimeout(timeout);
        this.ws = null;
      });
    });
  }

  /**
   * Process segment updates from the server.
   *
   * WhisperLive sends the full segment list each time. The last segment
   * is the current (possibly incomplete) one; earlier segments are finalized.
   * When a segment has completed:true, it's done being updated.
   *
   * This mirrors Claude Code's onTranscript(text, isFinal) pattern:
   *   - Newly finalized segments → onTranscript(text, true)
   *   - Updated interim segment → onTranscript(text, false)
   */
  private handleSegments(segments: Segment[]): void {
    if (segments.length === 0) return;

    // Count completed segments — any new ones since last time are finals
    const completedCount = segments.filter(s => s.completed).length;

    // Emit finals for newly completed segments
    if (completedCount > this.lastCompletedCount) {
      for (let i = this.lastCompletedCount; i < completedCount; i++) {
        const text = segments[i]?.text?.trim();
        if (text) {
          if (this.accumulated) this.accumulated += " ";
          this.accumulated += text;
          this.onTranscript?.(text, true);
        }
      }
      this.lastCompletedCount = completedCount;
    }

    // Update the latest interim (last segment, regardless of completed status)
    const latest = segments[segments.length - 1];
    const interimText = latest?.text?.trim() || "";

    // Only emit as interim if it changed
    if (interimText !== this.lastSegmentText) {
      this.lastSegmentText = interimText;
      if (interimText) {
        this.onTranscript?.(interimText, false);
      }
    }
  }

  /** Convert int16 PCM to float32 and send. */
  sendAudio(chunk: Buffer): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN || !this.ready) return;
    const int16 = new Int16Array(chunk.buffer, chunk.byteOffset, chunk.byteLength / 2);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768;
    }
    this.ws.send(Buffer.from(float32.buffer));
  }

  /**
   * Close the connection and return the final transcript.
   * Waits for the server to flush any remaining segments.
   */
  async finalize(): Promise<string> {
    // Promote any remaining interim to final
    if (this.lastSegmentText.trim()) {
      if (this.accumulated) this.accumulated += " ";
      this.accumulated += this.lastSegmentText.trim();
      this.lastSegmentText = "";
    }

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return this.accumulated.trim();
    }

    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.ws?.close();
        resolve(this.accumulated.trim());
      }, 3000);

      this.ws!.on("close", () => {
        clearTimeout(timer);
        resolve(this.accumulated.trim());
      });

      try { this.ws!.close(); } catch {
        clearTimeout(timer);
        resolve(this.accumulated.trim());
      }
    });
  }

  close(): void {
    this.ws?.close();
    this.ws = null;
    this.ready = false;
  }
}

/** Check if WhisperLive server is reachable. */
export async function checkWhisperLive(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const ws = new WebSocket(url);
      const t = setTimeout(() => { ws.close(); resolve(false); }, 2000);
      ws.on("open", () => { clearTimeout(t); ws.close(); resolve(true); });
      ws.on("error", () => { clearTimeout(t); resolve(false); });
    } catch { resolve(false); }
  });
}
