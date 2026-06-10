/**
 * Auto Review - Structured code review as a pi extension
 *
 * Spawns a child pi process with an isolated context window,
 * read-only tools, and a review-focused system prompt.
 * Returns structured findings back to the main agent.
 */

import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { AgentToolResult } from "@earendil-works/pi-agent-core";
import type { Message } from "@earendil-works/pi-ai";
import { StringEnum } from "@earendil-works/pi-ai";
import { type ExtensionAPI, getMarkdownTheme } from "@earendil-works/pi-coding-agent";
import { Container, Markdown, Spacer, Text } from "@earendil-works/pi-tui";
import { Type } from "typebox";
import { REVIEW_PROMPT } from "./prompt.js";

// -- Types --

interface Finding {
  severity: "critical" | "warning" | "info" | "suggestion";
  file: string;
  line?: number;
  description: string;
  suggested_fix?: string;
}

interface ReviewDetails {
  mode: string;
  base?: string;
  commit?: string;
  diffStat: string;
  findings: Finding[];
  summary: string;
  rawOutput: string;
  exitCode: number;
  model?: string;
  usage: { input: number; output: number; cost: number };
}

type OnUpdateCallback = (partial: AgentToolResult<ReviewDetails>) => void;

// -- Helpers --

function formatTokens(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${Math.round(n / 1000)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

function getFinalOutput(messages: Message[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "assistant") {
      for (const part of messages[i].content) {
        if (part.type === "text") return part.text;
      }
    }
  }
  return "";
}

function parseFindings(text: string): Finding[] {
  // Try to extract JSON block from the review output
  const jsonMatch = text.match(/```json\n([\s\S]*?)```/);
  if (!jsonMatch) return [];

  try {
    const parsed = JSON.parse(jsonMatch[1]);
    if (Array.isArray(parsed)) return parsed as Finding[];
    if (parsed.findings && Array.isArray(parsed.findings)) return parsed.findings;
  } catch {
    // Not valid JSON, return empty
  }
  return [];
}

function getPiInvocation(args: string[]): { command: string; args: string[] } {
  const currentScript = process.argv[1];
  const isBunVirtualScript = currentScript?.startsWith("/$bunfs/root/");
  if (currentScript && !isBunVirtualScript && fs.existsSync(currentScript)) {
    return { command: process.execPath, args: [currentScript, ...args] };
  }

  const execName = path.basename(process.execPath).toLowerCase();
  const isGenericRuntime = /^(node|bun)(\.exe)?$/.test(execName);
  if (!isGenericRuntime) {
    return { command: process.execPath, args };
  }

  return { command: "pi", args };
}

async function writeTempFile(content: string, prefix: string): Promise<{ dir: string; path: string }> {
  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "pi-review-"));
  const filePath = path.join(dir, `${prefix}.md`);
  await fs.promises.writeFile(filePath, content, { encoding: "utf-8", mode: 0o600 });
  return { dir, path: filePath };
}

function execGit(cmd: string, cwd: string): string | null {
  try {
    const { execSync } = require("node:child_process");
    return execSync(cmd, { cwd, maxBuffer: 10 * 1024 * 1024, encoding: "utf-8" });
  } catch {
    return null;
  }
}

/**
 * Auto-detect the best review mode for the current checkout.
 * Priority: uncommitted changes → branch diff → last commit.
 */
function autoDetectMode(cwd: string): { mode: "local" | "branch" | "commit"; base?: string } {
  // 1. Uncommitted changes?
  const localDiff = execGit("git diff HEAD", cwd);
  if (localDiff && localDiff.trim()) return { mode: "local" };

  // 2. On a non-main branch with commits ahead of main?
  const branch = execGit("git rev-parse --abbrev-ref HEAD", cwd)?.trim();
  if (branch && branch !== "main" && branch !== "master") {
    const mergeBase = execGit("git merge-base main HEAD 2>/dev/null || git merge-base origin/main HEAD 2>/dev/null", cwd)?.trim();
    if (mergeBase) {
      const branchDiff = execGit(`git diff ${mergeBase}...HEAD`, cwd);
      if (branchDiff && branchDiff.trim()) return { mode: "branch", base: mergeBase };
    }
  }

  // 3. Fallback: review the last commit
  return { mode: "commit" };
}

async function gatherDiff(
  cwd: string,
  mode: "local" | "branch" | "commit" | "auto",
  base?: string,
  commit?: string,
): Promise<{ diff: string; stat: string; resolvedMode: "local" | "branch" | "commit"; resolvedBase?: string }> {
  // Resolve auto mode first
  let resolvedMode: "local" | "branch" | "commit";
  let resolvedBase = base;
  if (mode === "auto") {
    const detected = autoDetectMode(cwd);
    resolvedMode = detected.mode;
    resolvedBase = detected.base;
  } else {
    resolvedMode = mode;
  }

  let diffCmd: string;
  let statCmd: string;

  switch (resolvedMode) {
    case "branch":
      diffCmd = `git diff ${resolvedBase ?? "origin/main"}...HEAD`;
      statCmd = `git diff --stat ${resolvedBase ?? "origin/main"}...HEAD`;
      break;
    case "commit":
      diffCmd = `git show --format="" ${commit ?? "HEAD"}`;
      statCmd = `git show --stat --format="" ${commit ?? "HEAD"}`;
      break;
    case "local":
    default:
      diffCmd = `git diff HEAD`;
      statCmd = `git diff --stat HEAD`;
      break;
  }

  let diff = execGit(diffCmd, cwd);
  if (!diff) {
    // Maybe no remote, try plain diff
    diff = execGit("git diff", cwd) ?? "";
  }
  let stat = execGit(statCmd, cwd) ?? "(stat unavailable)";

  return { diff, stat, resolvedMode, resolvedBase };
}

// -- Core review runner --

async function runReview(
  cwd: string,
  diff: string,
  stat: string,
  mode: string,
  base?: string,
  commit?: string,
  signal?: AbortSignal,
  onUpdate?: OnUpdateCallback,
  modelFlag?: string,
  prompt?: string,
  files?: string[],
  hasDiff?: boolean,
): Promise<ReviewDetails> {
  const details: ReviewDetails = {
    mode,
    base,
    commit,
    diffStat: stat.trim(),
    findings: [],
    summary: "",
    rawOutput: "",
    exitCode: 0,
    usage: { input: 0, output: 0, cost: 0 },
  };

  const emitUpdate = () => {
    onUpdate?.({
      content: [{ type: "text", text: details.summary || "(reviewer thinking...)" }],
      details: { ...details },
    });
  };

  // Write the review prompt to a temp file
  const promptFile = await writeTempFile(REVIEW_PROMPT, "review-prompt");
  const effectiveHasDiff = hasDiff ?? diff.trim().length > 0;
  const diffFile = effectiveHasDiff ? await writeTempFile(diff, "review-diff") : null;

  try {
    const args = [
      "--mode", "json", "-p", "--no-session",
      "--tools", "read,ls,find,grep",
    ];

    // Inherit the parent session's model
    if (modelFlag) {
      args.push("--model", modelFlag);
    }

    args.push("--append-system-prompt", promptFile.path);

    // Build the task prompt — diff-based or ad-hoc
    let task: string;

    if (effectiveHasDiff) {
      task = [
        "Review the following diff. Read any files referenced in the diff for full context.",
        "",
        `Diff stat:\n${stat}`,
        "",
        `The full diff is at ${diffFile!.path}. Read it with the read tool.`,
        "",
        "After reviewing, provide your findings as structured JSON inside a ```json code block.",
        "Follow the exact format from your system prompt.",
      ].join("\n");
    } else {
      // Ad-hoc review: no diff available, review from files/prompt directly
      const parts = [
        "No diff is available. Review the code directly by reading the files and directories specified below.",
        "",
      ];

      if (files && files.length > 0) {
        parts.push("Files to review:");
        for (const f of files) {
          parts.push(`- ${f}`);
        }
        parts.push("");
        parts.push("Read each file completely. Check for bugs, logic errors, missing edge cases, and security issues.");
      } else if (prompt) {
        parts.push("Review scope:", "");
        parts.push(prompt);
        parts.push("");
        parts.push("Use find, grep, ls, and read to inspect the relevant code in the working directory.");
      } else {
        parts.push("Inspect the current working directory for code to review.");
        parts.push("Use ls, find, and read to discover and inspect source files.");
      }

      // Always include prompt as additional focus when files are specified
      if (prompt && files && files.length > 0) {
        parts.push("");
        parts.push("Additional review focus:");
        parts.push(prompt);
      }

      parts.push("");
      parts.push("After reviewing, provide your findings as structured JSON inside a ```json code block.");
      parts.push("Follow the exact format from your system prompt.");

      task = parts.join("\n");
    }

    args.push(task);

    const invocation = getPiInvocation(args);
    let wasAborted = false;
    let buffer = "";

    const exitCode = await new Promise<number>((resolve) => {
      const proc = spawn(invocation.command, invocation.args, {
        cwd,
        shell: false,
        stdio: ["ignore", "pipe", "pipe"],
      });

      const processLine = (line: string) => {
        if (!line.trim()) return;
        let event: any;
        try {
          event = JSON.parse(line);
        } catch {
          return;
        }

        if (event.type === "message_end" && event.message) {
          const msg = event.message as Message;
          if (msg.role === "assistant") {
            const usage = msg.usage;
            if (usage) {
              details.usage.input += usage.input || 0;
              details.usage.output += usage.output || 0;
              details.usage.cost += usage.cost?.total || 0;
            }
            if (!details.model && msg.model) details.model = msg.model;

            const text = getFinalOutput([msg]);
            if (text) {
              details.rawOutput = text;
              details.findings = parseFindings(text);
              details.summary = text.split("\n").slice(0, 5).join("\n");
            }
            emitUpdate();
          }
        }
      };

      proc.stdout.on("data", (data: Buffer) => {
        buffer += data.toString();
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) processLine(line);
      });

      proc.stderr.on("data", () => {
        // Ignore stderr noise
      });

      proc.on("close", (code) => {
        if (buffer.trim()) processLine(buffer);
        resolve(code ?? 0);
      });

      proc.on("error", () => resolve(1));

      if (signal) {
        const kill = () => {
          wasAborted = true;
          proc.kill("SIGTERM");
          setTimeout(() => { if (!proc.killed) proc.kill("SIGKILL"); }, 5000);
        };
        if (signal.aborted) kill();
        else signal.addEventListener("abort", kill, { once: true });
      }
    });

    details.exitCode = exitCode;
    if (wasAborted) throw new Error("Review was aborted");
    return details;
  } finally {
    // Clean up temp files
    for (const f of [promptFile, diffFile]) {
      if (!f) continue;
      try { fs.unlinkSync(f.path); } catch {}
      try { fs.rmdirSync(f.dir); } catch {}
    }
  }
}

// -- Severity helpers --

function severityIcon(s: string, fg: (c: string, t: string) => string) {
  switch (s) {
    case "critical": return fg("error", "●");
    case "warning": return fg("warning", "▲");
    case "info": return fg("accent", "◆");
    case "suggestion": return fg("muted", "○");
    default: return fg("muted", "·");
  }
}

function severityLabel(s: string) {
  return s.toUpperCase().padEnd(11);
}

// -- Tool definition --

const ReviewParams = Type.Object({
  mode: StringEnum(["auto", "local", "branch", "commit"] as const, {
    description: 'Review target. "auto" = detect from working tree (default), "local" = unstaged/staged changes, "branch" = diff against base, "commit" = single commit.',
    default: "auto",
  }),
  base: Type.Optional(Type.String({
    description: 'Base ref for branch mode (default: origin/main).',
  })),
  commit: Type.Optional(Type.String({
    description: 'Commit ref for commit mode (default: HEAD).',
  })),
  prompt: Type.Optional(Type.String({
    description: "Additional review instructions or focus areas. Also used as the primary review scope when no diff is available.",
  })),
  cwd: Type.Optional(Type.String({
    description: "Working directory to run the review in. Defaults to the session cwd.",
  })),
  files: Type.Optional(Type.Array(Type.String(), {
    description: "Specific files or directories to review when no diff is available. The reviewer will read these directly.",
  })),
});

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "autoreview",
    label: "Auto Review",
    description: "Run structured code review using an isolated reviewer. Returns findings with severity, file, line, and suggested fixes. Pass cwd to review a different repo.",
    promptSnippet: "Run structured code review on changes and return actionable findings",
    promptGuidelines: [
      "Use autoreview after non-trivial code edits, before committing, or when the user asks for a review.",
      "After fixing findings from autoreview, run it again to verify the fix and catch regressions.",
      "autoreview spawns a separate reviewer with its own context window — it cannot see your conversation.",
    ],
    parameters: ReviewParams,

    async execute(_toolCallId, params, signal, onUpdate, ctx) {
      const mode = params.mode ?? "auto";
      const reviewCwd = params.cwd || ctx.cwd;

      try {
        const { diff, stat, resolvedMode, resolvedBase } = await gatherDiff(reviewCwd, mode, params.base, params.commit);
        const hasDiff = diff.trim().length > 0;

        const extraPrompt = params.prompt ? `\n\nAdditional review focus:\n${params.prompt}` : "";
        const fullDiff = hasDiff ? diff + extraPrompt : "";

        // Inherit the parent session's model
        const currentModel = ctx.getModel?.();
        const modelFlag = currentModel ? `${currentModel.provider}/${currentModel.id}` : undefined;

        const details = await runReview(
          reviewCwd, fullDiff, stat, resolvedMode, resolvedBase, params.commit, signal, onUpdate, modelFlag,
          params.prompt, params.files, hasDiff,
        );

        const findingsCount = details.findings.length;
        const summary = findingsCount > 0
          ? `Review complete (${resolvedMode}): ${findingsCount} finding${findingsCount > 1 ? "s" : ""}.`
          : `Review complete (${resolvedMode}): no actionable findings.`;

        return {
          content: [{ type: "text", text: details.rawOutput || summary }],
          details,
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Review failed: ${err.message}` }],
          details: {
            mode: mode === "auto" ? "auto" : mode, base: params.base, commit: params.commit,
            diffStat: "", findings: [], summary: `Error: ${err.message}`,
            rawOutput: "", exitCode: 1, usage: { input: 0, output: 0, cost: 0 },
          },
          isError: true,
        };
      }
    },

    renderCall(args, theme) {
      const mode = args.mode ?? "auto";
      let text = theme.fg("toolTitle", theme.bold("autoreview ")) + theme.fg("accent", mode);
      if (args.cwd) text += theme.fg("muted", ` --cwd ${args.cwd}`);
      if (args.base) text += theme.fg("muted", ` --base ${args.base}`);
      if (args.commit) text += theme.fg("muted", ` --commit ${args.commit}`);
      return new Text(text, 0, 0);
    },

    renderResult(result, { expanded }, theme) {
      const details = result.details as ReviewDetails | undefined;
      if (!details) {
        const text = result.content[0];
        return new Text(text?.type === "text" ? text.text : "(no output)", 0, 0);
      }

      const mdTheme = getMarkdownTheme();
      const hasFindings = details.findings.length > 0;
      const icon = result.isError
        ? theme.fg("error", "✗")
        : hasFindings
          ? theme.fg("warning", "▲")
          : theme.fg("success", "✓");

      if (expanded) {
        const container = new Container();

        // Header
        let header = `${icon} ${theme.fg("toolTitle", theme.bold("review"))}`;
        header += theme.fg("muted", ` (${details.mode})`);
        if (details.diffStat) {
          const statLine = details.diffStat.split("\n").pop() || "";
          header += theme.fg("dim", ` ${statLine.trim()}`);
        }
        container.addChild(new Text(header, 0, 0));

        // Findings
        if (hasFindings) {
          container.addChild(new Spacer(1));
          container.addChild(new Text(theme.fg("muted", "─── Findings ───"), 0, 0));

          for (const f of details.findings) {
            const sev = severityIcon(f.severity, theme.fg.bind(theme));
            let line = `${sev} ${theme.fg("accent", f.file)}`;
            if (f.line) line += theme.fg("dim", `:${f.line}`);
            line += ` ${theme.fg("text", f.description)}`;
            container.addChild(new Text(line, 0, 0));
            if (f.suggested_fix) {
              container.addChild(new Text(theme.fg("dim", `   → ${f.suggested_fix}`), 0, 0));
            }
          }
        }

        // Full output as markdown
        if (details.rawOutput) {
          container.addChild(new Spacer(1));
          container.addChild(new Text(theme.fg("muted", "─── Review ───"), 0, 0));
          container.addChild(new Markdown(details.rawOutput.trim(), 0, 0, mdTheme));
        }

        // Usage
        const parts: string[] = [];
        if (details.usage.input) parts.push(`↑${formatTokens(details.usage.input)}`);
        if (details.usage.output) parts.push(`↓${formatTokens(details.usage.output)}`);
        if (details.usage.cost) parts.push(`$${details.usage.cost.toFixed(4)}`);
        if (details.model) parts.push(details.model);
        if (parts.length > 0) {
          container.addChild(new Spacer(1));
          container.addChild(new Text(theme.fg("dim", parts.join(" ")), 0, 0));
        }

        return container;
      }

      // Collapsed view
      let text = `${icon} ${theme.fg("toolTitle", theme.bold("review"))}`;
      text += theme.fg("muted", ` (${details.mode})`);

      if (hasFindings) {
        const bySev: Record<string, number> = {};
        for (const f of details.findings) {
          bySev[f.severity] = (bySev[f.severity] || 0) + 1;
        }
        const counts = Object.entries(bySev)
          .map(([sev, n]) => `${n} ${sev}${n > 1 ? "s" : ""}`)
          .join(", ");
        text += `\n${theme.fg("text", counts)}`;

        for (const f of details.findings.slice(0, 5)) {
          const sev = severityIcon(f.severity, theme.fg.bind(theme));
          let line = `  ${sev} ${theme.fg("accent", f.file)}`;
          if (f.line) line += theme.fg("dim", `:${f.line}`);
          const desc = f.description.length > 60 ? f.description.slice(0, 60) + "..." : f.description;
          line += ` ${theme.fg("text", desc)}`;
          text += `\n${line}`;
        }
        if (details.findings.length > 5) {
          text += `\n${theme.fg("muted", `  ... +${details.findings.length - 5} more`)}`;
        }
      } else {
        text += `\n${theme.fg("success", "No actionable findings.")}`;
      }

      text += `\n${theme.fg("muted", "(Ctrl+O to expand)")}`;
      return new Text(text, 0, 0);
    },
  });

  // Also register a /review command for user-facing entry
  // This directly delegates to the agent to call the autoreview tool,
  // passing any args (e.g., /review local, /review branch --base HEAD~3)
  pi.registerCommand("review", {
    description: "Run structured code review — auto-detects local/branch/commit changes. Args: mode (auto|local|branch|commit), --base <ref>, --commit <ref>",
    handler: async (args, _ctx) => {
      const argStr = (args || "").trim();
      const modeMatch = argStr.match(/\b(auto|local|branch|commit)\b/);
      const mode = modeMatch ? modeMatch[1] : "auto";
      const baseMatch = argStr.match(/--base\s+(\S+)/);
      const commitMatch = argStr.match(/--commit\s+(\S+)/);

      let prompt = `Run a code review using the autoreview tool with mode "${mode}".`;
      if (baseMatch) prompt += ` Use base "${baseMatch[1]}".`;
      if (commitMatch) prompt += ` Review commit "${commitMatch[1]}".`;

      pi.sendUserMessage(prompt, { deliverAs: "followUp" });
    },
  });
}
