/**
 * Voice Dictation - Local voice-to-text for pi.
 *
 * Records from microphone, transcribes locally (whisper via GPU),
 * inserts text into the editor.
 *
 * Requirements: alsa-utils (arecord) or sox, openai-whisper (pip)
 *
 * Usage:
 *   /voice          - toggle recording on/off (stop → transcribe → insert)
 *   /voice status    - check if whisper and recorder are available
 */

import { spawn, execSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const RECORDING_DIR = os.tmpdir();

interface VoiceState {
  recording: boolean;
  process: ReturnType<typeof spawn> | null;
  filePath: string | null;
}

const state: VoiceState = {
  recording: false,
  process: null,
  filePath: null,
};

function getRecorder(): { command: string; args: string[] } | null {
  try {
    execSync("which arecord", { encoding: "utf-8", stdio: "pipe" });
    return {
      command: "arecord",
      args: ["-q", "-f", "S16_LE", "-r", "16000", "-c", "1", "-t", "wav"],
    };
  } catch {}

  try {
    execSync("which rec", { encoding: "utf-8", stdio: "pipe" });
    return {
      command: "rec",
      args: ["-q", "-r", "16000", "-c", "1", "-b", "16", "-e", "signed-integer", "-t", "wav"],
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

async function startRecording(): Promise<string> {
  const recorder = getRecorder();
  if (!recorder) throw new Error("No audio recorder found. Install alsa-utils or sox.");

  const filePath = path.join(RECORDING_DIR, `pi-voice-${Date.now()}.wav`);

  const proc = spawn(recorder.command, [...recorder.args, filePath], {
    stdio: "ignore",
    detached: false,
  });

  return new Promise<string>((resolve, reject) => {
    proc.on("error", (err) => reject(new Error(`Failed to start recorder: ${err.message}`)));

    setTimeout(() => {
      if (proc.killed || proc.exitCode !== null) {
        reject(new Error("Recorder exited immediately. Check microphone permissions."));
        return;
      }
      state.recording = true;
      state.process = proc;
      state.filePath = filePath;
      resolve(filePath);
    }, 300);
  });
}

function stopRecording(): string | null {
  if (!state.process || !state.filePath) return null;

  const filePath = state.filePath;
  const proc = state.process;

  // SIGINT tells arecord to flush buffers and close the WAV header properly
  proc.kill("SIGINT");

  state.recording = false;
  state.process = null;
  state.filePath = null;

  return filePath;
}

async function transcribe(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    // Use whisper CLI — it auto-detects GPU, uses the base model for speed
    const proc = spawn("whisper", [
      filePath,
      "--model", "base.en",
      "--language", "en",
      "--output_format", "txt",
      "--output_dir", RECORDING_DIR,
      "--verbose", "False",
      "--device", "cuda",
    ], {
      stdio: "pipe",
      detached: false,
    });

    let stderr = "";
    proc.stderr.on("data", (data: Buffer) => { stderr += data.toString(); });

    proc.on("error", (err) => {
      reject(new Error(`Failed to run whisper: ${err.message}`));
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`whisper exited ${code}: ${stderr.slice(0, 200)}`));
        return;
      }

      // whisper outputs to <basename>.txt in the output_dir
      const baseName = path.basename(filePath, ".wav");
      const txtPath = path.join(RECORDING_DIR, `${baseName}.txt`);

      try {
        const text = fs.readFileSync(txtPath, "utf-8").trim();
        // Clean up whisper's output files
        for (const ext of [".txt"]) {
          try { fs.unlinkSync(path.join(RECORDING_DIR, `${baseName}${ext}`)); } catch {}
        }
        resolve(text);
      } catch {
        reject(new Error("Whisper completed but no output file found."));
      }
    });
  });
}

function cleanup(filePath: string | null) {
  if (!filePath) return;
  try { fs.unlinkSync(filePath); } catch {}
  // Also clean any whisper output files
  const baseName = path.basename(filePath, ".wav");
  for (const ext of [".txt", ".srt", ".vtt", ".tsv", ".json"]) {
    try { fs.unlinkSync(path.join(RECORDING_DIR, `${baseName}${ext}`)); } catch {}
  }
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
          ctx.ui.notify("🎙 Voice dictation ready — recorder ✓ whisper (GPU) ✓", "info");
        } else {
          ctx.ui.notify(`🎙 Voice unavailable: ${parts.join(", ")}`, "error");
        }
        return;
      }

      // If already recording → stop and transcribe
      if (state.recording) {
        const filePath = stopRecording();
        if (!filePath) {
          ctx.ui.notify("🎙 Recording stopped but no file captured.", "warning");
          return;
        }

        ctx.ui.notify("🎙 Transcribing with whisper (GPU)...", "info");

        try {
          const text = await transcribe(filePath);
          cleanup(filePath);

          if (!text) {
            ctx.ui.notify("🎙 No speech detected.", "warning");
            return;
          }

          if (ctx.hasUI) {
            ctx.ui.pasteToEditor(text + " ");
          }

          const preview = text.length > 80 ? text.slice(0, 80) + "…" : text;
          ctx.ui.notify(`🎙 "${preview}"`, "info");
        } catch (err: any) {
          cleanup(filePath);
          ctx.ui.notify(`🎙 Transcription failed: ${err.message}`, "error");
        }
        return;
      }

      // Start recording
      const recorder = getRecorder();
      if (!recorder) {
        ctx.ui.notify("🎙 No audio recorder found. Install alsa-utils or sox.", "error");
        return;
      }
      if (!which("whisper")) {
        ctx.ui.notify("🎙 whisper not found. Run: pip install openai-whisper", "error");
        return;
      }

      try {
        await startRecording();
        ctx.ui.notify("🎙 Recording… /voice again to stop and transcribe.", "info");
      } catch (err: any) {
        ctx.ui.notify(`🎙 Failed to start: ${err.message}`, "error");
      }
    },
  });

  pi.on("session_shutdown", async () => {
    if (state.recording) {
      stopRecording();
    }
  });
}
