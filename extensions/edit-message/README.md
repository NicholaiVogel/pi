# edit-message

Edit any assistant message — its **visible content *and* its reasoning/thinking
trace** — then truncate the conversation at that point and continue from there.

## Why

Pi stores conversations as an append-only tree. You can't overwrite a stored
message, so this extension does the next best thing: it branches the session to
the edited message's parent and appends your edited version as the new leaf. The
old message and everything after it become a dead sibling branch — still
reachable via `/tree`, but no longer part of the active conversation.

## Install

This is a global extension. It lives at
`~/.pi/agent/extensions/edit-message/index.ts` and is auto-discovered by pi.
Run `/reload` inside pi (or restart) to pick it up.

## Use

1. Run `/edit-message` (or `/em`), or press **Ctrl+Shift+E**.
2. A navigator opens over your conversation. Move the highlight with
   **↑/↓** (or **k/j**).
3. Press:
   - **Enter** or **e** — edit in pi's in-TUI modal editor.
   - **v** — edit in your external editor
     (`$PI_EDIT_MESSAGE_EDITOR` → `$VISUAL` → `$EDITOR` → `nvim`).
   - **q** / **Esc** — cancel.
4. The editor buffer uses the standard reasoning-model shape — reasoning first
   inside `<think>…</think>`, then the visible response:

   ```
   <think>
   <the assistant's reasoning / thinking trace>
   </think>

   <the assistant's visible reply>
   ```

   - Edit the text inside `<think>…</think>` to change the reasoning.
   - Edit the text after `</think>` to change the visible reply.
   - Empty the `<think>` block (or delete the tags) to drop reasoning.
   - If the original message had no thinking, the block starts empty — add your own.
5. Save with **Ctrl+S**. The conversation is truncated to `[…history…, edited-message]`
   and the editor refocuses so you can type your next prompt. The model's next turn
   uses the edited history.

> **Newlines:** in the edit buffer, **Enter inserts a newline** (no Shift needed —
> this works in every terminal). Press **Ctrl+S** to save, **Ctrl+G** to edit in
> nvim/$EDITOR, **Esc** to cancel. Shift+Enter / Ctrl+J / Alt+Enter also insert
> newlines. This sidesteps the common issue where terminals can't distinguish
> Shift+Enter from Enter.

## Keys

| Key | Action |
|-----|--------|
| `/edit-message`, `/em` | Open the navigator |
| `Ctrl+Shift+E` | Prefill `/em` (then press **Enter**) to open the navigator¹ |
| `↑` `↓` / `k` `j` | Move highlight |
| `Enter` / `e` | Edit highlighted message (modal) |
| `v` | Edit highlighted message (external `$EDITOR`) |
| `PgUp` / `PgDn` | Jump by 8 |
| `q` / `Esc` | Cancel |

In the edit buffer: **Enter** = newline · **Ctrl+S** = save · **Ctrl+G** = edit in nvim/$EDITOR · **Esc** = cancel.

To change the shortcut, edit the `registerShortcut("ctrl+shift+e", …)` line in
`index.ts` (extension shortcuts are keyed by their literal key combo, not by a
rebindable action id) and run `/reload`.

> ¹ The shortcut can't open the navigator directly: pi's shortcut handler context
> can't refresh the agent's in-memory message list (that needs a command context),
> and `pi.sendUserMessage` bypasses slash-command dispatch. So the shortcut
> prefills `/em` into the editor and you press Enter, which runs the full flow.
> Typing `/em` directly works the same way.

## Tool-call messages

If a selected message contains tool calls, editing drops them and the turn
becomes a text-only message. You'll get a confirmation prompt first.

## Reasoning signature caveat (important)

Some providers cryptographically sign reasoning blocks:

- **Anthropic** signs every thinking block. A hand-edited thinking block has no
  valid signature, so on the *next* turn Anthropic will typically **drop or
  reject** it.
- **OpenAI o-series** reasoning summaries can't be round-tripped either.

This extension always stores and displays your edited reasoning correctly. To
minimize breakage it **preserves the original signature when you leave the
reasoning text unchanged**. But if you actually edit the reasoning, expect that
the provider may ignore it on continuation — the edited *visible content* and
the rest of the history still drive the model normally.

Redacted thinking blocks (safety-filtered) are opaque; this extension never
edits them and passes them through verbatim.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `PI_EDIT_MESSAGE_EDITOR` | Override the external editor command (e.g. `nvim`, `code --wait`). Falls back to `$VISUAL`, then `$EDITOR`, then `nvim`. |

## How truncation works

`branch(targetParentId)` → `appendMessage(editedAssistant)` →
`navigateTree(newLeafId)`. The final `navigateTree` is a no-op at the session
level (the leaf is already the edited message) but its UI wrapper rebuilds the
chat, so the truncated + edited transcript renders immediately. The abandoned
branch stays in the session file; use `/tree` to get back to it.
