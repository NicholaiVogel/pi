/**
 * Voice Dictation — Streaming STT for pi.
 *
 * Hold Space to record, release to transcribe and insert.
 * Uses WhisperLive (faster-whisper) over WebSocket for streaming STT.
 * Falls back to whisper CLI if the server is unavailable.
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
const CHANNELS = 1;

// ─── State ───────────────────────────────────────────────────────────

interface VoiceState {
  recording: boolean;
  recorder: ReturnType<typeof spawn> | null;
  chunks: Buffer[];
  ws: WebSocket | null;
  transcript: string;
  interim: string;
  serverAvailable: boolean | null; // null = not checked
}

const state: VoiceState = {
  recording: false,
  recorder: null,
  chunks: [],
  ws: null,
  transcript: "",
  interim: "",
  serverAvailable: null,
};

// ─── Recorder ────────────────────────────────────────────────────────

function getRecorder(): { command: string; args: string[] } | null {
  try {
    execSync("which arecord", { encoding: "utf-8", stdio: "pipe" });
    return {
      command: "arecord",
      args: ["-q", "-f", "S16_LE", "-r", String(SAMPLE_RATE), "-c", String(CHANNELS), "-t", "raw"],
    };
  } catch {}

  try {
    execSync("which rec", { encoding: "utf-8", stdio: "pipe" });
    return {
      command: "rec",
      args: ["-q", "-r", String(SAMPLE_RATE), "-c", String(CHANNELS), "-b", "16", "-e", "signed-integer", "-t", "raw", "--buffer", "1024", "-"],
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
      const timer = setTimeout(() => {
        ws.close();
        state.serverAvailable = false;
        resolve(false);
      }, 2000);
      ws.on("open", () => {
        clearTimeout(timer);
        ws.close();
        state.serverAvailable = true;
        resolve(true);
      });
      ws.on("error", () => {
        clearTimeout(timer);
        state.serverAvailable = false;
        resolve(false);
      });
    } catch {
      state.serverAvailable = false;
      resolve(false);
    }
  });
}

// ─── Streaming transcription via WhisperLive ─────────────────────────

function startStreamingTranscription(ctx: any): void {
  state.transcript = "";
  state.interim = "";

  const ws = new WebSocket(STT_URL);
  state.ws = ws;

  ws.on("open", () => {
    // Configure the server
    ws.send(JSON.stringify({
      type: "config",
      data: { language: "en", task: "transcribe" },
    }));
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

  ws.on("error", () => {
    // Will fall through to file-based transcription
  });

  ws.on("close", () => {
    state.ws = null;
  });
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

    // Give the server 2s to finalize after we stop sending audio
    const timer = setTimeout(() => {
      state.ws?.close();
      resolve(state.transcript || state.interim);
    }, 2000);

    state.ws.on("close", () => {
      clearTimeout(timer);
      resolve(state.transcript || state.interim);
    });

    // Signal end of audio
    try {
      state.ws.send(JSON.stringify({ type: "end" }));
    } catch {
      clearTimeout(timer);
      resolve(state.transcript || state.interim);
    }
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

  try {
    fs.writeFileSync(tmpPath, buildWav(audioData));
  } catch (err: any) {
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
    } else {
      ctx.ui.notify(`🎙 Whisper exited ${code}`, "error");
    }
    // Cleanup temp files
    for (const ext of [".wav", ".txt", ".srt", ".vtt"]) {
      try { fs.unlinkSync(path.join(outDir, `${baseName}${ext}`)); } catch {}
    }
  });

  whisper.on("error", (err) => {
    ctx.ui.setStatus("voice", undefined);
    ctx.ui.notify(`🎙 Whisper failed: ${err.message}`, "error");
  });
}

// ─── Core: start/stop recording ──────────────────────────────────────

async function startRecording(ctx: any): Promise<boolean> {
  const recorder = getRecorder();
  if (!recorder) {
    ctx.ui.notify("🎙 No audio recorder (install alsa-utils or sox)", "error");
    return false;
  }

  state.chunks = [];

  const useStreaming = await checkServer();

  if (useStreaming) {
    startStreamingTranscription(ctx);
  }

  const proc = spawn(recorder.command, recorder.args, {
    stdio: ["ignore", "pipe", "ignore"],
  });

  proc.stdout.on("data", (chunk: Buffer) => {
    state.chunks.push(chunk);
    if (useStreaming) streamAudioChunk(chunk);
  });

  proc.on("error", () => {
    state.recording = false;
    state.recorder = null;
    ctx.ui.setStatus("voice", undefined);
  });

  proc.on("close", () => {
    state.recorder = null;
  });

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

    if (text && ctx.hasUI) {
      ctx.ui.pasteToEditor(text + " ");
    }
    const preview = text?.length > 80 ? text.slice(0, 80) + "…" : text;
    if (preview) ctx.ui.notify(`🎙 "${preview}"`, "info");
    else ctx.ui.notify("🎙 No speech detected.", "warning");
  } else {
    // Fallback: whisper CLI on the buffered audio
    const audioData = Buffer.concat(state.chunks);
    state.chunks = [];
    if (audioData.length < 3200) {
      ctx.ui.notify("🎙 No speech detected (too short).", "warning");
      ctx.ui.setStatus("voice", undefined);
      return;
    }
    transcribeWithWhisperCli(audioData, ctx);
  }
}

// ─── Extension registration ──────────────────────────────────────────

export default function (pi: ExtensionAPI) {
  // Right Alt = toggle recording on/off
  pi.registerShortcut("alt", {
    description: "Toggle voice dictation (start/stop recording)",
    handler: async (ctx) => {
      if (state.recording) {
        await stopRecording(ctx);
      } else {
        const ok = await startRecording(ctx);
        if (ok) {
          ctx.ui.setStatus("voice", "🎙 Recording… Right Alt to stop");
          ctx.ui.notify("🎙 Recording… Right Alt again to stop", "info");
        }
      }
    },
  });

  // /voice command for status and manual toggle
  pi.registerCommand("voice", {
    description: "Voice dictation status and manual toggle",
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

      // Toggle recording manually
      if (state.recording) {
        await stopRecording(ctx);
      } else {
        const ok = await startRecording(ctx);
        if (ok) {
          ctx.ui.setStatus("voice", "🎙 Recording… /voice to stop");
          ctx.ui.notify("🎙 Recording… /voice or Space to stop", "info");
        }
      }
    },
  });

  pi.on("session_shutdown", async () => {
    if (state.recorder) state.recorder.kill("SIGTERM");
    if (state.ws) state.ws.close();
    state.recording = false;
    state.recorder = null;
    state.ws = null;
    state.chunks = [];
  });
}
