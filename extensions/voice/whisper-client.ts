/**
 * WhisperLive v0.8 streaming client.
 *
 * Protocol:
 *   1. Send config: {"uid":"...", "language":"en", "task":"transcribe", "initial_prompt":"..."}
 *   2. Server: {"uid":"...", "message":"SERVER_READY", "backend":"faster_whisper"}
 *   3. Stream raw PCM as float32 (16kHz mono) — server expects np.float32, NOT int16
 *   4. Server: {"uid":"...", "segments": [{"text":"...", "start":0, "end":1.5}]}
 *   5. Close WS when done
 *
 * Usage:
 *   const client = new WhisperLiveClient("ws://localhost:4190/asr");
 *   await client.connect();
 *   client.sendAudio(pcmBuffer);
 *   const text = await client.finalize();
 */

import { WebSocket } from "ws";

export interface Segment {
  text: string;
  start: number;
  end: number;
}

export class WhisperLiveClient {
  private ws: WebSocket | null = null;
  private segments: Segment[] = [];
  private lastSegmentText = "";
  private ready = false;
  private uid: string;

  constructor(private url: string, private opts?: { initialPrompt?: string }) {
    this.uid = `pi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  get isReady(): boolean {
    return this.ready;
  }

  /** Current full transcript (finalized segments + latest partial). */
  get transcript(): string {
    const finalized = this.segments.slice(0, -1).map(s => s.text.trim()).filter(Boolean).join(" ");
    const latest = this.lastSegmentText.trim();
    return [finalized, latest].filter(Boolean).join(" ");
  }

  /** Latest partial text (for live preview). */
  get partial(): string {
    return this.lastSegmentText.trim();
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
          use_vad: false,  // base model VAD is too aggressive, strips real speech
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
            this.segments = msg.segments;
            if (msg.segments.length > 0) {
              this.lastSegmentText = msg.segments[msg.segments.length - 1].text || "";
            }
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

  /** Convert int16 PCM to float32 and send. Server expects np.float32. */
  sendAudio(chunk: Buffer): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN || !this.ready) return;
    // arecord gives us int16 LE. WhisperLive expects float32.
    const int16 = new Int16Array(chunk.buffer, chunk.byteOffset, chunk.byteLength / 2);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768;  // normalize to [-1.0, 1.0]
    }
    this.ws.send(Buffer.from(float32.buffer));
  }

  async finalize(): Promise<string> {
    const text = this.transcript;
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return text;
    }

    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.ws?.close();
        resolve(this.transcript);
      }, 3000);

      this.ws!.on("close", () => {
        clearTimeout(timer);
        resolve(this.transcript);
      });

      try { this.ws!.close(); } catch {
        clearTimeout(timer);
        resolve(text);
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
