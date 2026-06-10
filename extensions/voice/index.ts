/**
 * Voice Dictation — hold Space to record, release to transcribe.
 *
 * Uses WhisperLive (faster-whisper) for streaming STT,
 * falls back to whisper CLI if the server is down.
 *
 * Modules:
 *   voice/whisper-client.ts — WhisperLive WebSocket protocol
 *   voice/cleaner.ts        — transcript cleanup + initial_prompt
 *
 * Hold-to-talk (same as Claude Code):
 *   Terminal auto-repeat sends space every 30-80ms when held.
 *   5+ rapid spaces = hold intent. First 2 flow to input.
 *   Release detected when auto-repeat stops (600ms gap).
 */

import { spawn, execSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { WhisperLiveClient, checkWhisperLive } from "./whisper-client";
import { cleanTranscript, buildInitialPrompt } from "./cleaner";

const STT_URL = process.env.WHISPER_LIVE_URL || "ws://127.0.0.1:4190/asr";
const SAMPLE_RATE = 16000;
const RAPID_KEY_GAP_MS = 120;
const HOLD_THRESHOLD = 5;
const WARMUP_THRESHOLD = 2;
const RELEASE_TIMEOUT_MS = 600;

// ─── State ───────────────────────────────────────────────────────────

const state = {
  recording: false,
  recorder: null as ReturnType<typeof spawn> | null,
  chunks: [] as Buffer[],
  wsClient: null as WhisperLiveClient | null,
  serverAvailable: null as boolean | null,
  ctx: null as any,
  // Hold detection
  rapidCount: 0,
  charsInInput: 0,
  lastKeyTime: 0,
  releaseTimer: null as ReturnType<typeof setTimeout> | null,
  isHoldActive: false,
  unsubInput: null as (() => void) | null,
};

// ─── Recorder ────────────────────────────────────────────────────────

function getRecorder() {
  try { execSync("which arecord", { stdio: "pipe" }); return { command: "arecord", args: ["-q", "-f", "S16_LE", "-r", "16000", "-c", "1", "-t", "raw"] }; } catch {}
  try { execSync("which rec", { stdio: "pipe" }); return { command: "rec", args: ["-q", "-r", "16000", "-c", "1", "-b", "16", "-e", "signed-integer", "-t", "raw", "--buffer", "1024", "-"] }; } catch {}
  return null;
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
        const raw = fs.readFileSync(path.join(dir, `${base}.txt`), "utf-8").trim();
        const text = cleanTranscript(raw);
        if (text && ctx.hasUI) ctx.ui.pasteToEditor(text + " ");
        ctx.ui.notify(`🎙 "${text.length > 80 ? text.slice(0, 80) + "…" : text}"`, "info");
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
  state.serverAvailable ??= await checkWhisperLive(STT_URL);

  if (state.serverAvailable) {
    try {
      const prompt = buildInitialPrompt({ editorText: ctx.ui.getEditorText?.() });
      const client = new WhisperLiveClient(
        STT_URL,
        { initialPrompt: prompt },
        // Callback: update status bar on every segment update
        (_text, _isFinal) => {
          const preview = client.transcript;
          if (preview && ctx.hasUI) {
            ctx.ui.setStatus("voice", `🎙 ${preview.slice(-80)}`);
          }
        },
      );
      await client.connect();
      state.wsClient = client;
    } catch {
      state.serverAvailable = false;
      state.wsClient = null;
    }
  }

  const proc = spawn(rec.command, rec.args, { stdio: ["ignore", "pipe", "ignore"] });
  proc.stdout.on("data", (chunk: Buffer) => {
    state.chunks.push(chunk);
    state.wsClient?.sendAudio(chunk);
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

  if (state.wsClient) {
    ctx.ui.setStatus("voice", "🎙 Finalizing…");
    const raw = await state.wsClient.finalize();
    state.wsClient.close();
    state.wsClient = null;

    const text = cleanTranscript(raw);
    ctx.ui.setStatus("voice", undefined);

    if (text && ctx.hasUI) ctx.ui.pasteToEditor(text + " ");
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
    const isSpace = data.length > 0 && [...data].every(c => c === " ");
    if (!isSpace) return;

    const now = Date.now();
    const count = data.length;
    const gap = now - state.lastKeyTime;
    state.lastKeyTime = now;

    if (state.isHoldActive) {
      if (state.releaseTimer) clearTimeout(state.releaseTimer);
      state.releaseTimer = setTimeout(() => {
        state.releaseTimer = null;
        state.isHoldActive = false;
        stopRecording();
      }, RELEASE_TIMEOUT_MS);
      return { consume: true };
    }

    if (gap > RAPID_KEY_GAP_MS) {
      state.rapidCount = count;
      state.charsInInput = Math.min(count, WARMUP_THRESHOLD);
      return;
    }

    state.rapidCount += count;

    if (state.rapidCount <= WARMUP_THRESHOLD) {
      state.charsInInput = state.rapidCount;
      return;
    }

    if (state.rapidCount < HOLD_THRESHOLD) {
      return { consume: true };
    }

    state.isHoldActive = true;

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
      state.ctx = ctx;

      const sub = args?.trim();
      if (sub === "status") {
        const rec = getRecorder();
        state.serverAvailable ??= await checkWhisperLive(STT_URL);
        ctx.ui.notify(`🎙 ${rec ? "recorder ✓" : "no recorder"} · ${state.serverAvailable ? "streaming ✓" : "CLI fallback"}`, "info");
        return;
      }

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
    state.wsClient?.close();
    state.unsubInput?.();
    state.recording = false;
    state.isHoldActive = false;
    state.unsubInput = null;
  });
}
