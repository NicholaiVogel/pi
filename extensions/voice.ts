/**
 * Voice Dictation — debug build.
 * Tests what onTerminalInput actually receives for space presses.
 */

import { spawn, execSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { WebSocket } from "ws";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const STT_URL = process.env.WHISPER_LIVE_URL || "ws://127.0.0.1:4190/asr";
const SAMPLE_RATE = 16000;

// Hold detection thresholds
const RAPID_KEY_GAP_MS = 120;
const HOLD_THRESHOLD = 5;
const WARMUP_THRESHOLD = 2;
const RELEASE_TIMEOUT_MS = 600;

interface VoiceState {
  recording: boolean;
  recorder: ReturnType<typeof spawn> | null;
  chunks: Buffer[];
  ws: WebSocket | null;
  transcript: string;
  interim: string;
  serverAvailable: boolean | null;
  rapidCount: number;
  charsInInput: number;
  lastKeyTime: number;
  releaseTimer: ReturnType<typeof setTimeout> | null;
  isHoldActive: boolean;
  unsubInput: (() => void) | null;
}

const state: VoiceState = {
  recording: false,
  recorder: null,
  chunks: [],
  ws: null,
  transcript: "",
  interim: "",
  serverAvailable: null,
  rapidCount: 0,
  charsInInput: 0,
  lastKeyTime: 0,
  releaseTimer: null,
  isHoldActive: false,
  unsubInput: null,
};

function getRecorder() {
  try {
    execSync("which arecord", { encoding: "utf-8", stdio: "pipe" });
    return { command: "arecord", args: ["-q", "-f", "S16_LE", "-r", "16000", "-c", "1", "-t", "raw"] };
  } catch {}
  try {
    execSync("which rec", { encoding: "utf-8", stdio: "pipe" });
    return { command: "rec", args: ["-q", "-r", "16000", "-c", "1", "-b", "16", "-e", "signed-integer", "-t", "raw", "--buffer", "1024", "-"] };
  } catch {}
  return null;
}

function checkServer(): Promise<boolean> {
  if (state.serverAvailable !== null) return Promise.resolve(state.serverAvailable);
  return new Promise((resolve) => {
    try {
      const ws = new WebSocket(STT_URL);
      const t = setTimeout(() => { ws.close(); state.serverAvailable = false; resolve(false); }, 2000);
      ws.on("open", () => { clearTimeout(t); ws.close(); state.serverAvailable = true; resolve(true); });
      ws.on("error", () => { clearTimeout(t); state.serverAvailable = false; resolve(false); });
    } catch { state.serverAvailable = false; resolve(false); }
  });
}

function startStreaming(ctx: any): void {
  state.transcript = "";
  state.interim = "";
  const ws = new WebSocket(STT_URL);
  state.ws = ws;
  ws.on("open", () => { ws.send(JSON.stringify({ type: "config", data: { language: "en", task: "transcribe" } })); });
  ws.on("message", (raw: Buffer) => {
    try {
      const msg = JSON.parse(raw.toString());
      const text = (msg.data || "").trim();
      if (!text) return;
      if (msg.type === "transcript" || msg.type === "partial") { state.interim = text; ctx.ui.setStatus("voice", `🎙 ${text}`); }
      if (msg.type === "final" || msg.type === "complete") { state.transcript += (state.transcript ? " " : "") + text; state.interim = ""; }
    } catch {}
  });
  ws.on("error", () => {});
  ws.on("close", () => { state.ws = null; });
}

function buildWav(raw: Buffer): Buffer {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + raw.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(SAMPLE_RATE, 24); h.writeUInt32LE(SAMPLE_RATE * 2, 28);
  h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(raw.length, 40);
  return Buffer.concat([h, raw]);
}

function transcribeCli(audio: Buffer, ctx: any): void {
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

async function startRecording(ctx: any): Promise<boolean> {
  const rec = getRecorder();
  if (!rec) { ctx.ui.notify("🎙 No recorder", "error"); return false; }
  state.chunks = [];
  const stream = await checkServer();
  if (stream) startStreaming(ctx);
  const proc = spawn(rec.command, rec.args, { stdio: ["ignore", "pipe", "ignore"] });
  proc.stdout.on("data", (c: Buffer) => { state.chunks.push(c); if (stream && state.ws?.readyState === WebSocket.OPEN) state.ws.send(c); });
  proc.on("error", () => { state.recording = false; state.recorder = null; });
  proc.on("close", () => { state.recorder = null; });
  state.recorder = proc;
  state.recording = true;
  return true;
}

async function stopRecording(ctx: any): Promise<void> {
  state.recorder?.kill("SIGTERM");
  state.recorder = null;
  state.recording = false;
  const stream = state.serverAvailable && state.ws;
  if (stream) {
    ctx.ui.setStatus("voice", "🎙 Finalizing…");
    const text = await new Promise<string>((resolve) => {
      if (!state.ws || state.ws.readyState !== WebSocket.OPEN) { resolve(state.transcript || state.interim); return; }
      const t = setTimeout(() => { state.ws?.close(); resolve(state.transcript || state.interim); }, 2000);
      state.ws!.on("close", () => { clearTimeout(t); resolve(state.transcript || state.interim); });
      try { state.ws!.send(JSON.stringify({ type: "end" })); } catch { clearTimeout(t); resolve(state.transcript || state.interim); }
    });
    ctx.ui.setStatus("voice", undefined);
    if (text && ctx.hasUI) ctx.ui.pasteToEditor(text + " ");
    ctx.ui.notify(`🎙 "${(text || "nothing").slice(0, 80)}"`, text ? "info" : "warning");
  } else {
    const audio = Buffer.concat(state.chunks);
    state.chunks = [];
    if (audio.length < 3200) { ctx.ui.notify("🎙 Too short", "warning"); ctx.ui.setStatus("voice", undefined); return; }
    transcribeCli(audio, ctx);
  }
}

// ─── Terminal input handler ──────────────────────────────────────────
// Installed directly on pi — not inside session_start.
// We need ctx with ui, so we capture it from the first command invocation
// or from session_start.

let cachedCtx: any = null;

function installInputHandler(ctx: any) {
  if (state.unsubInput) return; // already installed
  if (!ctx?.ui?.onTerminalInput) return;

  cachedCtx = ctx;

  state.unsubInput = ctx.ui.onTerminalInput((data: string) => {
    // Debug: log what we receive for space-like input
    const isSpace = data === " " || data === "\x20" || (data.length > 0 && data.trim() === "" && [...data].every(c => c === " "));

    if (!isSpace) return;

    const now = Date.now();
    const count = data.length; // auto-repeat may batch: "   " = 3 spaces
    const gap = now - state.lastKeyTime;
    state.lastKeyTime = now;

    // Already recording — swallow and reset release timer
    if (state.isHoldActive) {
      if (state.releaseTimer) clearTimeout(state.releaseTimer);
      state.releaseTimer = setTimeout(() => {
        state.releaseTimer = null;
        state.isHoldActive = false;
        if (cachedCtx) stopRecording(cachedCtx);
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

    // Still in warmup phase — let through
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

    startRecording(ctx).then((ok) => {
      if (ok) {
        ctx.ui.setStatus("voice", "🎙 Listening…");
        ctx.ui.notify("🎙 Recording… release Space", "info");
        if (state.releaseTimer) clearTimeout(state.releaseTimer);
        state.releaseTimer = setTimeout(() => {
          state.releaseTimer = null;
          state.isHoldActive = false;
          stopRecording(ctx);
        }, RELEASE_TIMEOUT_MS);
      } else {
        state.isHoldActive = false;
      }
    });

    return { consume: true };
  });

  ctx.ui.notify("🎙 Voice hold-space detector installed", "info");
}

export default function (pi: ExtensionAPI) {
  // Install terminal input handler on session_start (has UI context)
  pi.on("session_start", (ctx: any) => {
    if (ctx.hasUI) installInputHandler(ctx);
  });

  // Also try on context event as fallback
  pi.on("context", (ctx: any) => {
    if (ctx.hasUI && !state.unsubInput) installInputHandler(ctx);
  });

  // /voice command
  pi.registerCommand("voice", {
    description: "Voice dictation: hold Space to record, or toggle manually",
    handler: async (args, ctx) => {
      // Install handler if not yet done (belt-and-suspenders)
      if (ctx.hasUI && !state.unsubInput) installInputHandler(ctx);

      const sub = args?.trim();
      if (sub === "status") {
        const rec = getRecorder();
        const stream = await checkServer();
        ctx.ui.notify(`🎙 ${rec ? "recorder ✓" : "no recorder"} · ${stream ? "streaming ✓" : "CLI fallback"}`, "info");
        return;
      }

      if (state.recording) {
        state.isHoldActive = false;
        await stopRecording(ctx);
      } else {
        const ok = await startRecording(ctx);
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
    state.recorder = null;
    state.ws = null;
    state.unsubInput = null;
  });
}
