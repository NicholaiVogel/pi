/**
 * /loop — iterative sub-agent orchestration for pi
 *
 * Spawns child pi processes in a loop, each with an isolated context
 * window. Evaluates results between iterations using git state, stop
 * commands, and metric commands. Feeds evaluation back as context for
 * the next iteration.
 *
 * Patterns:
 *   /loop make all tests pass
 *   /loop --max 5 optimize the landing page performance
 *   /loop --stop "npm test" fix the failing tests
 *   /loop --metric "npm run score" improve the accuracy
 *   /loop --stop "npm test" --metric "npm run coverage" refactor auth
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { getMarkdownTheme } from "@earendil-works/pi-coding-agent";
import { Container, Markdown, Spacer, Text } from "@earendil-works/pi-tui";
import { Type } from "typebox";
import {
  type LoopConfig,
  type LoopResult,
  type IterationResult,
  runLoop,
} from "./controller.js";

// -- Token formatting --

function fmtTokens(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${Math.round(n / 1000)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

// -- /loop command arg parser --

function parseLoopArgs(args: string): {
  task: string;
  maxIterations?: number;
  stopCommand?: string;
  metricCommand?: string;
} {
  let remaining = args.trim();
  let maxIterations: number | undefined;
  let stopCommand: string | undefined;
  let metricCommand: string | undefined;

  // Match --flag "quoted value" or --flag bare-value
  const flagRe = /^--(\w+)\s+(?:"((?:[^"\\]|\\.)*)"|(\S+))\s*/;

  while (remaining.startsWith("--")) {
    const m = remaining.match(flagRe);
    if (!m) break;

    const value = m[2] !== undefined ? m[2] : m[3];

    switch (m[1]) {
      case "max":
      case "n":
        maxIterations = parseInt(value);
        break;
      case "stop":
        stopCommand = value;
        break;
      case "metric":
        metricCommand = value;
        break;
    }

    remaining = remaining.slice(m[0].length).trimStart();
  }

  return { task: remaining, maxIterations, stopCommand, metricCommand };
}

// -- Command autocomplete --

const LOOP_FLAGS = [
  { value: "--max ", label: "--max N       Max iterations (default: 10)" },
  { value: "--stop ", label: '--stop "cmd"  Bash command; exit 0 = done' },
  {
    value: "--metric ",
    label: '--metric "cmd" Bash command; outputs a score',
  },
];

// -- Rendering --

function renderIterationLine(
  iter: IterationResult,
  theme: any,
  verbose: boolean,
): string {
  const icon = iter.error
    ? theme.fg("error", "✗")
    : iter.stopMet
      ? theme.fg("success", "✓")
      : iter.changesMade
        ? theme.fg("accent", "●")
        : theme.fg("muted", "○");

  let line = `${icon} ${theme.fg("muted", `#${iter.iteration}`)}`;

  if (iter.score !== undefined) {
    line += theme.fg("dim", ` score:${iter.score}`);
  }

  if (verbose && iter.model) {
    line += theme.fg("dim", ` ${iter.model}`);
  }

  // Truncated output preview
  const preview = iter.output
    .split("\n")
    .filter((l) => l.trim())
    .slice(0, 2)
    .join(" ")
    .slice(0, 80);
  if (preview) {
    line += ` ${theme.fg("text", preview)}`;
  } else if (iter.error) {
    line += ` ${theme.fg("error", iter.error)}`;
  }

  return line;
}

function renderExpanded(container: Container, result: LoopResult, theme: any) {
  const mdTheme = getMarkdownTheme();

  // Header
  const statusIcon =
    result.status === "completed"
      ? theme.fg("success", "✓")
      : result.status === "aborted"
        ? theme.fg("error", "✗")
        : theme.fg("warning", "●");

  let header = `${statusIcon} ${theme.fg("toolTitle", theme.bold("loop"))}`;
  header += theme.fg(
    "muted",
    ` ${result.iterations.length}/${result.config.maxIterations} iterations`,
  );

  if (result.stopReason) {
    header += theme.fg("dim", ` — ${result.stopReason}`);
  }

  container.addChild(new Text(header, 0, 0));

  // Task
  container.addChild(new Spacer(1));
  const taskPreview =
    result.config.task.length > 120
      ? result.config.task.slice(0, 120) + "..."
      : result.config.task;
  container.addChild(
    new Text(theme.fg("dim", `Task: ${taskPreview}`), 0, 0),
  );

  // Best score
  if (result.bestScore !== undefined) {
    container.addChild(
      new Text(
        theme.fg("accent", `Best score: ${result.bestScore} (iteration #${result.bestIteration})`),
        0, 0,
      ),
    );
  }

  // Iterations
  container.addChild(new Spacer(1));
  container.addChild(
    new Text(theme.fg("muted", "─── Iterations ───"), 0, 0),
  );

  for (const iter of result.iterations) {
    const icon = iter.error
      ? theme.fg("error", "✗")
      : iter.stopMet
        ? theme.fg("success", "✓")
        : iter.changesMade
          ? theme.fg("accent", "●")
          : theme.fg("muted", "○");

    container.addChild(
      new Text(
        `${icon} ${theme.fg("toolTitle", theme.bold(`#${iter.iteration}`))}${iter.score !== undefined ? theme.fg("dim", ` score:${iter.score}`) : ""}${iter.model ? theme.fg("dim", ` ${iter.model}`) : ""}`,
        0, 0,
      ),
    );

    if (iter.error) {
      container.addChild(
        new Text(theme.fg("error", `  ${iter.error}`), 0, 0),
      );
    }

    if (iter.output) {
      const outputLines = iter.output.split("\n").slice(0, 8).join("\n");
      container.addChild(
        new Markdown(outputLines.trim(), 0, 0, mdTheme),
      );
    }

    container.addChild(new Spacer(1));
  }

  // Total usage
  const parts: string[] = [];
  if (result.totalUsage.input)
    parts.push(`↑${fmtTokens(result.totalUsage.input)}`);
  if (result.totalUsage.output)
    parts.push(`↓${fmtTokens(result.totalUsage.output)}`);
  if (result.totalUsage.cost)
    parts.push(`$${result.totalUsage.cost.toFixed(4)}`);
  if (parts.length > 0) {
    container.addChild(
      new Text(theme.fg("dim", `Total: ${parts.join(" ")}`), 0, 0),
    );
  }
}

function renderCollapsed(result: LoopResult, theme: any): string {
  const statusIcon =
    result.status === "completed"
      ? theme.fg("success", "✓")
      : result.status === "aborted"
        ? theme.fg("error", "✗")
        : theme.fg("warning", "●");

  let text = `${statusIcon} ${theme.fg("toolTitle", theme.bold("loop"))}`;
  text += theme.fg(
    "muted",
    ` ${result.iterations.length}/${result.config.maxIterations}`,
  );

  if (result.stopReason) {
    text += theme.fg("dim", ` — ${result.stopReason}`);
  }

  // Show last few iterations
  const recent = result.iterations.slice(-5);
  for (const iter of recent) {
    text += `\n${renderIterationLine(iter, theme, false)}`;
  }

  if (result.iterations.length > 5) {
    text += `\n${theme.fg("muted", `  ... +${result.iterations.length - 5} earlier`)}`;
  }

  // Usage
  const parts: string[] = [];
  if (result.totalUsage.input)
    parts.push(`↑${fmtTokens(result.totalUsage.input)}`);
  if (result.totalUsage.output)
    parts.push(`↓${fmtTokens(result.totalUsage.output)}`);
  if (result.totalUsage.cost)
    parts.push(`$${result.totalUsage.cost.toFixed(4)}`);
  if (parts.length > 0) {
    text += `\n${theme.fg("dim", parts.join(" "))}`;
  }

  text += `\n${theme.fg("muted", "(Ctrl+O to expand)")}`;
  return text;
}

// -- Tool definition --

const LoopParams = Type.Object({
  task: Type.String({ description: "The task to loop on" }),
  maxIterations: Type.Optional(
    Type.Number({ description: "Maximum iterations (default: 10)" }),
  ),
  stopCommand: Type.Optional(
    Type.String({
      description:
        'Bash command that signals done. Exit code 0 = stop looping.',
    }),
  ),
  metricCommand: Type.Optional(
    Type.String({
      description:
        "Bash command that outputs a number. Loop stops when score plateaus. Regressions are reverted via git.",
    }),
  ),
  stopOnIdle: Type.Optional(
    Type.Boolean({
      description:
        "Stop when a sub-agent makes no new changes (default: true).",
      default: true,
    }),
  ),
  tools: Type.Optional(
    Type.String({
      description:
        'Comma-separated tool list for sub-agents (default: "read,bash,edit,write,ls,find,grep").',
    }),
  ),
  systemPrompt: Type.Optional(
    Type.String({
      description: "Additional system prompt for sub-agents.",
    }),
  ),
});

export default function (pi: ExtensionAPI) {
  // -- Tool --

  pi.registerTool({
    name: "loop",
    label: "Loop",
    description:
      "Run a task in an iterative loop using isolated sub-agents. Each iteration spawns a fresh context window, evaluates the result, and feeds context back. Stops on condition, metric plateau, idle, or max iterations.",
    promptSnippet:
      "Run a task in an iterative sub-agent loop until a goal is met",
    promptGuidelines: [
      "Use loop when a task benefits from repeated attempts with evaluation between iterations — debugging, optimization, iterative refinement, or any 'keep trying until it works' pattern.",
      "loop spawns fresh sub-agents each iteration — they cannot see your conversation, only the task and previous iteration's result.",
      "For code review loops, use autoreview instead.",
    ],
    parameters: LoopParams,

    async execute(_toolCallId, params, signal, onUpdate, ctx) {
      const config: LoopConfig = {
        task: params.task,
        cwd: ctx.cwd,
        maxIterations: params.maxIterations ?? 10,
        stopCommand: params.stopCommand,
        metricCommand: params.metricCommand,
        stopOnIdle: params.stopOnIdle ?? true,
        tools: params.tools ?? "read,bash,edit,write,ls,find,grep",
        systemPrompt: params.systemPrompt,
      };

      try {
        const result = await runLoop(config, signal, (state) => {
          const iter = state.iterations[state.iterations.length - 1];
          const summary = iter
            ? `Iteration ${iter.iteration}: ${iter.output.slice(0, 60).split("\n")[0]}`
            : "Starting...";
          onUpdate?.({
            content: [{ type: "text", text: summary }],
            details: { ...state, iterations: [...state.iterations] },
          });
        });

        // Build summary text
        const lastIter = result.iterations[result.iterations.length - 1];
        const summary = lastIter?.output || result.stopReason || "Loop completed";

        return {
          content: [{ type: "text", text: summary }],
          details: result,
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Loop failed: ${err.message}` }],
          details: {
            config,
            iterations: [],
            totalUsage: { input: 0, output: 0, cost: 0 },
            status: "error",
            stopReason: err.message,
          },
          isError: true,
        };
      }
    },

    renderCall(args, theme) {
      const preview =
        args.task.length > 80
          ? args.task.slice(0, 80) + "..."
          : args.task;
      let text =
        theme.fg("toolTitle", theme.bold("loop ")) +
        theme.fg("text", preview);

      const flags: string[] = [];
      if (args.maxIterations) flags.push(`max ${args.maxIterations}`);
      if (args.stopCommand) flags.push(`stop: ${args.stopCommand}`);
      if (args.metricCommand) flags.push(`metric: ${args.metricCommand}`);
      if (flags.length > 0) {
        text += theme.fg("muted", ` [${flags.join(", ")}]`);
      }

      return new Text(text, 0, 0);
    },

    renderResult(toolResult, { expanded }, theme) {
      const result = toolResult.details as LoopResult | undefined;
      if (!result) {
        const text = toolResult.content[0];
        return new Text(
          text?.type === "text" ? text.text : "(no output)",
          0,
          0,
        );
      }

      if (expanded) {
        const container = new Container();
        renderExpanded(container, result, theme);
        return container;
      }

      return new Text(renderCollapsed(result, theme), 0, 0);
    },
  });

  // -- Command --

  pi.registerCommand("loop", {
    description:
      "Run a task in an iterative sub-agent loop. Flags: --max N, --stop \"cmd\", --metric \"cmd\"",
    getArgumentCompletions(prefix: string) {
      const matching = LOOP_FLAGS.filter((f) =>
        f.label.toLowerCase().startsWith(prefix.toLowerCase()) ||
        f.value.startsWith(prefix),
      );
      return matching.length > 0
        ? matching.map((f) => ({ value: f.value, label: f.label }))
        : null;
    },
    handler: async (args, ctx) => {
      if (!args?.trim()) {
        ctx.ui.notify(
          "Usage: /loop [--max N] [--stop \"cmd\"] [--metric \"cmd\"] <task>",
          "error",
        );
        return;
      }

      const parsed = parseLoopArgs(args);

      if (!parsed.task) {
        ctx.ui.notify("Provide a task to loop on.", "error");
        return;
      }

      // Build a tool invocation message
      const parts = [
        `Run the loop tool with task: "${parsed.task}"`,
      ];

      if (parsed.maxIterations) {
        parts.push(`maxIterations: ${parsed.maxIterations}`);
      }
      if (parsed.stopCommand) {
        parts.push(`stopCommand: "${parsed.stopCommand}"`);
      }
      if (parsed.metricCommand) {
        parts.push(`metricCommand: "${parsed.metricCommand}"`);
      }

      pi.sendUserMessage(parts.join(". ") + ".", {
        deliverAs: "followUp",
      });
    },
  });
}
