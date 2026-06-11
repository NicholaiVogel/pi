import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

type ToggleEntry = {
  enabled?: boolean;
  timestamp?: string;
};

const MAIN_PROVIDER = "openai-codex";
const MAIN_MODEL = "gpt-5.5";
const MAIN_FULL_MODEL = `${MAIN_PROVIDER}/${MAIN_MODEL}`;
const CHILD_MODEL = "zai/glm-5.1";
const STATE_TYPE = "zai-workflows-state";

function isEnabledFromSession(ctx: ExtensionContext): boolean {
  let enabled = true;
  for (const entry of ctx.sessionManager.getEntries()) {
    if (entry.type === "custom" && entry.customType === STATE_TYPE) {
      const data = entry.data as ToggleEntry | undefined;
      if (typeof data?.enabled === "boolean") enabled = data.enabled;
    }
  }
  return enabled;
}

function hasOwnObjectKey(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function setMissingModel(value: unknown): void {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const record = value as Record<string, unknown>;
  if (!hasOwnObjectKey(record, "model") || record.model === undefined || record.model === null || record.model === "") {
    record.model = CHILD_MODEL;
  }
}

function setChainModels(chain: unknown): void {
  if (!Array.isArray(chain)) return;
  for (const step of chain) {
    if (!step || typeof step !== "object" || Array.isArray(step)) continue;
    const record = step as Record<string, unknown>;

    if (typeof record.agent === "string") {
      setMissingModel(record);
    }

    const parallel = record.parallel;
    if (Array.isArray(parallel)) {
      for (const task of parallel) setMissingModel(task);
    } else if (parallel && typeof parallel === "object") {
      // Dynamic fanout template: { expand, parallel: { agent, task, ... }, collect }
      setMissingModel(parallel);
    }
  }
}

function forceSubagentChildModel(input: unknown): void {
  if (!input || typeof input !== "object" || Array.isArray(input)) return;
  const record = input as Record<string, unknown>;

  // Do not mutate management/control actions such as list/get/create/status/resume.
  if (typeof record.action === "string" && record.action.trim().length > 0) return;

  if (typeof record.agent === "string") setMissingModel(record);
  if (Array.isArray(record.tasks)) {
    for (const task of record.tasks) setMissingModel(task);
  }
  setChainModels(record.chain);
}

function workflowPrompt(task: string): string {
  return `Run this as a Pi dynamic-workflow-style orchestration.

Routing contract:
- Keep the parent/orchestrator on the current main model (${MAIN_FULL_MODEL}). Do not switch the parent model for child work.
- Use the subagent tool for fanout, chains, review loops, and implementation handoffs.
- Every spawned child, parallel task, chain step, reviewer, worker, scout, planner, researcher, oracle, context-builder, and delegate MUST explicitly set model: "${CHILD_MODEL}" unless I explicitly override it in the task.
- GLM children do not use reasoning; do not request thinking from child tasks unless a later override says so.
- Prefer async: true for multi-agent work so the main session stays responsive.
- Prefer fresh context for independent scouts/reviewers/researchers; use fork only when inherited session history is required.
- Keep a single writer against the active worktree unless worktree isolation is explicitly requested.
- Use dynamic fanout when a target-discovery step can return structured targets.
- Cross-check important findings with independent reviewers before reporting them as real.
- Finish with one concise orchestrator synthesis: what ran, child model used, findings/changes, validation, and residual risks.

Task:
${task}`;
}

async function enforceMainModel(pi: ExtensionAPI, ctx: ExtensionContext): Promise<void> {
  const current = ctx.model ? `${ctx.model.provider}/${ctx.model.id}` : undefined;
  if (current === MAIN_FULL_MODEL) return;

  const model = ctx.modelRegistry.find(MAIN_PROVIDER, MAIN_MODEL);
  if (!model) {
    ctx.ui.notify(`zai-workflows: main model not found: ${MAIN_FULL_MODEL}`, "error");
    return;
  }

  const ok = await pi.setModel(model);
  if (!ok) {
    ctx.ui.notify(`zai-workflows: could not switch main model to ${MAIN_FULL_MODEL}`, "error");
  }
}

export default function zaiWorkflows(pi: ExtensionAPI) {
  let enabled = true;

  pi.on("session_start", async (_event, ctx) => {
    enabled = isEnabledFromSession(ctx);
    await enforceMainModel(pi, ctx);
    ctx.ui.setStatus("zai-workflows", enabled ? `main ${MAIN_MODEL} / children ${CHILD_MODEL}` : "zai workflows off");
  });

  pi.on("model_select", async (event, ctx) => {
    if (!enabled) return;
    const next = `${event.model.provider}/${event.model.id}`;
    if (next !== MAIN_FULL_MODEL) {
      ctx.ui.setStatus("zai-workflows", `main ${next} ⚠ / children ${CHILD_MODEL}`);
      ctx.ui.notify(`zai-workflows: orchestrator is ${next}; expected ${MAIN_FULL_MODEL}. Run /zai-main to switch back.`, "info");
      return;
    }
    ctx.ui.setStatus("zai-workflows", `main ${MAIN_MODEL} / children ${CHILD_MODEL}`);
  });

  pi.on("before_agent_start", async (event, _ctx) => {
    if (!enabled) return;
    return {
      systemPrompt:
        event.systemPrompt +
        `\n\nZAI workflow routing: When using the subagent tool, keep this parent/orchestrator on ${MAIN_FULL_MODEL}. All child subagent runs must explicitly set model: "${CHILD_MODEL}" unless the user explicitly names a different child model. The zai-workflows extension also patches missing subagent model fields at tool-call time. For multi-agent work, prefer async chains, independent review fanout, dynamic fanout from structured target lists, and a single final synthesis by the parent.`,
    };
  });

  pi.on("tool_call", async (event, _ctx) => {
    if (!enabled) return;
    if (event.toolName !== "subagent") return;
    forceSubagentChildModel(event.input);
  });

  pi.on("input", async (event) => {
    if (!enabled || event.source === "extension") return { action: "continue" as const };
    const text = event.text.trim();
    if (text.startsWith("/")) return { action: "continue" as const };

    const triggers = ["zai workflow:", "zai-workflow:", "ultracode:", "dynamic workflow:"];
    const match = triggers.find((trigger) => text.toLowerCase().startsWith(trigger));
    if (!match) return { action: "continue" as const };

    const task = text.slice(match.length).trim();
    if (!task) return { action: "continue" as const };
    return { action: "transform" as const, text: workflowPrompt(task), images: event.images };
  });

  pi.registerCommand("zai-main", {
    description: `Switch the main/orchestrator model to ${MAIN_FULL_MODEL}`,
    handler: async (_args, ctx) => {
      await enforceMainModel(pi, ctx);
      const current = ctx.model ? `${ctx.model.provider}/${ctx.model.id}` : "none";
      ctx.ui.notify(`Main model: ${current}`, current === MAIN_FULL_MODEL ? "info" : "error");
    },
  });

  pi.registerCommand("zai-ultra", {
    description: "Toggle ZAI child-subagent routing instructions: /zai-ultra on|off|status",
    handler: async (args, ctx) => {
      const value = args.trim().toLowerCase();
      if (value === "on" || value === "enable") {
        enabled = true;
        pi.appendEntry(STATE_TYPE, { enabled, timestamp: new Date().toISOString() });
      } else if (value === "off" || value === "disable") {
        enabled = false;
        pi.appendEntry(STATE_TYPE, { enabled, timestamp: new Date().toISOString() });
      } else if (value && value !== "status") {
        ctx.ui.notify("Usage: /zai-ultra on|off|status", "error");
        return;
      }
      ctx.ui.setStatus("zai-workflows", enabled ? `main ${MAIN_MODEL} / children ${CHILD_MODEL}` : "zai workflows off");
      ctx.ui.notify(`ZAI workflow routing is ${enabled ? "ON" : "OFF"}. Main=${MAIN_FULL_MODEL}, children=${CHILD_MODEL}`, "info");
    },
  });

  pi.registerCommand("zai-workflow", {
    description: `Run a dynamic-workflow-style task with ${MAIN_FULL_MODEL} orchestrating ${CHILD_MODEL} subagents`,
    handler: async (args, ctx) => {
      const task = args.trim();
      if (!task) {
        ctx.ui.notify("Usage: /zai-workflow <task>", "error");
        return;
      }
      await enforceMainModel(pi, ctx);
      await pi.sendUserMessage(workflowPrompt(task));
    },
  });

  pi.registerCommand("zai-workflow-status", {
    description: "Show the configured main and child workflow model routing",
    handler: async (_args, ctx) => {
      const current = ctx.model ? `${ctx.model.provider}/${ctx.model.id}` : "none";
      ctx.ui.notify(
        [`zai-workflows ${enabled ? "ON" : "OFF"}`, `main/orchestrator: ${current} (target ${MAIN_FULL_MODEL})`, `subagents: ${CHILD_MODEL}`].join("\n"),
        "info",
      );
    },
  });
}
