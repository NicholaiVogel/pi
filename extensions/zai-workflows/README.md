# ZAI Workflows for Pi

Routes Pi workflow orchestration so the parent/main session stays on `openai-codex/gpt-5.5` and child subagents run on `zai/glm-5.1`.

When enabled, the extension also intercepts `subagent` tool calls and fills in missing `model` fields with `zai/glm-5.1` for single-agent runs, top-level parallel tasks, chain steps, and dynamic fanout templates. Explicit per-task model overrides are preserved.

## Commands

- `/zai-main` — switch the main/orchestrator model back to `openai-codex/gpt-5.5`.
- `/zai-ultra on|off|status` — toggle extra routing instructions injected into the parent system prompt.
- `/zai-workflow <task>` — wrap a task in a dynamic-workflow-style orchestration prompt that tells the parent to use GLM child subagents.
- `/zai-workflow-status` — show current routing status.

## Natural triggers

When routing is on, these prompt prefixes are transformed into the same workflow prompt:

- `zai workflow: ...`
- `zai-workflow: ...`
- `ultracode: ...`
- `dynamic workflow: ...`

## Saved chains

Two reusable chains are installed under `~/.pi/agent/chains/zai/`:

- `/run-chain zai-dynamic-review -- <review task>`
- `/run-chain zai-implement-review -- <implementation task>`

The chain files explicitly set every child step to `zai/glm-5.1`.

## Persistent model defaults

`~/.pi/agent/settings.json` is configured with:

- main default: `openai-codex/gpt-5.5`
- builtin subagent overrides: `zai/glm-5.1` with thinking `off`

A backup of the pre-change settings file was written to:

`~/.pi/backups/settings.json.bak-zai-workflows`
