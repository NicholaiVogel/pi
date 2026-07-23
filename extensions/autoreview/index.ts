/**
 * Auto Review - Structured code review as a pi extension
 *
 * Spawns one or more child pi processes, each with an isolated context window,
 * read+investigate tools (read, ls, find, grep, bash, web_search), and an
 * adversarial review-focused system prompt. Returns structured findings back to
 * the main agent.
 *
 * Design notes (see also prompt.ts):
 *  - Findings are parsed defensively: case-insensitive fences, bare JSON,
 *    {findings:[...]} wrappers, alternate field names, trailing commas. A
 *    reviewer describing bugs in prose must not silently report "clean".
 *  - A `status` field distinguishes "running" from "done" so the TUI never
 *    paints a green "No actionable findings." while a review is still in flight.
 *  - `reviewers` > 1 runs an ensemble of fresh-context reviewers in parallel and
 *    unions their findings (deduped, max-severity wins).
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
import { type Finding, type Severity, parseFindings, unionFindings, proseAfterJson } from "./findings.js";

// -- Types --

interface ReviewerResult {
  findings: Finding[];
  rawOutput: string;
  summary: string;
  usage: { input: number; output: number; cost: number };
  model?: string;
  exitCode: number;
}

interface ReviewDetails {
  mode: string;
  base?: string;
  commit?: string;
  reviewers: number;
  /** "running" while any child reviewer is still active, "done" once all have exited. */
  status: "running" | "done";
  diffStat: string;
  findings: Finding[];
  summary: string;
  rawOutput: string;
  exitCode: number;
  model?: string;
  usage: { input: number; output: number; cost: number };
}

type OnUpdateCallback = (partial: AgentToolResult<ReviewDetails>) => void;

const MAX_REVIEWERS = 8;

// -- Helpers --

function formatTokens(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${Math.round(n / 1000)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

/** Concatenate every text part of an assistant message (a single turn). */
function messageText(msg: Message): string {
  if (msg.role !== "assistant") return "";
  let out = "";
  for (const part of msg.content as any[]) {
    if (part.type === "text" && typeof part.text === "string") out += part.text;
  }
  return out;
}

function addUsage(a: ReviewDetails["usage"], b: ReviewDetails["usage"]): ReviewDetails["usage"] {
  return {
    input: a.input + b.input,
    output: a.output + b.output,
    cost: a.cost + b.cost,
  };
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

// -- Task prompt builder --

function buildReviewerTask(opts: {
  hasDiff: boolean;
  stat: string;
  diffFilePath: string | null;
  prompt?: string;
  files?: string[];
  reviewerIndex: number;
  reviewerCount: number;
}): string {
  const ensembleNote =
    opts.reviewerCount > 1
      ? `\n\nYou are reviewer ${opts.reviewerIndex + 1} of ${opts.reviewerCount} independent reviewers. Each of you reviews the same change in a fresh context. Do your own complete investigation — assume the others may miss things, and vary your focus so the union of all reviewers is thorough. Do not mention the other reviewers in your output.`
      : "";

  if (opts.hasDiff && opts.diffFilePath) {
    return [
      "Adversarially review the following diff. Read the full diff, then read the FULL files around every changed region — bugs live in surrounding context the diff hides.",
      "",
      `Diff stat:`,
      opts.stat,
      "",
      `The full diff is at ${opts.diffFilePath}. Read it with the read tool.`,
      "",
      "Use bash (grep/rg, git log, git blame, finding callers) and web_search (dependency contracts, API semantics) to verify anything you suspect. Trace concrete inputs/paths. Only drop a suspicion after you have actively tried and failed to confirm it.",
      "",
      opts.prompt ? `Additional review focus:\n${opts.prompt}\n` : "",
      "Report findings as a JSON array inside a ```json block, following the exact format from your system prompt. Then add a 2–4 sentence prose assessment of the highest-risk areas.",
      ensembleNote,
    ]
      .filter((l) => l !== "")
      .join("\n")
      .trim();
  }

  // Ad-hoc review (no diff)
  const parts = [
    "No diff is available. Adversarially review the code directly by reading the files and directories specified below. Read full files; investigate with bash (grep/rg, git log/blame, callers) and web_search where useful.",
    "",
  ];

  if (opts.files && opts.files.length > 0) {
    parts.push("Files to review:");
    for (const f of opts.files) parts.push(`- ${f}`);
    parts.push("", "Read each file completely. Check for bugs, logic errors, missing edge cases, security issues, and contract misuse.");
  } else if (opts.prompt) {
    parts.push("Review scope:", "", opts.prompt, "", "Use find, grep, ls, and read to inspect the relevant code in the working directory.");
  } else {
    parts.push("Inspect the current working directory for code to review. Use ls, find, and read to discover and inspect source files.");
  }

  if (opts.prompt && opts.files && opts.files.length > 0) {
    parts.push("", "Additional review focus:", opts.prompt);
  }

  parts.push("", "Report findings as a JSON array inside a ```json block, following the exact format from your system prompt. Then add a 2–4 sentence prose assessment of the highest-risk areas.");
  if (ensembleNote.trim()) parts.push(ensembleNote);

  return parts.join("\n").trim();
}

// -- Single reviewer runner --

interface SingleReviewerOpts {
  cwd: string;
  task: string;
  modelFlag?: string;
  promptFilePath: string;
  signal?: AbortSignal;
  reviewerIndex: number;
  reviewerCount: number;
  onPartial?: (partial: ReviewerResult) => void;
}

async function runSingleReviewer(opts: SingleReviewerOpts): Promise<ReviewerResult> {
  const result: ReviewerResult = {
    findings: [],
    rawOutput: "",
    summary: "",
    usage: { input: 0, output: 0, cost: 0 },
    exitCode: 0,
  };

  const args = [
    "--mode", "json", "-p", "--no-session",
    // read-only investigation + verification tools. Unknown names are ignored by pi,
    // so web_search is a no-op if the web extension isn't loaded in the child.
    "--tools", "read,ls,find,grep,bash,web_search",
  ];

  if (opts.modelFlag) args.push("--model", opts.modelFlag);
  args.push("--append-system-prompt", opts.promptFilePath);
  args.push(opts.task);

  const invocation = getPiInvocation(args);
  let wasAborted = false;
  let buffer = "";
  // Accumulate text across ALL assistant turns so findings split across turns,
  // or emitted before a final prose summary, are not lost.
  let accumulatedText = "";

  const emit = () => opts.onPartial?.({ ...result, findings: [...result.findings] });

  result.exitCode = await new Promise<number>((resolve) => {
    const proc = spawn(invocation.command, invocation.args, {
      cwd: opts.cwd,
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
          const usage = (msg as any).usage;
          if (usage) {
            result.usage.input += usage.input || 0;
            result.usage.output += usage.output || 0;
            result.usage.cost += usage.cost?.total || usage.cost || 0;
          }
          if (!result.model && (msg as any).model) result.model = (msg as any).model;

          // Accumulate this turn's text; re-parse the full accumulation (F5).
          const turnText = messageText(msg);
          if (turnText.trim()) {
            accumulatedText += (accumulatedText ? "\n\n" : "") + turnText;
          }

          result.rawOutput = accumulatedText.trim();
          result.findings = parseFindings(accumulatedText);

          const label = opts.reviewerCount > 1 ? `reviewer ${opts.reviewerIndex + 1}/${opts.reviewerCount}` : "reviewer";
          const turns = (accumulatedText.match(/\n\n/g)?.length ?? 0) + (accumulatedText ? 1 : 0);
          result.summary =
            result.findings.length > 0
              ? `${label}: ${result.findings.length} finding${result.findings.length > 1 ? "s" : ""} so far…`
              : `${label}: investigating… (${turns} turn${turns === 1 ? "" : "s"})`;
          emit();
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
      // Ignore stderr noise from the child.
    });

    proc.on("close", (code) => {
      if (buffer.trim()) processLine(buffer);
      resolve(code ?? 0);
    });

    proc.on("error", () => resolve(1));

    if (opts.signal) {
      const kill = () => {
        wasAborted = true;
        proc.kill("SIGTERM");
        setTimeout(() => { if (!proc.killed) proc.kill("SIGKILL"); }, 5000);
      };
      if (opts.signal.aborted) kill();
      else opts.signal.addEventListener("abort", kill, { once: true });
    }
  });

  if (wasAborted) throw new Error("Review was aborted");

  // Final summary: prefer prose after the JSON block; else a generated line.
  const prose = proseAfterJson(result.rawOutput);
  result.summary = prose || (result.findings.length > 0
    ? `${result.findings.length} finding${result.findings.length > 1 ? "s" : ""}.`
    : "no actionable findings.");
  // Re-parse once more in case the final turn only just completed.
  result.findings = parseFindings(accumulatedText);

  return result;
}

// -- Orchestrator (handles the ensemble) --

interface ReviewRunOpts {
  cwd: string;
  diff: string;
  stat: string;
  mode: string;
  base?: string;
  commit?: string;
  signal?: AbortSignal;
  onUpdate?: OnUpdateCallback;
  modelFlag?: string;
  prompt?: string;
  files?: string[];
  hasDiff: boolean;
  reviewers: number;
}

async function runReview(opts: ReviewRunOpts): Promise<ReviewDetails> {
  const details: ReviewDetails = {
    mode: opts.mode,
    base: opts.base,
    commit: opts.commit,
    reviewers: opts.reviewers,
    status: "running",
    diffStat: opts.stat.trim(),
    findings: [],
    summary: opts.reviewers > 1
      ? `panel of ${opts.reviewers} reviewers starting…`
      : "reviewer starting…",
    rawOutput: "",
    exitCode: 0,
    usage: { input: 0, output: 0, cost: 0 },
  };

  const emitAggregated = () => {
    opts.onUpdate?.({
      content: [{ type: "text", text: details.summary || "(reviewer working…)" }],
      details: { ...details, findings: [...details.findings] },
    });
  };
  emitAggregated();

  const promptFile = await writeTempFile(REVIEW_PROMPT, "review-prompt");
  const diffFile = opts.hasDiff ? await writeTempFile(opts.diff, "review-diff") : null;

  try {
    const buildTask = (i: number) =>
      buildReviewerTask({
        hasDiff: opts.hasDiff,
        stat: opts.stat,
        diffFilePath: diffFile?.path ?? null,
        prompt: opts.prompt,
        files: opts.files,
        reviewerIndex: i,
        reviewerCount: opts.reviewers,
      });

    // Per-reviewer completion state, declared before runOne so the onPartial
    // closure can safely reference it.
    let completedReviewers = 0;
    const perReviewer: ReviewerResult[] = new Array(opts.reviewers);

    const runOne = (i: number) =>
      runSingleReviewer({
        cwd: opts.cwd,
        task: buildTask(i),
        modelFlag: opts.modelFlag,
        promptFilePath: promptFile.path,
        signal: opts.signal,
        reviewerIndex: i,
        reviewerCount: opts.reviewers,
        onPartial: opts.reviewers > 1
          ? (partial) => {
              // Each partial is that reviewer's full accumulated findings so far;
              // unionFindings dedups by key, so unioning incremental snapshots is safe.
              details.findings = unionFindings(details.findings, partial.findings);
              details.model = details.model || partial.model;
              details.summary = `panel of ${opts.reviewers} running — ${details.findings.length} finding${details.findings.length === 1 ? "" : "s"} so far`;
              emitAggregated();
            }
          : (partial) => {
              details.findings = partial.findings;
              details.rawOutput = partial.rawOutput;
              details.summary = partial.summary;
              details.model = details.model || partial.model;
              emitAggregated();
            },
      });

    const tasks = Array.from({ length: opts.reviewers }, (_unused, i) =>
      runOne(i)
        .then((res) => {
          perReviewer[i] = res;
          completedReviewers++;
        })
        .catch((err) => {
          // One reviewer failing should not kill the whole panel.
          perReviewer[i] = {
            findings: [],
            rawOutput: "",
            summary: `reviewer ${i + 1} failed: ${err?.message || err}`,
            usage: { input: 0, output: 0, cost: 0 },
            exitCode: 1,
          };
          completedReviewers++;
        }),
    );

    await Promise.all(tasks);

    // Final aggregation: union the LAST snapshot from each reviewer, sum usage.
    let unioned: Finding[] = [];
    let combinedOutput = "";
    let exitCode = 0;
    for (const res of perReviewer) {
      if (!res) continue;
      unioned = unionFindings(unioned, res.findings);
      details.usage = addUsage(details.usage, res.usage);
      if (res.model && !details.model) details.model = res.model;
      if (res.exitCode !== 0) exitCode = res.exitCode;
      if (res.rawOutput) {
        combinedOutput += (combinedOutput ? "\n\n--- reviewer ---\n\n" : "") + res.rawOutput;
      }
    }
    details.findings = unioned;
    details.rawOutput = opts.reviewers > 1 ? combinedOutput : (perReviewer[0]?.rawOutput ?? "");
    details.exitCode = exitCode;
  } finally {
    for (const f of [promptFile, diffFile]) {
      if (!f) continue;
      try { fs.unlinkSync(f.path); } catch {}
      try { fs.rmdirSync(f.dir); } catch {}
    }
  }

  details.status = "done";
  const n = details.findings.length;
  details.summary = n > 0
    ? `Review complete (${opts.mode})${opts.reviewers > 1 ? ` ×${opts.reviewers}` : ""}: ${n} finding${n > 1 ? "s" : ""}.`
    : `Review complete (${opts.mode})${opts.reviewers > 1 ? ` ×${opts.reviewers}` : ""}: no actionable findings.`;

  return details;
}

// -- Severity helpers (rendering) --

function severityIcon(s: string, fg: (c: string, t: string) => string) {
  switch (s) {
    case "critical": return fg("error", "●");
    case "warning": return fg("warning", "▲");
    case "info": return fg("accent", "◆");
    case "suggestion": return fg("muted", "○");
    default: return fg("muted", "·");
  }
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
  reviewers: Type.Optional(Type.Integer({
    description: "Number of independent fresh-context reviewers to run in parallel (ensemble). Findings are unioned and deduped; max severity wins on collisions. Default 1. Use 3+ for adversarial coverage that catches what a single pass misses.",
    minimum: 1,
    maximum: MAX_REVIEWERS,
  })),
});

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "autoreview",
    label: "Auto Review",
    description: "Run structured, adversarial code review using isolated reviewer(s) with read+investigate tools (read, ls, find, grep, bash, web_search). Returns findings with severity, file, line, and suggested fixes. Pass reviewers=3+ for an ensemble that unions findings from multiple fresh-context reviewers. Pass cwd to review a different repo.",
    promptSnippet: "Run adversarial structured code review on changes and return actionable findings",
    promptGuidelines: [
      "Use autoreview after non-trivial code edits, before committing, or when the user asks for a review. It spawns isolated reviewer(s) with their own context window — they cannot see your conversation.",
      "For high-risk or large changes, pass reviewers=3 (or more, up to 8) so multiple fresh-context reviewers run in parallel and their findings are unioned. A single pass under-reports; the ensemble is what closes the gap.",
      "After fixing findings from autoreview, run it again to verify the fix and catch regressions.",
    ],
    parameters: ReviewParams,

    async execute(_toolCallId, params, signal, onUpdate, ctx) {
      const mode = params.mode ?? "auto";
      const reviewCwd = params.cwd || ctx.cwd;

      const reviewersRaw = params.reviewers != null ? Number(params.reviewers) : 1;
      const reviewers = Number.isFinite(reviewersRaw) ? Math.max(1, Math.min(MAX_REVIEWERS, Math.floor(reviewersRaw))) : 1;

      try {
        const { diff, stat, resolvedMode, resolvedBase } = await gatherDiff(reviewCwd, mode, params.base, params.commit);
        const hasDiff = diff.trim().length > 0;

        const extraPrompt = params.prompt ? `\n\nAdditional review focus:\n${params.prompt}` : "";
        const fullDiff = hasDiff ? diff + extraPrompt : "";

        // Inherit the parent session's model.
        const currentModel = ctx.getModel?.();
        const modelFlag = currentModel ? `${currentModel.provider}/${currentModel.id}` : undefined;

        const details = await runReview({
          cwd: reviewCwd,
          diff: fullDiff,
          stat,
          mode: resolvedMode,
          base: resolvedBase,
          commit: params.commit,
          signal,
          onUpdate,
          modelFlag,
          prompt: params.prompt,
          files: params.files,
          hasDiff,
          reviewers,
        });

        return {
          content: [{ type: "text", text: details.rawOutput || details.summary }],
          details,
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Review failed: ${err.message}` }],
          details: {
            mode: mode === "auto" ? "auto" : mode, base: params.base, commit: params.commit,
            reviewers, status: "done", diffStat: "", findings: [], summary: `Error: ${err.message}`,
            rawOutput: "", exitCode: 1, usage: { input: 0, output: 0, cost: 0 },
          },
          isError: true,
        };
      }
    },

    renderCall(args, theme) {
      const mode = args.mode ?? "auto";
      let text = theme.fg("toolTitle", theme.bold("autoreview ")) + theme.fg("accent", mode);
      if (args.reviewers && args.reviewers > 1) text += theme.fg("accent", ` ×${args.reviewers}`);
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
      const isRunning = details.status === "running";

      const icon = isRunning
        ? theme.fg("accent", "◐")
        : result.isError
          ? theme.fg("error", "✗")
          : hasFindings
            ? theme.fg("warning", "▲")
            : theme.fg("success", "✓");

      if (expanded) {
        const container = new Container();

        // Header
        let header = `${icon} ${theme.fg("toolTitle", theme.bold("review"))}`;
        header += theme.fg("muted", ` (${details.mode})`);
        if (details.reviewers > 1) header += theme.fg("accent", ` ×${details.reviewers}`);
        if (isRunning) header += theme.fg("accent", " · in progress");
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
        } else if (isRunning) {
          container.addChild(new Spacer(1));
          container.addChild(new Text(theme.fg("accent", "Reviewers are still running — no findings yet."), 0, 0));
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
      if (details.reviewers > 1) text += theme.fg("accent", ` ×${details.reviewers}`);

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
      } else if (isRunning) {
        text += `\n${theme.fg("accent", "Review in progress…")}`;
      } else {
        text += `\n${theme.fg("success", "No actionable findings.")}`;
      }

      text += `\n${theme.fg("muted", "(Ctrl+O to expand)")}`;
      return new Text(text, 0, 0);
    },
  });

  // /review command — delegates to the agent to call the autoreview tool.
  // Supports: mode (auto|local|branch|commit), --base <ref>, --commit <ref>,
  // --reviewers <n>, and --panel (shorthand for --reviewers 3).
  pi.registerCommand("review", {
    description: "Run structured code review — auto-detects local/branch/commit changes. Args: mode (auto|local|branch|commit), --base <ref>, --commit <ref>, --reviewers <n>, --panel (=3 reviewers)",
    handler: async (args, _ctx) => {
      const argStr = (args || "").trim();
      const modeMatch = argStr.match(/\b(auto|local|branch|commit)\b/);
      const mode = modeMatch ? modeMatch[1] : "auto";
      const baseMatch = argStr.match(/--base\s+(\S+)/);
      const commitMatch = argStr.match(/--commit\s+(\S+)/);
      const reviewersMatch = argStr.match(/--reviewers\s+(\d+)/);

      let reviewers = 1;
      if (/\b--panel\b/.test(argStr)) reviewers = 3;
      else if (reviewersMatch) reviewers = Math.max(1, Math.min(MAX_REVIEWERS, parseInt(reviewersMatch[1], 10) || 1));

      let prompt = `Run a code review using the autoreview tool with mode "${mode}".`;
      if (baseMatch) prompt += ` Use base "${baseMatch[1]}".`;
      if (commitMatch) prompt += ` Review commit "${commitMatch[1]}".`;
      if (reviewers > 1) prompt += ` Use reviewers=${reviewers} (ensemble).`;

      pi.sendUserMessage(prompt, { deliverAs: "followUp" });
    },
  });
}
