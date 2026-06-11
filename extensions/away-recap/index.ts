/**
 * Away Recap — shows a brief "where you left off" summary when you return.
 *
 * Inspired by Claude Code's useAwaySummary:
 *   - Detects terminal blur via DECSET 1004 focus sequences
 *   - After BLUR_DELAY_MS of being away, generates a 1-3 sentence recap
 *   - Displays it as a dim inline card in the chat
 *   - Only fires once per user turn (won't stack)
 *
 * Uses a small model call over recent session entries to produce the recap.
 */

import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { ExtensionAPI, ExtensionContext, CustomMessage } from "@earendil-works/pi-coding-agent";
import { Text, Container } from "@earendil-works/pi-tui";
import type { Theme } from "@earendil-works/pi-coding-agent";

const BLUR_DELAY_MS = 5 * 60_000; // 5 minutes
const RECENT_ENTRY_WINDOW = 30;

const CUSTOM_TYPE = "away_recap";
const RECAP_PROMPT = `The user stepped away and is coming back. Write exactly 1-3 short sentences. Start by stating the high-level task — what they are building or debugging, not implementation details. Next: the concrete next step. Skip status reports and commit recaps.`;

// ─── State ───────────────────────────────────────────────────────────

const state = {
  focused: true,
  timer: null as ReturnType<typeof setTimeout> | null,
  abortCtrl: null as AbortController | null,
  unsubInput: null as (() => void) | null,
  pi: null as ExtensionAPI | null,
  ctx: null as ExtensionContext | null,
  pending: false,
};

// ─── Terminal focus via DECSET 1004 ──────────────────────────────────

// Focus in:  ESC [ I  →  \x1b[I
// Focus out: ESC [ O  →  \x1b[O
const FOCUS_IN = "\x1b[I";
const FOCUS_OUT = "\x1b[O";

function installFocusWatcher(pi: ExtensionAPI, ctx: ExtensionContext) {
  if (state.unsubInput) return;
  state.pi = pi;
  state.ctx = ctx;

  state.unsubInput = ctx.ui.onTerminalInput((data: string) => {
    if (data === FOCUS_IN) {
      onFocus();
      return { consume: true };
    }
    if (data === FOCUS_OUT) {
      onBlur();
      return { consume: true };
    }
    // Any real input means the user is active
    state.focused = true;
    clearTimer();
    return;
  });
}

function clearTimer() {
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
}

function onBlur() {
  state.focused = false;
  clearTimer();
  state.timer = setTimeout(onBlurTimer, BLUR_DELAY_MS);
}

function onFocus() {
  state.focused = true;
  clearTimer();
  // Cancel any in-flight recap generation
  state.abortCtrl?.abort();
  state.abortCtrl = null;
  state.pending = false;
}

// ─── Recap generation ────────────────────────────────────────────────

async function onBlurTimer() {
  state.timer = null;

  const ctx = state.ctx;
  const pi = state.pi;
  if (!ctx || !pi) return;

  // Don't generate if agent is actively streaming
  if (!ctx.isIdle()) {
    state.pending = true;
    return;
  }

  await generateRecap(pi, ctx);
}

async function generateRecap(pi: ExtensionAPI, ctx: ExtensionContext) {
  // Don't stack recaps — check if there's already one since last user message
  if (hasRecapSinceLastUserTurn(ctx)) return;

  const entries = ctx.sessionManager.getEntries();
  if (entries.length === 0) return;

  const recent = entries.slice(-RECENT_ENTRY_WINDOW);

  // Build a text representation of recent entries for the model
  const conversation = serializeEntries(recent);
  if (!conversation.trim()) return;

  state.abortCtrl = new AbortController();

  try {
    const text = await callModelForRecap(conversation, ctx);
    if (!text || state.abortCtrl.signal.aborted) return;

    // Inject the recap as a custom message (no turn trigger)
    pi.sendMessage({
      customType: CUSTOM_TYPE,
      content: text,
      display: true,
      details: { generatedAt: Date.now() },
    });
  } catch {
    // Silently fail — recap is best-effort
  }
}

function hasRecapSinceLastUserTurn(ctx: ExtensionContext): boolean {
  const entries = ctx.sessionManager.getEntries();
  for (let i = entries.length - 1; i >= 0; i--) {
    const entry = entries[i]!;
    // Custom recap entry → already have one since last user turn
    if (entry.type === "custom_message" && (entry as any).customType === CUSTOM_TYPE) return true;
    // User message → no recap since this user turn
    if (entry.type === "message" && (entry as any).message?.role === "user") return false;
  }
  return false;
}

function serializeEntries(entries: any[]): string {
  const lines: string[] = [];
  for (const entry of entries) {
    if (entry.type !== "message") continue;
    const msg = entry.message;
    if (!msg) continue;

    const role = msg.role;
    const text = extractText(msg);
    if (!text) continue;

    if (role === "user") {
      lines.push(`User: ${text.slice(0, 500)}`);
    } else if (role === "assistant") {
      lines.push(`Assistant: ${text.slice(0, 500)}`);
    }
  }
  return lines.join("\n");
}

function extractText(msg: any): string {
  if (typeof msg.content === "string") return msg.content;
  if (Array.isArray(msg.content)) {
    return msg.content
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join(" ");
  }
  return "";
}

// ─── Model call ──────────────────────────────────────────────────────

async function callModelForRecap(conversation: string, ctx: ExtensionContext): Promise<string | null> {
  const model = ctx.model;
  if (!model) return null;

  const task = [
    conversation,
    "",
    RECAP_PROMPT,
  ].join("\n");

  // Write task to temp file
  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "pi-recap-"));
  const taskPath = path.join(dir, "task.txt");
  try {
    await fs.promises.writeFile(taskPath, task, { encoding: "utf-8", mode: 0o600 });
  } catch {
    try { fs.rmdirSync(dir); } catch {}
    return null;
  }

  const modelFlag = `${(model as any).provider || "unknown"}/${model.id}`;

  return new Promise<string | null>((resolve) => {
    const args = [
      "--mode", "json", "-p", "--no-session",
      "--tools", "read",
      "--model", modelFlag,
      task,
    ];

    const proc = spawn("pi", args, {
      cwd: ctx.cwd,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let buffer = "";
    let result: string | null = null;

    const cleanup = () => {
      try { fs.unlinkSync(taskPath); } catch {}
      try { fs.rmdirSync(dir); } catch {}
    };

    const processLine = (line: string) => {
      if (!line.trim()) return;
      let event: any;
      try { event = JSON.parse(line); } catch { return; }

      if (event.type === "message_end" && event.message) {
        const msg = event.message;
        if (msg.role === "assistant") {
          for (const part of msg.content || []) {
            if (part.type === "text") {
              result = part.text;
              break;
            }
          }
        }
      }
    };

    proc.stdout.on("data", (data: Buffer) => {
      buffer += data.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) processLine(line);
    });

    proc.stderr.on("data", () => {});

    proc.on("close", () => {
      if (buffer.trim()) processLine(buffer);
      cleanup();
      resolve(result);
    });

    proc.on("error", () => {
      cleanup();
      resolve(null);
    });

    // Abort support
    if (state.abortCtrl?.signal) {
      const abort = () => {
        proc.kill("SIGTERM");
        cleanup();
        resolve(null);
      };
      if (state.abortCtrl.signal.aborted) {
        abort();
      } else {
        state.abortCtrl.signal.addEventListener("abort", abort, { once: true });
      }
    }
  });
}

// ─── Custom message renderer ─────────────────────────────────────────

interface RecapDetails {
  generatedAt: number;
}

function renderRecap(message: CustomMessage<RecapDetails>, options: any, theme: Theme) {
  const text = typeof message.content === "string"
    ? message.content
    : message.content.filter((p: any) => p.type === "text").map((p: any) => p.text).join(" ");

  if (!text) return undefined;

  return new Text(theme.fg("muted", "▸ " + text), 0, 0);
}

// ─── Extension ───────────────────────────────────────────────────────

export default function (pi: ExtensionAPI) {
  // Register the custom message renderer for our recap type
  pi.registerMessageRenderer<RecapDetails>(CUSTOM_TYPE, renderRecap);

  pi.on("session_start", (_event: any, ctx: ExtensionContext) => {
    if (ctx.hasUI) installFocusWatcher(pi, ctx);
  });

  pi.on("context", (_event: any, ctx: ExtensionContext) => {
    if (ctx.hasUI && !state.unsubInput) installFocusWatcher(pi, ctx);
  });

  // If the timer fired mid-turn, generate when the agent goes idle.
  // Don't check state.focused here — the whole point is that the user
  // is away (focused=false) when the pending timer fires.
  pi.on("agent_end", () => {
    if (!state.pending) return;
    state.pending = false;
    if (state.pi && state.ctx) {
      generateRecap(state.pi, state.ctx);
    }
  });

  // Reset on user input — they're back
  pi.on("input", () => {
    state.focused = true;
    clearTimer();
    state.pending = false;
  });

  pi.on("session_shutdown", () => {
    clearTimer();
    state.abortCtrl?.abort();
    state.unsubInput?.();
    state.pending = false;
    state.unsubInput = null;
  });
}
