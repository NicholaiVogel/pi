/**
 * Loop controller — orchestrates iterative sub-agent runs.
 *
 * Each iteration spawns a child pi process with an isolated context
 * window. The controller evaluates results between iterations using
 * git state, stop commands, and metric commands.
 *
 * Git is the memory: changes accumulate across iterations. With a
 * metric, regressions get reverted. Without one, everything is kept.
 */

import { spawn, execSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { Message } from "@earendil-works/pi-ai";

// -- Types --

export interface Usage {
  input: number;
  output: number;
  cost: number;
}

export interface LoopConfig {
  task: string;
  cwd: string;
  maxIterations: number;
  stopCommand?: string;
  metricCommand?: string;
  stopOnIdle: boolean;
  tools: string;
  systemPrompt?: string;
}

export interface IterationResult {
  iteration: number;
  output: string;
  exitCode: number;
  changesMade: boolean;
  score?: number;
  stopMet: boolean;
  usage: Usage;
  model?: string;
  error?: string;
}

export type LoopStatus =
  | "running"
  | "completed"
  | "stopped"
  | "aborted"
  | "error";

export interface LoopResult {
  config: LoopConfig;
  iterations: IterationResult[];
  totalUsage: Usage;
  status: LoopStatus;
  stopReason?: string;
  bestScore?: number;
  bestIteration?: number;
}

export type LoopUpdateCallback = (state: LoopResult) => void;

// -- Helpers --

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

function getPiInvocation(
  args: string[],
): { command: string; args: string[] } {
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

async function writeTempFile(
  content: string,
  prefix: string,
): Promise<{ dir: string; filePath: string }> {
  const dir = await fs.promises.mkdtemp(
    path.join(os.tmpdir(), "pi-loop-"),
  );
  const filePath = path.join(dir, `${prefix}.md`);
  await fs.promises.writeFile(filePath, content, {
    encoding: "utf-8",
    mode: 0o600,
  });
  return { dir, filePath };
}

function cleanTempFiles(files: Array<{ dir: string; filePath: string }>) {
  for (const f of files) {
    try {
      fs.unlinkSync(f.filePath);
    } catch {}
    try {
      fs.rmdirSync(f.dir);
    } catch {}
  }
}

function getDiffStat(cwd: string): string {
  try {
    return execSync("git diff --stat HEAD", {
      cwd,
      maxBuffer: 1024 * 1024,
      encoding: "utf-8",
    }).trim();
  } catch {
    return "";
  }
}

function runStopCommand(
  command: string,
  cwd: string,
): { met: boolean; output: string } {
  try {
    const output = execSync(command, {
      cwd,
      timeout: 120_000,
      encoding: "utf-8",
    });
    return { met: true, output: output.trim() };
  } catch {
    return { met: false, output: "" };
  }
}

function runMetricCommand(
  command: string,
  cwd: string,
): number | undefined {
  try {
    const output = execSync(command, {
      cwd,
      timeout: 120_000,
      encoding: "utf-8",
    }).trim();
    // Take the last line that looks like a number
    const lines = output.split("\n").map((l) => l.trim()).filter(Boolean);
    for (let i = lines.length - 1; i >= 0; i--) {
      const n = parseFloat(lines[i]);
      if (!isNaN(n)) return n;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function isGitRepo(cwd: string): boolean {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      cwd,
      encoding: "utf-8",
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
}

function revertChanges(cwd: string) {
  try {
    execSync("git checkout .", { cwd, timeout: 30_000, encoding: "utf-8" });
  } catch {}
}

// -- Prompt composition --

const ITERATION_SYSTEM_PROMPT = `You are a focused agent working on a specific task inside an iteration loop.
Each iteration you receive the task and context from the previous run.
Make concrete progress — write code, run commands, fix errors.
Report what you did, what changed, and what the current state is.
Be concise. Focus on action and results.`;

function composeTaskPrompt(
  task: string,
  iteration: number,
  prevResult?: IterationResult,
): string {
  if (iteration === 1 || !prevResult) {
    return [
      task,
      "",
      "This is iteration 1. Do your best work and report the result.",
    ].join("\n");
  }

  const parts = [
    task,
    "",
    `--- Iteration ${iteration} ---`,
    "",
    "Previous iteration result:",
    prevResult.output || "(no output)",
  ];

  if (prevResult.error) {
    parts.push("", `Previous error: ${prevResult.error}`);
  }

  if (prevResult.score !== undefined) {
    parts.push("", `Previous metric score: ${prevResult.score}`);
  }

  if (!prevResult.changesMade) {
    parts.push(
      "",
      "The previous iteration made no changes to the codebase. Try a different approach.",
    );
  }

  parts.push("", "Continue working. Focus on making progress toward the goal.");

  return parts.join("\n");
}

// -- Single iteration runner --

async function runIteration(
  config: LoopConfig,
  iteration: number,
  prevResult: IterationResult | undefined,
  signal: AbortSignal | undefined,
): Promise<{
  output: string;
  exitCode: number;
  usage: Usage;
  model?: string;
  error?: string;
}> {
  const tempFiles: Array<{ dir: string; filePath: string }> = [];

  try {
    const args = [
      "--mode",
      "json",
      "-p",
      "--no-session",
      "--tools",
      config.tools,
    ];

    // System prompt
    const sysPrompt = config.systemPrompt || ITERATION_SYSTEM_PROMPT;
    const sysFile = await writeTempFile(sysPrompt, `sys-${iteration}`);
    tempFiles.push(sysFile);
    args.push("--append-system-prompt", sysFile.filePath);

    // Task prompt
    const taskPrompt = composeTaskPrompt(config.task, iteration, prevResult);
    args.push(taskPrompt);

    const invocation = getPiInvocation(args);
    let wasAborted = false;
    let buffer = "";
    let lastOutput = "";
    const usage: Usage = { input: 0, output: 0, cost: 0 };
    let model: string | undefined;

    const exitCode = await new Promise<number>((resolve) => {
      const proc = spawn(invocation.command, invocation.args, {
        cwd: config.cwd,
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
            const u = msg.usage;
            if (u) {
              usage.input += u.input || 0;
              usage.output += u.output || 0;
              usage.cost += u.cost?.total || 0;
            }
            if (!model && msg.model) model = msg.model;

            const text = getFinalOutput([msg]);
            if (text) lastOutput = text;
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

      proc.on("close", (code) => {
        if (buffer.trim()) processLine(buffer);
        resolve(code ?? 0);
      });

      proc.on("error", () => resolve(1));

      if (signal) {
        const kill = () => {
          wasAborted = true;
          proc.kill("SIGTERM");
          setTimeout(() => {
            if (!proc.killed) proc.kill("SIGKILL");
          }, 5000);
        };
        if (signal.aborted) kill();
        else signal.addEventListener("abort", kill, { once: true });
      }
    });

    if (wasAborted) throw new Error("Iteration was aborted");

    return {
      output: lastOutput,
      exitCode,
      usage,
      model,
      error: exitCode !== 0 ? `Process exited with code ${exitCode}` : undefined,
    };
  } finally {
    cleanTempFiles(tempFiles);
  }
}

// -- Main loop --

const SCORE_PLATEAU_WINDOW = 3;

export async function runLoop(
  config: LoopConfig,
  signal?: AbortSignal,
  onUpdate?: LoopUpdateCallback,
): Promise<LoopResult> {
  const hasGit = isGitRepo(config.cwd);

  const result: LoopResult = {
    config,
    iterations: [],
    totalUsage: { input: 0, output: 0, cost: 0 },
    status: "running",
  };

  const emit = () =>
    onUpdate?.({
      ...result,
      iterations: [...result.iterations],
    });

  for (let i = 1; i <= config.maxIterations; i++) {
    if (signal?.aborted) {
      result.status = "aborted";
      result.stopReason = "Aborted by user";
      emit();
      return result;
    }

    emit();

    // Snapshot git state
    const beforeStat = hasGit ? getDiffStat(config.cwd) : "";

    const prev =
      result.iterations.length > 0
        ? result.iterations[result.iterations.length - 1]
        : undefined;

    const iter = await runIteration(config, i, prev, signal);

    // Check git changes
    const afterStat = hasGit ? getDiffStat(config.cwd) : "";
    const changesMade = hasGit ? beforeStat !== afterStat : true;

    // Check stop command
    let stopMet = false;
    if (config.stopCommand) {
      const stop = runStopCommand(config.stopCommand, config.cwd);
      stopMet = stop.met;
    }

    // Check metric
    let score: number | undefined;
    if (config.metricCommand) {
      score = runMetricCommand(config.metricCommand, config.cwd);
      if (score !== undefined) {
        if (result.bestScore === undefined || score > result.bestScore) {
          result.bestScore = score;
          result.bestIteration = i;
        } else if (hasGit) {
          // Score didn't improve — revert changes
          revertChanges(config.cwd);
        }
      }
    }

    // Check idle (only after first iteration, only if agent had a chance)
    if (
      config.stopOnIdle &&
      !changesMade &&
      i > 1 &&
      !iter.error
    ) {
      result.status = "completed";
      result.stopReason = "No changes made (agent idle)";
    }

    // Record iteration
    const iterResult: IterationResult = {
      iteration: i,
      output: iter.output,
      exitCode: iter.exitCode,
      changesMade,
      score,
      stopMet,
      usage: iter.usage,
      model: iter.model,
      error: iter.error,
    };

    result.iterations.push(iterResult);
    result.totalUsage.input += iter.usage.input;
    result.totalUsage.output += iter.usage.output;
    result.totalUsage.cost += iter.usage.cost;

    // Check stop condition
    if (stopMet) {
      result.status = "completed";
      result.stopReason = `Stop condition met: ${config.stopCommand}`;
      emit();
      return result;
    }

    // Check score plateau
    if (config.metricCommand && result.iterations.length >= SCORE_PLATEAU_WINDOW) {
      const recent = result.iterations.slice(-SCORE_PLATEAU_WINDOW);
      const scores = recent.map((r) => r.score).filter((s): s is number => s !== undefined);
      if (
        scores.length === SCORE_PLATEAU_WINDOW &&
        scores.every((s) => s === scores[0])
      ) {
        result.status = "completed";
        result.stopReason = `Score plateaued at ${scores[0]} for ${SCORE_PLATEAU_WINDOW} iterations`;
        emit();
        return result;
      }
    }

    // Already set by idle check
    if (result.status === "completed") {
      emit();
      return result;
    }

    emit();
  }

  if (result.status === "running") {
    result.status = "stopped";
    result.stopReason = `Reached max iterations (${config.maxIterations})`;
  }

  return result;
}
