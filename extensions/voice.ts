/**
 * Voice Dictation — Local voice-to-text for pi.
 *
 * Records from microphone, transcribes locally via whisper (GPU),
 * inserts text into the editor.
 *
 * Usage:
 *   /voice          - toggle recording on/off (stop → transcribe → insert)
 *   /voice status    - check if whisper and recorder are available
 *
 * Flow:
 *   arecord (raw PCM 16kHz mono) → collect in memory → write WAV → whisper CLI → text → editor
 */

import { spawn, execSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

interface VoiceState {
  recording: boolean;
  recorder: ReturnType<typeof spawn> | null;
  whisper: ReturnType<typeof spawn> | null;
  chunks: Buffer[];
}

const state: VoiceState = {
  recording: false,
  recorder: null,
  whisper: null,
  chunks: [],
};

function getRecorder(): { command: string; args: string[] } | null {
  try {
    execSync("which arecord", { encoding: "utf-8", stdio: "pipe" });
    return {
      command: "arecord",
      args: ["-q", "-f", "S16_LE", "-r", "16000", "-c", "1", "-t", "raw"],
    };
  } catch {}

  try {
    execSync("which rec", { encoding: "utf-8", stdio: "pipe" });
    return {
      command: "rec",
      args: ["-q", "-r", "16000", "-c", "1", "-b", "16", "-e", "signed-integer", "-t", "raw", "--buffer", "1024", "-"],
    };
  } catch {}

  return null;
}

function which(cmd: string): boolean {
  try {
    execSync(`which ${cmd}`, { encoding: "utf-8", stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function startRecording(): boolean {
  const recorder = getRecorder();
  if (!recorder) return false;

  state.chunks = [];

  const proc = spawn(recorder.command, recorder.args, {
    stdio: ["ignore", "pipe", "ignore"],
  });

  proc.stdout.on("data", (chunk: Buffer) => {
    state.chunks.push(chunk);
  });

  proc.on("error", () => {
    state.recording = false;
    state.recorder = null;
  });

  proc.on("close", () => {
    state.recorder = null;
  });

  state.recorder = proc;
  state.recording = true;
  return true;
}

function buildWav(rawPcm: Buffer): Buffer {
  // Minimal WAV header: 16kHz, 16-bit, mono PCM
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + rawPcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);       // fmt chunk size
  header.writeUInt16LE(1, 20);        // PCM format
  header.writeUInt16LE(1, 22);        // mono
  header.writeUInt32LE(16000, 24);     // sample rate
  header.writeUInt32LE(32000, 28);     // byte rate (16000 * 2 * 1)
  header.writeUInt16LE(2, 32);         // block align
  header.writeUInt16LE(16, 34);        // bits per sample
  header.write("data", 36);
  header.writeUInt32LE(rawPcm.length, 40);
  return Buffer.concat([header, rawPcm]);
}

function cleanup(wavPath: string) {
  const baseName = path.basename(wavPath, ".wav");
  const dir = path.dirname(wavPath);
  for (const ext of [".wav", ".txt", ".srt", ".vtt", ".tsv", ".json"]) {
    try { fs.unlinkSync(path.join(dir, `${baseName}${ext}`)); } catch {}
  }
}

function stopRecordingAndTranscribe(ctx: any): void {
  if (!state.recorder) return;

  // Kill the recorder
  state.recorder.kill("SIGTERM");
  state.recorder = null;
  state.recording = false;

  const audioData = Buffer.concat(state.chunks);
  state.chunks = [];

  if (audioData.length < 3200) {
    ctx.ui.notify("🎙 No speech detected (too short).", "warning");
    ctx.ui.setStatus("voice", undefined);
    return;
  }

  // Write WAV to temp file
  const tmpPath = path.join(os.tmpdir(), `pi-voice-${Date.now()}.wav`);
  try {
    fs.writeFileSync(tmpPath, buildWav(audioData));
  } catch (err: any) {
    ctx.ui.notify(`🎙 Write failed: ${err.message}`, "error");
    ctx.ui.setStatus("voice", undefined);
    return;
  }

  ctx.ui.setStatus("voice", "🎙 Transcribing…");
  ctx.ui.notify("🎙 Transcribing with whisper…", "info");

  const baseName = path.basename(tmpPath, ".wav");
  const outDir = os.tmpdir();

  const whisper = spawn("whisper", [
    tmpPath,
    "--model", "base.en",
    "--language", "en",
    "--output_format", "txt",
    "--output_dir", outDir,
    "--device", "cuda",
    "--verbose", "False",
  ], { stdio: "ignore" });

  state.whisper = whisper;

  whisper.on("error", (err) => {
    ctx.ui.notify(`🎙 Whisper failed: ${err.message}`, "error");
    ctx.ui.setStatus("voice", undefined);
    state.whisper = null;
    cleanup(tmpPath);
  });

  whisper.on("close", (code) => {
    state.whisper = null;
    ctx.ui.setStatus("voice", undefined);

    if (code !== 0) {
      ctx.ui.notify(`🎙 Whisper exited ${code}.`, "error");
      cleanup(tmpPath);
      return;
    }

    const txtPath = path.join(outDir, `${baseName}.txt`);
    try {
      const text = fs.readFileSync(txtPath, "utf-8").trim();
      cleanup(tmpPath);

      if (!text) {
        ctx.ui.notify("🎙 No speech detected.", "warning");
        return;
      }

      if (ctx.hasUI) {
        ctx.ui.pasteToEditor(text + " ");
      }

      const preview = text.length > 100 ? text.slice(0, 100) + "…" : text;
      ctx.ui.notify(`🎙 "${preview}"`, "info");
    } catch {
      cleanup(tmpPath);
      ctx.ui.notify("🎙 Transcription produced no output.", "error");
    }
  });
}

export default function (pi: ExtensionAPI) {
  pi.registerCommand("voice", {
    description: "Toggle voice dictation. Records from mic, transcribes via local whisper (GPU), inserts into editor.",
    handler: async (args, ctx) => {
      const subcommand = args?.trim();

      if (subcommand === "status") {
        const recorder = getRecorder();
        const hasWhisper = which("whisper");
        const parts: string[] = [];
        if (!recorder) parts.push("no audio recorder (install alsa-utils or sox)");
        if (!hasWhisper) parts.push("whisper not found (pip install openai-whisper)");
        if (parts.length === 0) {
          ctx.ui.notify("🎙 Voice ready — recorder ✓ whisper (GPU) ✓", "info");
        } else {
          ctx.ui.notify(`🎙 Unavailable: ${parts.join(", ")}`, "error");
        }
        return;
      }

      // Currently recording → stop and transcribe
      if (state.recording) {
        stopRecordingAndTranscribe(ctx);
        return;
      }

      // Start recording
      if (!getRecorder()) {
        ctx.ui.notify("🎙 No audio recorder. Install alsa-utils or sox.", "error");
        return;
      }
      if (!which("whisper")) {
        ctx.ui.notify("🎙 whisper not found. pip install openai-whisper", "error");
        return;
      }

      if (startRecording()) {
        ctx.ui.setStatus("voice", "🎙 Recording… /voice to stop");
        ctx.ui.notify("🎙 Recording… /voice to stop and transcribe.", "info");
      } else {
        ctx.ui.notify("🎙 Failed to start recording. Check mic permissions.", "error");
      }
    },
  });

  pi.on("session_shutdown", async () => {
    if (state.recorder) state.recorder.kill("SIGTERM");
    if (state.whisper) state.whisper.kill("SIGTERM");
    state.recording = false;
    state.recorder = null;
    state.whisper = null;
    state.chunks = [];
  });
}
