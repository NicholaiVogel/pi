/**
 * Voice Dictation — Streaming STT for pi.
 *
 * Hold Space to record, release to transcribe and insert.
 * Uses WhisperLive (faster-whisper) over WebSocket for streaming STT.
 * Falls back to whisper CLI if the server is unavailable.
 *
 * WhisperLive v0.8 protocol:
 *   1. Send config: {"uid":"...", "language":"en", "task":"transcribe"}
 *   2. Server: {"uid":"...", "message":"SERVER_READY", "backend":"faster_whisper"}
 *   3. Stream raw PCM audio chunks
 *   4. Server: {"uid":"...", "segments": [{"text":"...", "start":0, "end":1.5}]}
 *   5. Close when done
 *
 * Hold-to-talk (same as Claude Code):
 *   Terminal auto-repeat sends space every 30-80ms when held.
 *   5+ rapid spaces within 120ms gaps = hold intent.
 *   First 2 spaces flow to input (single tap types normally).
 *   On activation, warmup spaces are stripped and recording starts.
 *   When auto-repeat stops (600ms gap), recording stops and text is inserted.
 */

import { spawn, execSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { WebSocket } from "ws";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const STT_URL = process.env.WHISPER_LIVE_URL || "ws://127.0.0.1:4190/asr";
const SAMPLE_RATE = 16000;
const RAPID_KEY_GAP_MS = 120;
const HOLD_THRESHOLD = 5;
const WARMUP_THRESHOLD = 2;
const RELEASE_TIMEOUT_MS = 600;

interface Segment { text: string; start: number; end: number; }

interface VoiceState {
  recording: boolean;
  recorder: ReturnType<typeof spawn> | null;
  chunks: Buffer[];
  ws: WebSocket | null;
  serverReady: boolean;
  segments: Segment[];
  lastSegmentText: string;
  serverAvailable: boolean | null;
  rapidCount: number;
  charsInInput: number;
  lastKeyTime: number;
  releaseTimer: ReturnType<typeof setTimeout> | null;
  isHoldActive: boolean;
  unsubInput: (() => void) | null;
  ctx: any;
}

const state: VoiceState = {
  recording: false,
  recorder: null,
  chunks: [],
  ws: null,
  serverReady: false,
  segments: [],
  lastSegmentText: "",
  serverAvailable: null,
  rapidCount: 0,
  charsInInput: 0,
  lastKeyTime: 0,
  releaseTimer: null,
  isHoldActive: false,
  unsubInput: null,
  ctx: null,
};

// ─── Recorder ────────────────────────────────────────────────────────

function getRecorder() {
  try { execSync("which arecord", { stdio: "pipe" }); return { command: "arecord", args: ["-q", "-f", "S16_LE", "-r", "16000", "-c", "1", "-t", "raw"] }; } catch {}
  try { execSync("which rec", { stdio: "pipe" }); return { command: "rec", args: ["-q", "-r", "16000", "-c", "1", "-b", "16", "-e", "signed-integer", "-t", "raw", "--buffer", "1024", "-"] }; } catch {}
  return null;
}

// ─── Server check ────────────────────────────────────────────────────

async function checkServer(): Promise<boolean> {
  if (state.serverAvailable !== null) return state.serverAvailable;
  return new Promise((resolve) => {
    try {
      const ws = new WebSocket(STT_URL);
      const t = setTimeout(() => { ws.close(); state.serverAvailable = false; resolve(false); }, 2000);
      ws.on("open", () => { clearTimeout(t); ws.close(); state.serverAvailable = true; resolve(true); });
      ws.on("error", () => { clearTimeout(t); state.serverAvailable = false; resolve(false); });
    } catch { state.serverAvailable = false; resolve(false); }
  });
}

// ─── Collect full transcript from segments ───────────────────────────
// WhisperLive sends segments incrementally. The last segment is often
// partial (being updated as more audio arrives). We accumulate finalized
// segments and track the latest (possibly incomplete) one separately.

function getFullTranscript(): string {
  const finalized = state.segments.slice(0, -1).map((s) => s.text.trim()).filter(Boolean).join(" ");
  const latest = state.lastSegmentText.trim();
  return [finalized, latest].filter(Boolean).join(" ");
}

// ─── Streaming STT via WhisperLive ───────────────────────────────────

function startStreaming(): void {
  state.segments = [];
  state.lastSegmentText = "";
  state.serverReady = false;

  const uid = `pi-${Date.now()}`;
  const ws = new WebSocket(STT_URL);
  state.ws = ws;

  ws.on("open", () => {
    ws.send(JSON.stringify({
      uid,
      language: "en",
      task: "transcribe",
      use_vad: true,
    }));
  });

  ws.on("message", (raw: Buffer) => {
    try {
      const msg = JSON.parse(raw.toString());

      // SERVER_READY
      if (msg.message === "SERVER_READY") {
        state.serverReady = true;
        return;
      }

      // Segments update
      if (msg.segments && Array.isArray(msg.segments)) {
        const segs: Segment[] = msg.segments;
        state.segments = segs;

        // The last segment is the latest (may be incomplete/updated)
        if (segs.length > 0) {
          state.lastSegmentText = segs[segs.length - 1].text || "";
        }

        // Show live preview in status bar
        const preview = getFullTranscript();
        if (preview && state.ctx) {
          state.ctx.ui.setStatus("voice", `🎙 ${preview.slice(-80)}`);
        }
      }
    } catch {}
  });

  ws.on("error", () => {});
  ws.on("close", () => { state.ws = null; });
}

function streamAudioChunk(chunk: Buffer): void {
  if (state.ws?.readyState === WebSocket.OPEN && state.serverReady) {
    state.ws.send(chunk);
  }
}

function finalizeStreaming(): Promise<string> {
  return new Promise((resolve) => {
    if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
      resolve(getFullTranscript());
      return;
    }
    const timer = setTimeout(() => { state.ws?.close(); resolve(getFullTranscript()); }, 3000);
    state.ws!.on("close", () => { clearTimeout(timer); resolve(getFullTranscript()); });
    // Just close — server will flush any remaining transcription
    try { state.ws!.close(); } catch { clearTimeout(timer); resolve(getFullTranscript()); }
  });
}

// ─── Fallback: whisper CLI ───────────────────────────────────────────

function buildWav(raw: Buffer): Buffer {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + raw.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(SAMPLE_RATE, 24); h.writeUInt32LE(SAMPLE_RATE * 2, 28);
  h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(raw.length, 40);
  return Buffer.concat([h, raw]);
}

function transcribeCli(audio: Buffer): void {
  const ctx = state.ctx;
  if (!ctx) return;
  const tmp = path.join(os.tmpdir(), `pi-voice-${Date.now()}.wav`);
  const base = path.basename(tmp, ".wav");
  const dir = os.tmpdir();
  try { fs.writeFileSync(tmp, buildWav(audio)); } catch (e: any) { ctx.ui.notify(`🎙 ${e.message}`, "error"); ctx.ui.setStatus("voice", undefined); return; }
  ctx.ui.setStatus("voice", "🎙 Transcribing (CLI)…");
  const w = spawn("whisper", [tmp, "--model", "base.en", "--language", "en", "--output_format", "txt", "--output_dir", dir, "--device", "cuda", "--verbose", "False"], { stdio: "ignore" });
  w.on("close", (code) => {
    ctx.ui.setStatus("voice", undefined);
    if (code === 0) {
      try {
        const t = fs.readFileSync(path.join(dir, `${base}.txt`), "utf-8").trim();
        if (t && ctx.hasUI) ctx.ui.pasteToEditor(t + " ");
        ctx.ui.notify(`🎙 "${t.length > 80 ? t.slice(0, 80) + "…" : t}"`, "info");
      } catch {}
    } else ctx.ui.notify(`🎙 Whisper ${code}`, "error");
    for (const e of [".wav", ".txt", ".srt", ".vtt"]) try { fs.unlinkSync(path.join(dir, `${base}${e}`)); } catch {}
  });
  w.on("error", (e) => { ctx.ui.setStatus("voice", undefined); ctx.ui.notify(`🎙 ${e.message}`, "error"); });
}

// ─── Core start/stop ─────────────────────────────────────────────────

async function startRecording(): Promise<boolean> {
  const ctx = state.ctx;
  if (!ctx) return false;
  const rec = getRecorder();
  if (!rec) { ctx.ui.notify("🎙 No recorder", "error"); return false; }

  state.chunks = [];
  const streaming = await checkServer();

  if (streaming) {
    startStreaming();
  }

  const proc = spawn(rec.command, rec.args, { stdio: ["ignore", "pipe", "ignore"] });
  proc.stdout.on("data", (chunk: Buffer) => {
    state.chunks.push(chunk);
    if (streaming) streamAudioChunk(chunk);
  });
  proc.on("error", () => { state.recording = false; state.recorder = null; ctx.ui.setStatus("voice", undefined); });
  proc.on("close", () => { state.recorder = null; });

  state.recorder = proc;
  state.recording = true;
  return true;
}

async function stopRecording(): Promise<void> {
  const ctx = state.ctx;
  if (!ctx) return;

  state.recorder?.kill("SIGTERM");
  state.recorder = null;
  state.recording = false;

  const streaming = state.serverAvailable && state.ws;

  if (streaming) {
    ctx.ui.setStatus("voice", "🎙 Finalizing…");
    const text = await finalizeStreaming();
    ctx.ui.setStatus("voice", undefined);

    if (text && ctx.hasUI) {
      ctx.ui.pasteToEditor(text + " ");
    }
    const preview = text?.length > 80 ? text.slice(0, 80) + "…" : text;
    ctx.ui.notify(preview ? `🎙 "${preview}"` : "🎙 No speech detected.", preview ? "info" : "warning");
  } else {
    const audio = Buffer.concat(state.chunks);
    state.chunks = [];
    if (audio.length < 3200) { ctx.ui.notify("🎙 Too short", "warning"); ctx.ui.setStatus("voice", undefined); return; }
    transcribeCli(audio);
  }
}

// ─── Terminal input hold detector ────────────────────────────────────

function installInputHandler(ctx: any) {
  if (state.unsubInput) return;
  if (!ctx?.ui?.onTerminalInput) return;
  state.ctx = ctx;

  state.unsubInput = ctx.ui.onTerminalInput((data: string) => {
    // Detect space: raw terminal data for space bar is " " (0x20)
    // Auto-repeat may batch: "   " = multiple spaces in one event
    const isSpace = data.length > 0 && [...data].every(c => c === " ");
    if (!isSpace) return;

    const now = Date.now();
    const count = data.length;
    const gap = now - state.lastKeyTime;
    state.lastKeyTime = now;

    // Already recording — swallow and reset release timer
    if (state.isHoldActive) {
      if (state.releaseTimer) clearTimeout(state.releaseTimer);
      state.releaseTimer = setTimeout(() => {
        state.releaseTimer = null;
        state.isHoldActive = false;
        stopRecording();
      }, RELEASE_TIMEOUT_MS);
      return { consume: true };
    }

    // Count rapid presses
    if (gap > RAPID_KEY_GAP_MS) {
      state.rapidCount = count;
      state.charsInInput = Math.min(count, WARMUP_THRESHOLD);
      return; // let through — normal typing
    }

    state.rapidCount += count;

    // Warmup phase — let through
    if (state.rapidCount <= WARMUP_THRESHOLD) {
      state.charsInInput = state.rapidCount;
      return;
    }

    // Between warmup and threshold — swallow
    if (state.rapidCount < HOLD_THRESHOLD) {
      return { consume: true };
    }

    // HOLD_THRESHOLD reached — activate!
    state.isHoldActive = true;

    // Strip warmup spaces from editor
    const text = ctx.ui.getEditorText();
    let stripped = text;
    let toStrip = state.charsInInput;
    while (toStrip > 0 && stripped.endsWith(" ")) { stripped = stripped.slice(0, -1); toStrip--; }
    if (stripped !== text) ctx.ui.setEditorText(stripped);

    state.rapidCount = 0;
    state.charsInInput = 0;

    startRecording().then((ok) => {
      if (ok) {
        ctx.ui.setStatus("voice", "🎙 Listening…");
        if (state.releaseTimer) clearTimeout(state.releaseTimer);
        state.releaseTimer = setTimeout(() => {
          state.releaseTimer = null;
          state.isHoldActive = false;
          stopRecording();
        }, RELEASE_TIMEOUT_MS);
      } else {
        state.isHoldActive = false;
      }
    });

    return { consume: true };
  });
}

// ─── Extension ───────────────────────────────────────────────────────

export default function (pi: ExtensionAPI) {
  pi.on("session_start", (ctx: any) => {
    if (ctx.hasUI) installInputHandler(ctx);
  });

  pi.on("context", (ctx: any) => {
    if (ctx.hasUI && !state.unsubInput) installInputHandler(ctx);
  });

  pi.registerCommand("voice", {
    description: "Voice dictation: hold Space to record, or toggle manually",
    handler: async (args, ctx) => {
      if (ctx.hasUI && !state.unsubInput) installInputHandler(ctx);

      const sub = args?.trim();
      if (sub === "status") {
        const rec = getRecorder();
        const stream = await checkServer();
        ctx.ui.notify(`🎙 ${rec ? "recorder ✓" : "no recorder"} · ${stream ? "streaming ✓" : "CLI fallback"}`, "info");
        return;
      }

      state.ctx = ctx;

      if (state.recording) {
        state.isHoldActive = false;
        await stopRecording();
      } else {
        const ok = await startRecording();
        if (ok) {
          ctx.ui.setStatus("voice", "🎙 Recording… /voice to stop");
          ctx.ui.notify("🎙 Recording… /voice to stop", "info");
        }
      }
    },
  });

  pi.on("session_shutdown", () => {
    if (state.releaseTimer) clearTimeout(state.releaseTimer);
    state.recorder?.kill("SIGTERM");
    state.ws?.close();
    state.unsubInput?.();
    state.recording = false;
    state.isHoldActive = false;
    state.unsubInput = null;
  });
}
