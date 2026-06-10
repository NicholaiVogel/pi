/**
 * Voice Dictation — Streaming STT for pi.
 *
 * Hold Space to record, release to transcribe and insert.
 * Uses WhisperLive (faster-whisper) over WebSocket for streaming STT.
 * Falls back to whisper CLI if the server is unavailable.
 *
 * How hold-to-talk works (same as Claude Code):
 *   Terminal auto-repeat sends space every 30-80ms when held.
 *   We count rapid spaces — 5+ within 120ms gaps = hold intent.
 *   First 2 spaces flow to the input normally (single tap types space).
 *   On activation, warmup spaces are stripped and recording starts.
 *   On release (auto-repeat stops), recording stops and text is inserted.
 *
 * Prerequisites:
 *   docker compose -f ~/.local/share/whisper-live/docker-compose.yml up -d
 */

import { spawn, execSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { WebSocket } from "ws";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// ─── Config ──────────────────────────────────────────────────────────

const STT_URL = process.env.WHISPER_LIVE_URL || "ws://127.0.0.1:4190/asr";
const SAMPLE_RATE = 16000;

// Hold detection thresholds (same as Claude Code)
const RAPID_KEY_GAP_MS = 120;      // max gap between repeats to count as "rapid"
const HOLD_THRESHOLD = 5;          // rapid presses to activate voice
const WARMUP_THRESHOLD = 2;        // chars that flow to input before swallow
const RELEASE_TIMEOUT_MS = 600;    // no repeat within this = key released

// ─── State ───────────────────────────────────────────────────────────

interface VoiceState {
  recording: boolean;
  recorder: ReturnType<typeof spawn> | null;
  chunks: Buffer[];
  ws: WebSocket | null;
  transcript: string;
  interim: string;
  serverAvailable: boolean | null;
  // Hold detection
  rapidCount: number;
  charsInInput: number;
  lastKeyTime: number;
  releaseTimer: ReturnType<typeof setTimeout> | null;
  isHoldActive: boolean;
  unsubscribe: (() => void) | null;
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
  unsubscribe: null,
};

// ─── Recorder ────────────────────────────────────────────────────────

function getRecorder(): { command: string; args: string[] } | null {
  try {
    execSync("which arecord", { encoding: "utf-8", stdio: "pipe" });
    return {
      command: "arecord",
      args: ["-q", "-f", "S16_LE", "-r", String(SAMPLE_RATE), "-c", "1", "-t", "raw"],
    };
  } catch {}
  try {
    execSync("which rec", { encoding: "utf-8", stdio: "pipe" });
    return {
      command: "rec",
      args: ["-q", "-r", String(SAMPLE_RATE), "-c", "1", "-b", "16", "-e", "signed-integer", "-t", "raw", "--buffer", "1024", "-"],
    };
  } catch {}
  return null;
}

// ─── Server check ────────────────────────────────────────────────────

function checkServer(): Promise<boolean> {
  if (state.serverAvailable !== null) return Promise.resolve(state.serverAvailable);
  return new Promise((resolve) => {
    try {
      const ws = new WebSocket(STT_URL);
      const timer = setTimeout(() => { ws.close(); state.serverAvailable = false; resolve(false); }, 2000);
      ws.on("open", () => { clearTimeout(timer); ws.close(); state.serverAvailable = true; resolve(true); });
      ws.on("error", () => { clearTimeout(timer); state.serverAvailable = false; resolve(false); });
    } catch { state.serverAvailable = false; resolve(false); }
  });
}

// ─── Streaming transcription via WhisperLive ─────────────────────────

function startStreamingTranscription(ctx: any): void {
  state.transcript = "";
  state.interim = "";

  const ws = new WebSocket(STT_URL);
  state.ws = ws;

  ws.on("open", () => {
    ws.send(JSON.stringify({ type: "config", data: { language: "en", task: "transcribe" } }));
  });

  ws.on("message", (raw: Buffer) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.type === "transcript" || msg.type === "partial") {
        const text = (msg.data || "").trim();
        if (text) {
          state.interim = text;
          ctx.ui.setStatus("voice", `🎙 ${text}`);
        }
      }
      if (msg.type === "final" || msg.type === "complete") {
        const text = (msg.data || "").trim();
        if (text) {
          state.transcript += (state.transcript ? " " : "") + text;
          state.interim = "";
        }
      }
    } catch {}
  });

  ws.on("error", () => {});
  ws.on("close", () => { state.ws = null; });
}

function streamAudioChunk(chunk: Buffer): void {
  if (state.ws?.readyState === WebSocket.OPEN) {
    state.ws.send(chunk);
  }
}

function finalizeStreaming(): Promise<string> {
  return new Promise((resolve) => {
    if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
      resolve(state.transcript || state.interim);
      return;
    }
    const timer = setTimeout(() => { state.ws?.close(); resolve(state.transcript || state.interim); }, 2000);
    state.ws.on("close", () => { clearTimeout(timer); resolve(state.transcript || state.interim); });
    try { state.ws.send(JSON.stringify({ type: "end" })); } catch { clearTimeout(timer); resolve(state.transcript || state.interim); }
  });
}

// ─── Fallback: file-based whisper CLI ────────────────────────────────

function buildWav(rawPcm: Buffer): Buffer {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + rawPcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(rawPcm.length, 40);
  return Buffer.concat([header, rawPcm]);
}

function transcribeWithWhisperCli(audioData: Buffer, ctx: any): void {
  const tmpPath = path.join(os.tmpdir(), `pi-voice-${Date.now()}.wav`);
  const baseName = path.basename(tmpPath, ".wav");
  const outDir = os.tmpdir();
  try { fs.writeFileSync(tmpPath, buildWav(audioData)); } catch (err: any) {
    ctx.ui.notify(`🎙 Write failed: ${err.message}`, "error");
    ctx.ui.setStatus("voice", undefined);
    return;
  }
  ctx.ui.setStatus("voice", "🎙 Transcribing (whisper CLI)…");
  const whisper = spawn("whisper", [
    tmpPath, "--model", "base.en", "--language", "en",
    "--output_format", "txt", "--output_dir", outDir,
    "--device", "cuda", "--verbose", "False",
  ], { stdio: "ignore" });
  whisper.on("close", (code) => {
    ctx.ui.setStatus("voice", undefined);
    if (code === 0) {
      try {
        const text = fs.readFileSync(path.join(outDir, `${baseName}.txt`), "utf-8").trim();
        if (text && ctx.hasUI) ctx.ui.pasteToEditor(text + " ");
        const preview = text.length > 80 ? text.slice(0, 80) + "…" : text;
        ctx.ui.notify(`🎙 "${preview}"`, "info");
      } catch {}
    } else { ctx.ui.notify(`🎙 Whisper exited ${code}`, "error"); }
    for (const ext of [".wav", ".txt", ".srt", ".vtt"]) { try { fs.unlinkSync(path.join(outDir, `${baseName}${ext}`)); } catch {} }
  });
  whisper.on("error", (err) => { ctx.ui.setStatus("voice", undefined); ctx.ui.notify(`🎙 Whisper failed: ${err.message}`, "error"); });
}

// ─── Core: start/stop recording ──────────────────────────────────────

async function startRecording(ctx: any): Promise<boolean> {
  const recorder = getRecorder();
  if (!recorder) { ctx.ui.notify("🎙 No audio recorder (install alsa-utils or sox)", "error"); return false; }
  state.chunks = [];
  const useStreaming = await checkServer();
  if (useStreaming) startStreamingTranscription(ctx);
  const proc = spawn(recorder.command, recorder.args, { stdio: ["ignore", "pipe", "ignore"] });
  proc.stdout.on("data", (chunk: Buffer) => { state.chunks.push(chunk); if (useStreaming) streamAudioChunk(chunk); });
  proc.on("error", () => { state.recording = false; state.recorder = null; ctx.ui.setStatus("voice", undefined); });
  proc.on("close", () => { state.recorder = null; });
  state.recorder = proc;
  state.recording = true;
  return true;
}

async function stopRecording(ctx: any): Promise<void> {
  if (!state.recorder) return;
  state.recorder.kill("SIGTERM");
  state.recorder = null;
  state.recording = false;

  const useStreaming = state.serverAvailable && state.ws;
  if (useStreaming) {
    ctx.ui.setStatus("voice", "🎙 Finalizing…");
    const text = await finalizeStreaming();
    ctx.ui.setStatus("voice", undefined);
    if (text && ctx.hasUI) ctx.ui.pasteToEditor(text + " ");
    const preview = text?.length > 80 ? text.slice(0, 80) + "…" : text;
    if (preview) ctx.ui.notify(`🎙 "${preview}"`, "info");
    else ctx.ui.notify("🎙 No speech detected.", "warning");
  } else {
    const audioData = Buffer.concat(state.chunks);
    state.chunks = [];
    if (audioData.length < 3200) { ctx.ui.notify("🎙 No speech detected (too short).", "warning"); ctx.ui.setStatus("voice", undefined); return; }
    transcribeWithWhisperCli(audioData, ctx);
  }
}

// ─── Hold-to-talk via onTerminalInput ────────────────────────────────
//
// Same approach as Claude Code: terminal auto-repeat sends space every
// 30-80ms when held. We count rapid presses. First 2 flow to the input
// (normal typing). At 5+ rapid presses, we activate voice and strip the
// warmup chars. Continued auto-repeat resets a release timer. When the
// timer fires (no repeat within RELEASE_TIMEOUT_MS), recording stops.
//
// We use onTerminalInput to intercept raw terminal data *before* the
// editor processes it, returning { consume: true } to swallow the space
// once recording is active.

function installHoldDetector(pi: ExtensionAPI): void {
  state.unsubscribe = pi.on("session_start", async (ctx: any) => {
    if (!ctx.hasUI) return;

    const unsub = ctx.ui.onTerminalInput((data: string) => {
      // Only intercept when NOT recording — during recording the editor
      // shouldn't see space at all.
      // We detect the space character in raw terminal input.
      // Terminal sends " " (0x20) for space press, and auto-repeat sends
      // it repeatedly when held.
      const isSpace = data === " " || data === "  ";
      if (!isSpace) return;

      const now = Date.now();

      // If recording is active (hold detected and ongoing), swallow
      // all space presses and reset the release timer.
      if (state.isHoldActive) {
        // Reset release timer on each auto-repeat
        if (state.releaseTimer) clearTimeout(state.releaseTimer);
        state.releaseTimer = setTimeout(() => {
          // Key released — stop recording
          state.releaseTimer = null;
          state.isHoldActive = false;
          stopRecording(ctx);
        }, RELEASE_TIMEOUT_MS);
        return { consume: true };
      }

      // Count rapid presses
      const gap = now - state.lastKeyTime;
      state.lastKeyTime = now;

      if (gap > RAPID_KEY_GAP_MS) {
        // Too slow — reset count (normal typing)
        state.rapidCount = 1;
        state.charsInInput = 1;
        return; // let this space through
      }

      state.rapidCount++;

      // First WARMUP_THRESHOLD spaces flow to input (normal typing)
      if (state.rapidCount <= WARMUP_THRESHOLD) {
        state.charsInInput++;
        return; // let through
      }

      // Between warmup and threshold — swallow but don't activate yet
      if (state.rapidCount < HOLD_THRESHOLD) {
        return { consume: true };
      }

      // HOLD_THRESHOLD reached — activate voice!
      state.isHoldActive = true;

      // Strip the warmup chars from the editor that flowed through
      const editorText = ctx.ui.getEditorText();
      let stripped = editorText;
      // Remove up to state.charsInInput trailing spaces from editor
      let toStrip = state.charsInInput;
      while (toStrip > 0 && stripped.endsWith(" ")) {
        stripped = stripped.slice(0, -1);
        toStrip--;
      }
      if (stripped !== editorText) {
        ctx.ui.setEditorText(stripped);
      }

      state.rapidCount = 0;
      state.charsInInput = 0;

      // Start recording
      startRecording(ctx).then((ok) => {
        if (ok) {
          ctx.ui.setStatus("voice", "🎙 Listening… release to transcribe");
          // Set up release timer
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

    // Store cleanup for session shutdown
    state.unsubscribe = unsub;
  });
}

// ─── Extension registration ──────────────────────────────────────────

export default function (pi: ExtensionAPI) {
  // Install hold-to-talk detector on session start
  installHoldDetector(pi);

  // /voice command for status and manual toggle
  pi.registerCommand("voice", {
    description: "Voice dictation: hold Space to record, or use this command to toggle",
    handler: async (args, ctx) => {
      const sub = args?.trim();

      if (sub === "status") {
        const recorder = getRecorder();
        const streaming = await checkServer();
        const parts: string[] = [];
        if (!recorder) parts.push("no recorder (alsa-utils/sox)");
        parts.push(streaming ? "WhisperLive streaming ✓" : "whisper CLI fallback");
        ctx.ui.notify(`🎙 ${recorder ? "recorder ✓" : ""} ${parts.join(" · ")}`, "info");
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

  pi.on("session_shutdown", async () => {
    if (state.releaseTimer) clearTimeout(state.releaseTimer);
    if (state.recorder) state.recorder.kill("SIGTERM");
    if (state.ws) state.ws.close();
    state.recording = false;
    state.isHoldActive = false;
    state.recorder = null;
    state.ws = null;
    state.chunks = [];
    state.rapidCount = 0;
    if (state.unsubscribe) state.unsubscribe();
  });
}
