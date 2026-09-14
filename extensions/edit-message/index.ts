/**
 * Edit Message — edit any assistant message (visible content + reasoning/thinking)
 * in place, truncate the conversation at that point, and continue from there.
 *
 * Why this exists:
 *   Pi's session is an append-only tree, so you can't mutate a stored message.
 *   Instead we branch to the message's parent, append an edited copy of the
 *   assistant message as the new leaf, and rebuild the view. The old message and
 *   everything after it become a dead sibling branch (still reachable via /tree).
 *
 * Trigger:
 *   - `/edit-message` (alias `/em`) opens a transcript navigator.
 *   - Default shortcut: Ctrl+Shift+E (rebind via keybindings.json → "ext.edit-message").
 *
 * Navigator keys:
 *   ↑/↓ or k/j   move highlight
 *   ⏎ / e        edit in the in-TUI modal editor
 *   v            edit in $PI_EDIT_MESSAGE_EDITOR / $VISUAL / $EDITOR / nvim
 *   q / Esc      cancel
 *
 * Edit-buffer keys (plain Enter inserts a newline — works in every terminal):
 *   Enter        newline   (Shift+Enter / Ctrl+J / Alt+Enter also work)
 *   Ctrl+S       save
 *   Ctrl+G       edit in $EDITOR / nvim, then return here
 *   Esc          cancel
 *
 * After saving: the conversation is truncated to [...history..., edited-message]
 * and the editor refocuses so you can type the next prompt. The edited reasoning
 * is stored on the message; see the README for the provider signature caveat.
 */

import type { ExtensionAPI, SessionEntry, SessionMessageEntry } from "@earendil-works/pi-coding-agent";
import { DynamicBorder, getSelectListTheme } from "@earendil-works/pi-coding-agent";
import { Container, Editor, Spacer, Text, matchesKey, truncateToWidth } from "@earendil-works/pi-tui";
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Minimal structural type for the TUI methods we need (avoids fragile imports).
interface TuiLike {
	stop(): void;
	start(): void;
	requestRender(force?: boolean): void;
}

/** Anything a command handler / shortcut receives; we narrow at runtime. */
interface Ctx {
	mode: string;
	ui: any;
	sessionManager: any;
	isIdle?(): boolean;
	waitForIdle?(): Promise<void>;
	navigateTree?(targetId: string, options?: { summarize?: boolean; label?: string }): Promise<{ cancelled: boolean }>;
}

interface ThinkingPart {
	text: string;
	signature?: string;
}

interface AssistantParts {
	/** Non-redacted, user-editable thinking blocks (in order). */
	editableThinking: ThinkingPart[];
	/** Redacted thinking blocks — preserved verbatim, never edited. */
	redactedThinking: Array<Record<string, unknown>>;
	/** All visible text blocks joined. */
	text: string;
	/** Whether the message contains tool calls (editing drops them). */
	hasToolCalls: boolean;
}

interface NavigatorItem {
	entryId: string;
	parentId: string | null;
	preview: string;
	parts: AssistantParts;
}

/** Pull editable text + thinking out of an assistant message's content blocks. */
function extractParts(message: any): AssistantParts {
	if (message?.role !== "assistant") {
		return { editableThinking: [], redactedThinking: [], text: "", hasToolCalls: false };
	}
	const editableThinking: ThinkingPart[] = [];
	const redactedThinking: Array<Record<string, unknown>> = [];
	const texts: string[] = [];
	let hasToolCalls = false;

	for (const block of message.content ?? []) {
		if (block.type === "text") {
			texts.push(String(block.text ?? ""));
		} else if (block.type === "thinking") {
			if (block.redacted) {
				redactedThinking.push({ ...block });
			} else {
				editableThinking.push({
					text: String(block.thinking ?? ""),
					signature: typeof block.thinkingSignature === "string" ? block.thinkingSignature : undefined,
				});
			}
		} else if (block.type === "toolCall") {
			hasToolCalls = true;
		}
	}

	return { editableThinking, redactedThinking, text: texts.join("\n\n"), hasToolCalls };
}

function firstLine(text: string, max = 64): string {
	const line = text.split("\n").find((l) => l.trim().length > 0) ?? "";
	const clean = line.replace(/[#>*`_-]/g, "").trim();
	return truncateToWidth(clean.length > 0 ? clean : "(empty message)", Math.max(8, max));
}

/**
 * Build the editor buffer in the standard reasoning-model shape:
 *
 *   <think>
 *   reasoning / thinking
 *   </think>
 *
 *   visible assistant response
 *
 * The whole buffer is plain prose the user edits freely; no custom markers.
 * If the original had no reasoning the <think> block is empty (and editable).
 */
function buildBuffer(parts: AssistantParts): string {
	const thinking = parts.editableThinking.map((t) => t.text).join("\n\n");
	return `<think>\n${thinking}\n</think>\n\n${parts.text}`;
}

/** Parse the edited buffer back into { text, thinking }. */
function parseBuffer(buffer: string): { text: string; thinking: string } {
	const openTag = "<think>";
	const closeTag = "</think>";
	const openIdx = buffer.indexOf(openTag);
	const closeIdx = openIdx >= 0 ? buffer.indexOf(closeTag, openIdx + openTag.length) : -1;

	let thinking = "";
	let text = "";
	if (openIdx >= 0 && closeIdx > openIdx) {
		// <think>...</think> present: inside = reasoning, after = response.
		thinking = buffer.slice(openIdx + openTag.length, closeIdx).trim();
		text = buffer.slice(closeIdx + closeTag.length).trim();
	} else if (openIdx >= 0) {
		// <think> with no closing tag: treat the rest as reasoning.
		thinking = buffer.slice(openIdx + openTag.length).trim();
	} else {
		// No think tags at all: the whole buffer is the response.
		text = buffer.trim();
	}

	return { text, thinking };
}

/** A zeroed Usage so edited tool-call turns don't inherit the original turn's tokens/cost. */
function zeroUsage(): any {
	return {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0,
		totalTokens: 0,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
	};
}

/**
 * Reconstruct the edited assistant message.
 *
 * Walks the ORIGINAL content blocks in order so redacted thinking stays in its
 * original position (some providers require this). The first editable-thinking
 * block is replaced with the edited reasoning; the first text block with the
 * edited text. Extra editable-thinking / text blocks are merged into those.
 * Tool-call blocks are dropped (the caller confirms when this is allowed).
 * `thinkingSignature` / `textSignature` are preserved only when that section is
 * byte-identical to the original, so unchanged reasoning stays valid for
 * providers (e.g. Anthropic) that sign thinking blocks.
 */
function buildEditedMessage(original: any, parts: AssistantParts, editedText: string, editedThinking: string): any {
	const content: unknown[] = [];
	let textEmitted = false;
	let thinkingEmitted = false;

	const singleEditable = parts.editableThinking.length === 1 ? parts.editableThinking[0] : undefined;

	for (const block of original?.content ?? []) {
		if (block.type === "thinking" && block.redacted) {
			// Opaque — keep byte-for-byte in its original position.
			content.push({ ...block });
		} else if (block.type === "thinking") {
			// Substitute the edited reasoning at the first editable-thinking position.
			if (!thinkingEmitted) {
				if (editedThinking.length > 0) {
					const unchanged = singleEditable?.text === editedThinking;
					const blk: Record<string, unknown> = { type: "thinking", thinking: editedThinking };
					if (unchanged && singleEditable?.signature) blk.thinkingSignature = singleEditable.signature;
					content.push(blk);
				}
				thinkingEmitted = true;
			}
		} else if (block.type === "text") {
			if (!textEmitted && editedText.length > 0) {
				const blk: Record<string, unknown> = { type: "text", text: editedText };
				const unchanged = editedText === parts.text && !parts.hasToolCalls;
				if (unchanged && block.textSignature) blk.textSignature = block.textSignature;
				content.push(blk);
				textEmitted = true;
			}
		} else if (block.type === "toolCall") {
			// dropped — caller confirmed via parts.hasToolCalls
		}
		// Other block types are not reconstructable here; they are dropped.
	}

	// If the original had no text / editable-thinking block, append what the user wrote.
	if (!textEmitted && editedText.length > 0) content.push({ type: "text", text: editedText });
	if (!thinkingEmitted && editedThinking.length > 0) content.push({ type: "thinking", thinking: editedThinking });

	const result: any = { ...original, role: "assistant", content, timestamp: Date.now() };

	// The edited message is a fresh, complete turn: never inherit an error/abort/
	// toolUse stop reason or an errorMessage (those would render a false "Error:"
	// banner and could mis-trigger overflow auto-compaction on the next prompt).
	result.stopReason = "stop";
	delete result.errorMessage;
	// A tool-call turn edited down to text also didn't produce these tokens.
	if (parts.hasToolCalls) {
		result.usage = zeroUsage();
	}

	return result;
}

/** Launch $EDITOR on a temp file, suspending the TUI around it (mirrors pi's ctrl+g). */
async function editExternally(tui: TuiLike, initial: string): Promise<string | undefined> {
	const dir = mkdtempSync(join(tmpdir(), "pi-editmsg-"));
	const file = join(dir, "message.md");
	writeFileSync(file, initial.endsWith("\n") ? initial : initial + "\n", "utf8");

	const cmd = process.env.PI_EDIT_MESSAGE_EDITOR || process.env.VISUAL || process.env.EDITOR || "nvim";
	const [editor, ...args] = cmd.trim().split(/\s+/);

	process.stdout.write(
		`
Launching external editor (${cmd}).
Reasoning goes inside <think>…</think>; the response follows it. Pi resumes when the editor exits.
`,
	);

	tui.stop();
	try {
		const code = await new Promise<number | null>((resolve) => {
			const child = spawn(editor!, [...args, file], {
				stdio: "inherit",
				shell: process.platform === "win32",
			});
			child.on("error", () => resolve(null));
			child.on("close", (c) => resolve(c));
		});
		if (code !== 0) return undefined;
		return readFileSync(file, "utf8").replace(/\n$/, "");
	} finally {
		tui.start();
		tui.requestRender(true);
		try {
			rmSync(dir, { recursive: true, force: true });
		} catch {
			// best-effort cleanup
		}
	}
}

/**
 * Multi-line edit buffer mounted via ctx.ui.custom.
 *
 * Plain **Enter inserts a newline** (so newlines work in every terminal — no
 * Shift/Alt detection needed), **Ctrl+S saves**, **Esc cancels**. Shift+Enter,
 * Ctrl+J and Alt+Enter still insert newlines too (handled by the Editor).
 */
class EditBuffer extends Container {
	private editor: any;
	private tui: any;
	private kb: any;
	private onSubmit: (text: string) => void;
	private onCancel: () => void;
	private _focused = false;

	constructor(
		tui: any,
		appTheme: any,
		kb: any,
		title: string,
		prefill: string,
		onSubmit: (text: string) => void,
		onCancel: () => void,
	) {
		super();
		this.tui = tui;
		this.kb = kb;
		this.onSubmit = onSubmit;
		this.onCancel = onCancel;

		const editorTheme = {
			borderColor: (text: string) => appTheme.fg("borderMuted", text),
			selectList: getSelectListTheme(),
		};
		this.editor = new Editor(tui, editorTheme, { paddingX: 1 });
		if (prefill) this.editor.setText(prefill);

		this.addChild(new DynamicBorder());
		this.addChild(new Spacer(1));
		this.addChild(new Text(appTheme.fg("accent", title), 1, 0));
		this.addChild(new Spacer(1));
		this.addChild(this.editor);
		this.addChild(new Spacer(1));
		this.addChild(new Text(appTheme.fg("dim", "enter = newline    ctrl+s = save    ctrl+g = nvim    esc = cancel"), 1, 0));
		this.addChild(new Spacer(1));
		this.addChild(new DynamicBorder());
	}

	get focused(): boolean {
		return this._focused;
	}
	set focused(value: boolean) {
		this._focused = value;
		this.editor.focused = value;
	}

	handleInput(data: string): void {
		// Esc / Ctrl+C → cancel
		if (this.kb.matches(data, "tui.select.cancel")) {
			this.onCancel();
			return;
		}
		// Ctrl+G → edit in external editor ($VISUAL/$EDITOR/nvim), then return here
		if (this.kb.matches(data, "app.editor.external")) {
			void this.openExternal();
			return;
		}
		// Ctrl+S → save. Use matchesKey (not a raw byte check) so it works under the
		// Kitty/CSI-u keyboard protocol pi enables, as well as legacy encodings.
		if (matchesKey(data, "ctrl+s")) {
			this.onSubmit(this.editor.getText());
			return;
		}
		// Enter → newline (the fix: works regardless of terminal Shift+Enter support)
		if (this.kb.matches(data, "tui.input.submit")) {
			this.editor.addNewLine();
			return;
		}
		// Everything else: Shift+Enter / Ctrl+J / Alt+Enter newline, cursor, delete, etc.
		this.editor.handleInput(data);
	}

	private async openExternal(): Promise<void> {
		const initial = this.editor.getText();
		const result = await editExternally(this.tui, initial);
		if (result !== undefined) {
			this.editor.setText(result);
		}
	}
}

/** A simple keyboard-driven navigator over assistant messages. */
class MessageNavigator {
	private items: NavigatorItem[];
	private theme: any;
	private onSelect: (entryId: string, mode: "modal" | "external") => void;
	private onClose: () => void;
	private cursor = 0;
	private cachedWidth?: number;
	private cachedLines?: string[];

	constructor(
		items: NavigatorItem[],
		theme: any,
		onSelect: (entryId: string, mode: "modal" | "external") => void,
		onClose: () => void,
	) {
		this.items = items;
		this.theme = theme;
		this.onSelect = onSelect;
		this.onClose = onClose;
		this.cursor = Math.max(0, items.length - 1); // start on the newest message
	}

	handleInput(data: string): void {
		if (matchesKey(data, "escape") || matchesKey(data, "ctrl+c") || data === "q") {
			this.onClose();
			return;
		}
		if (matchesKey(data, "up") || data === "k") {
			this.cursor = Math.max(0, this.cursor - 1);
			this.invalidate();
			return;
		}
		if (matchesKey(data, "down") || data === "j") {
			this.cursor = Math.min(this.items.length - 1, this.cursor + 1);
			this.invalidate();
			return;
		}
		if (matchesKey(data, "pageUp")) {
			this.cursor = Math.max(0, this.cursor - 8);
			this.invalidate();
			return;
		}
		if (matchesKey(data, "pageDown")) {
			this.cursor = Math.min(this.items.length - 1, this.cursor + 8);
			this.invalidate();
			return;
		}
		if (matchesKey(data, "return") || matchesKey(data, "enter") || data === "e") {
			const item = this.items[this.cursor]!;
			this.onSelect(item.entryId, "modal");
			return;
		}
		if (data === "v") {
			const item = this.items[this.cursor]!;
			this.onSelect(item.entryId, "external");
			return;
		}
	}

	render(width: number): string[] {
		if (this.cachedLines && this.cachedWidth === width) return this.cachedLines;
		const t = this.theme;
		const w = Math.max(20, width);
		const lines: string[] = [];

		// Title
		const title = t.fg("accent", t.bold(" Edit an assistant message "));
		lines.push(truncateToWidth(t.fg("borderMuted", "─") + title + t.fg("borderMuted", "─".repeat(Math.max(0, w - 27))), w));
		lines.push("");

		// Windowed list
		const windowSize = 10;
		let start = Math.max(0, this.cursor - Math.floor(windowSize / 2));
		const end = Math.min(this.items.length, start + windowSize);
		start = Math.max(0, end - windowSize);

		if (start > 0) {
			lines.push(truncateToWidth(`  ${t.fg("dim", `↑ ${start} earlier message(s) above …`)}`, w));
		}

		for (let i = start; i < end; i++) {
			const item = this.items[i]!;
			const active = i === this.cursor;
			const marker = active ? t.fg("accent", "▸") : " ";
			const idx = t.fg("dim", `#${String(i + 1).padStart(2, "0")}`);
			const badges: string[] = [];
			if (item.parts.editableThinking.length > 0 || item.parts.redactedThinking.length > 0) {
				badges.push(t.fg("muted", "thinking"));
			}
			if (item.parts.hasToolCalls) badges.push(t.fg("warning", "tools"));
			const badgeStr = badges.length ? " " + badges.join(" · ") : "";
			const preview = active
				? t.fg("text", t.bold(firstLine(item.preview, w - 34)))
				: t.fg("muted", firstLine(item.preview, w - 34));
			lines.push(truncateToWidth(`${marker} ${idx} ${preview}${badgeStr}`, w));
		}

		if (end < this.items.length) {
			lines.push(truncateToWidth(`  ${t.fg("dim", `↓ ${this.items.length - end} newer message(s) below …`)}`, w));
		}

		lines.push("");
		lines.push(truncateToWidth(t.fg("borderMuted", "─".repeat(w)), w));

		// Preview pane for the highlighted message
		const current = this.items[this.cursor]!;
		const allLines = current.parts.text.split("\n").filter((l) => l.trim().length > 0);
		const previewLines = allLines.slice(0, 5);
		if (previewLines.length === 0) {
			lines.push(truncateToWidth(`  ${t.fg("dim", "(no visible text)")}`, w));
		} else {
			for (const l of previewLines) {
				lines.push(truncateToWidth(`  ${t.fg("text", l)}`, w));
			}
			if (allLines.length > 5) {
				lines.push(truncateToWidth(`  ${t.fg("dim", `… ${allLines.length - 5} more line(s)`)}`, w));
			}
		}

		lines.push("");
		lines.push(
			truncateToWidth(
				`  ${t.fg("dim", "↑/↓ navigate")}   ${t.fg("accent", "⏎/e")} ${t.fg("dim", "edit")}   ${t.fg("accent", "v")} ${t.fg("dim", "edit in $EDITOR")}   ${t.fg("dim", "q cancel")}`,
				w,
			),
		);
		lines.push("");

		this.cachedWidth = width;
		this.cachedLines = lines;
		return lines;
	}

	invalidate(): void {
		this.cachedWidth = undefined;
		this.cachedLines = undefined;
	}
}

async function runEditMessage(_args: string, ctx: Ctx): Promise<void> {
	if (ctx.mode !== "tui") {
		ctx.ui.notify("edit-message requires interactive (TUI) mode", "error");
		return;
	}

	// Don't open the editor while the agent is mid-turn (branch/navigate would conflict).
	if (typeof ctx.isIdle === "function" && !ctx.isIdle()) {
		ctx.ui.notify("Wait for the current response to finish first.", "warning");
		return;
	}

	if (typeof ctx.navigateTree !== "function") {
		ctx.ui.notify("edit-message is unavailable in this context.", "error");
		return;
	}

	// Gather assistant messages from the current branch (root → leaf).
	const branch: SessionEntry[] = ctx.sessionManager.getBranch();
	const items: NavigatorItem[] = [];
	for (const entry of branch) {
		if (entry.type !== "message") continue;
		if ((entry as SessionMessageEntry).message.role !== "assistant") continue;
		const parts = extractParts((entry as SessionMessageEntry).message);
		items.push({ entryId: entry.id, parentId: entry.parentId, preview: parts.text, parts });
	}

	if (items.length === 0) {
		ctx.ui.notify("No assistant messages to edit on this branch.", "warning");
		return;
	}

	// Open the navigator. Capture the TUI handle for the external-editor path.
	let tuiHandle: TuiLike | undefined;
	type Selection = { id: string; mode: "modal" | "external" } | null;
	const custom: (factory: (tui: TuiLike, theme: any, kb: unknown, done: (v: Selection) => void) => unknown, options?: { overlay?: boolean }) => Promise<Selection> = ctx.ui.custom.bind(ctx.ui);
	const selection: Selection = await custom((tui, theme, _kb, done) => {
		tuiHandle = tui;
		return new MessageNavigator(items, theme, (id, mode) => done({ id, mode }), () => done(null));
	});

	if (!selection) {
		ctx.ui.notify("Cancelled.", "info");
		return;
	}

	const targetEntry = ctx.sessionManager.getEntry(selection.id) as SessionMessageEntry | undefined;
	if (!targetEntry || targetEntry.type !== "message" || targetEntry.message.role !== "assistant") {
		ctx.ui.notify("Selected message is no longer available.", "error");
		return;
	}

	const parts = extractParts(targetEntry.message);

	// Tool-call turns: editing replaces them with a text-only message.
	if (parts.hasToolCalls) {
		const ok = await ctx.ui.confirm(
			"This message contains tool calls",
			"Editing it will drop the tool calls and truncate the turn to a text-only message. Continue?",
		);
		if (!ok) {
			ctx.ui.notify("Cancelled.", "info");
			return;
		}
	}

	const buffer = buildBuffer(parts);
	let edited: string | undefined;
	if (selection.mode === "external") {
		if (!tuiHandle) {
			ctx.ui.notify("External editor unavailable in this mode.", "error");
			return;
		}
		ctx.ui.notify("Opening $EDITOR… (pi resumes when it exits)", "info");
		edited = await editExternally(tuiHandle, buffer);
	} else {
		const editCustom: (
			factory: (tui: any, appTheme: any, kb: any, done: (v: string | undefined) => void) => unknown,
		) => Promise<string | undefined> = ctx.ui.custom.bind(ctx.ui);
		edited = await editCustom((tui, appTheme, kb, done) =>
			new EditBuffer(
				tui,
				appTheme,
				kb,
				"Edit assistant message",
				buffer,
				(text) => done(text),
				() => done(undefined),
			),
		);
	}

	if (edited === undefined) {
		ctx.ui.notify("Edit cancelled — nothing changed.", "info");
		return;
	}

	const { text: editedText, thinking: editedThinking } = parseBuffer(edited);

	// Refuse to save a totally empty message (would be rejected by providers).
	if (editedText.trim() === "" && editedThinking.trim() === "" && parts.redactedThinking.length === 0) {
		ctx.ui.notify("Cannot save an empty message (add text or reasoning, or cancel).", "warning");
		return;
	}

	// Nothing changed at all → no-op.
	const sameText = editedText === parts.text;
	const origThinking = parts.editableThinking.map((p) => p.text).join("\n\n");
	const sameThinking = editedThinking === origThinking;
	if (sameText && sameThinking && !parts.hasToolCalls) {
		ctx.ui.notify("No changes — nothing to do.", "info");
		return;
	}

	// Truncate + edit via the session tree.
	//
	//   branch(parentId)            -> leaf = parent (position for the append)
	//   appendMessage(edited)       -> newId, leaf = edited message
	//   branch(parentId)            -> move leaf OFF the new message so the next
	//                                 navigateTree is a REAL navigation, not a no-op
	//   navigateTree(newId)         -> real nav refreshes agent.state.messages from
	//                                 the SessionManager AND rebuilds the chat view
	//
	// navigateTree(targetId) short-circuits when target == leaf and would leave the
	// agent's in-memory message list pointing at the pre-edit history — so the next
	// prompt would send the OLD conversation to the model. Forcing a real nav is
	// what makes the edit actually take effect for the model.
	const parentId = targetEntry.parentId;
	if (!parentId) {
		ctx.ui.notify("Cannot edit the first message in the session.", "error");
		return;
	}

	const editedMessage = buildEditedMessage(targetEntry.message, parts, editedText, editedThinking);

	try {
		ctx.sessionManager.branch(parentId);
	} catch (err) {
		ctx.ui.notify(`Failed to branch session: ${(err as Error).message}`, "error");
		return;
	}

	let newId: string;
	try {
		newId = ctx.sessionManager.appendMessage(editedMessage);
	} catch (err) {
		ctx.ui.notify(`Failed to append edited message: ${(err as Error).message}`, "error");
		return;
	}

	try {
		// Move leaf off the new message so navigateTree(newId) is non-no-op.
		ctx.sessionManager.branch(parentId);
	} catch (err) {
		ctx.ui.notify(`Session may need /reload: ${(err as Error).message}`, "warning");
	}

	try {
		await ctx.navigateTree!(newId, { summarize: false, label: "edited" });
	} catch (err) {
		ctx.ui.notify(`Edited message saved (view may need /reload): ${(err as Error).message}`, "warning");
	}
}

export default function (pi: ExtensionAPI): void {
	pi.registerCommand("edit-message", {
		description: "Edit an assistant message (content + reasoning) and continue from there",
		handler: async (args: string, ctx: Ctx) => runEditMessage(args, ctx),
	});

	// Short alias.
	pi.registerCommand("em", {
		description: "Alias for /edit-message",
		handler: async (args: string, ctx: Ctx) => runEditMessage(args, ctx),
	});

	// Optional shortcut. The shortcut context can't refresh agent state (no
	// navigateTree) and pi.sendUserMessage bypasses command dispatch, so we prefill
	// the command into the editor; pressing Enter runs the full flow with a real
	// command context. To change the key, edit the literal below and /reload.
	pi.registerShortcut("ctrl+shift+e", {
		description: "Prefill /em to open the edit-message navigator",
		handler: async (ctx: Ctx) => {
			ctx.ui.setEditorText("/em");
			ctx.ui.notify("Press Enter to open the edit-message navigator.", "info");
		},
	});
}
