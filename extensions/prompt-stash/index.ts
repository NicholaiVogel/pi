import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

interface StashEntry {
	readonly text: string;
	readonly timestamp: number;
	readonly preview: string;
}

const MAX_STASH_SIZE = 10;
const WIDGET_ID = "prompt-stash";
const ENTRY_TYPE = "prompt-stash";

export default function (pi: ExtensionAPI) {
	// Stash stack — most recent first
	let stash: StashEntry[] = [];
	// Whether auto-restore is pending (set after agent_end if editor is empty)
	let restorePending = false;

	// ---------------------------------------------------------------------------
	// State persistence
	// ---------------------------------------------------------------------------

	function rebuildStash(entries: Iterable<any>) {
		stash = [];
		for (const entry of entries) {
			if (
				entry.type === "custom" &&
				entry.customType === ENTRY_TYPE &&
				Array.isArray(entry.data?.stash)
			) {
				stash = entry.data.stash;
				break; // use latest
			}
		}
	}

	// ---------------------------------------------------------------------------
	// Stash operations
	// ---------------------------------------------------------------------------

	function pushStash(text: string): StashEntry {
		const entry: StashEntry = {
			text,
			timestamp: Date.now(),
			preview: text.length > 60 ? text.slice(0, 57) + "..." : text,
		};
		stash.unshift(entry);
		if (stash.length > MAX_STASH_SIZE) stash.pop();
		restorePending = false;
		return entry;
	}

	function popStash(): StashEntry | undefined {
		restorePending = false;
		return stash.shift();
	}

	function dropStash(): StashEntry | undefined {
		return stash.shift();
	}

	function clearStash(): number {
		const count = stash.length;
		stash = [];
		restorePending = false;
		return count;
	}

	// ---------------------------------------------------------------------------
	// UI helpers
	// ---------------------------------------------------------------------------

	function updateWidget(ctx: any) {
		if (!ctx.hasUI) return;
		if (stash.length === 0) {
			ctx.ui.setWidget(WIDGET_ID, undefined);
			return;
		}
		const lines: string[] = [];
		const top = stash[0]!;
		const indicator = restorePending ? "⏎ " : "📋 ";
		lines.push(
			`${indicator}${ctx.ui.theme.fg("muted", `stash[${stash.length}]`)} ${ctx.ui.theme.fg("dim", top.preview)}`,
		);
		if (stash.length > 1) {
			lines.push(
				ctx.ui.theme.fg("dim", `  +${stash.length - 1} more — /stash list`),
			);
		}
		ctx.ui.setWidget(WIDGET_ID, lines, { placement: "belowEditor" });
	}

	function restoreTopStashIfEditorEmpty(ctx: any, message: string) {
		if (!ctx.hasUI) return;
		if (stash.length === 0) return;
		try {
			const current = ctx.ui.getEditorText?.()?.trim();
			if (current) return; // never overwrite text the user has already started typing

			const entry = popStash();
			if (!entry) return;

			ctx.ui.setEditorText(entry.text);
			pi.appendEntry(ENTRY_TYPE, { stash });
			ctx.ui.notify(message, "info");
			updateWidget(ctx);
		} catch {
			// editor might not be available in non-tui modes
		}
	}

	// ---------------------------------------------------------------------------
	// Shortcut: Ctrl+S to stash
	// ---------------------------------------------------------------------------

	pi.registerShortcut("ctrl+s", {
		description: "Stash current prompt draft",
		handler: async (ctx: any) => {
			if (!ctx.hasUI) return;
			const text = ctx.ui.getEditorText()?.trim();
			if (!text) {
				ctx.ui.notify("Nothing to stash — editor is empty", "info");
				return;
			}

			pushStash(text);
			ctx.ui.setEditorText("");
			pi.appendEntry(ENTRY_TYPE, { stash });
			ctx.ui.notify(`Stashed (${stash.length})`, "info");
			updateWidget(ctx);
		},
	});

	// ---------------------------------------------------------------------------
	// Commands
	// ---------------------------------------------------------------------------

	pi.registerCommand("stash", {
		description: "Manage stashed prompts (pop, list, drop, clear)",
		getArgumentCompletions(prefix: string) {
			const subs = ["pop", "list", "drop", "clear"];
			return subs
				.filter((s) => s.startsWith(prefix))
				.map((s) => ({ value: s, label: s }));
		},
		handler: async (args: string, ctx: any) => {
			const parts = args.trim().split(/\s+/);
			const sub = parts[0] || "list";

			switch (sub) {
				case "pop": {
					if (stash.length === 0) {
						ctx.ui.notify("No stashed prompts", "warning");
						return;
					}
					const entry = popStash()!;
					ctx.ui.setEditorText(entry.text);
					pi.appendEntry(ENTRY_TYPE, { stash });
					ctx.ui.notify(`Restored: ${entry.preview}`, "info");
					updateWidget(ctx);
					return;
				}

				case "drop": {
					if (stash.length === 0) {
						ctx.ui.notify("No stashed prompts", "warning");
						return;
					}
					const dropped = dropStash()!;
					pi.appendEntry(ENTRY_TYPE, { stash });
					ctx.ui.notify(`Dropped: ${dropped.preview}`, "info");
					updateWidget(ctx);
					return;
				}

				case "clear": {
					const count = clearStash();
					pi.appendEntry(ENTRY_TYPE, { stash });
					ctx.ui.notify(`Cleared ${count} stashed prompt(s)`, "info");
					updateWidget(ctx);
					return;
				}

				case "list":
				default: {
					if (stash.length === 0) {
						ctx.ui.notify("No stashed prompts. Ctrl+S to stash one.", "info");
						return;
					}
					const lines: string[] = [];
					for (let i = 0; i < stash.length; i++) {
						const entry = stash[i]!;
						const age = formatAge(entry.timestamp);
						const marker = i === 0 ? "▸" : " ";
						lines.push(
							`  ${marker} ${ctx.ui.theme.fg("muted", `#${i + 1}`)} ${ctx.ui.theme.fg("dim", entry.preview)} ${ctx.ui.theme.fg("dim", age)}`,
						);
					}
					ctx.ui.notify(`Stashed prompts (${stash.length}):\n${lines.join("\n")}`, "info");
					return;
				}
			}
		},
	});

	// ---------------------------------------------------------------------------
	// Auto-restore after the interruption prompt is submitted
	// ---------------------------------------------------------------------------

	pi.on("before_agent_start" as any, async (_event: any, ctx: any) => {
		if (!ctx.hasUI) return;
		if (stash.length === 0) return;

		// The submitted prompt has already been captured by pi at this point.
		// Restore on the next tick so the editor has time to settle empty, then the
		// user can keep editing the original draft while the interruption answer streams.
		setTimeout(() => restoreTopStashIfEditorEmpty(ctx, "Restored stashed prompt"), 25);
	});

	pi.on("agent_end" as any, async (_event: any, ctx: any) => {
		if (!ctx.hasUI) return;
		if (stash.length === 0) return;

		// Fallback only: if immediate restore missed for any reason, restore once the
		// turn completes. In the normal path before_agent_start has already popped it.
		setTimeout(() => restoreTopStashIfEditorEmpty(ctx, "Restored stashed prompt"), 100);
	});

	// ---------------------------------------------------------------------------
	// Restore state on session load
	// ---------------------------------------------------------------------------

	pi.on("session_start" as any, async (_event: any, ctx: any) => {
		rebuildStash(ctx.sessionManager.getEntries());
		restorePending = stash.length > 0;
		updateWidget(ctx);
	});

	pi.on("session_shutdown" as any, async () => {
		// nothing to clean up — stash is persisted in session entries
	});
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatAge(timestamp: number): string {
	const seconds = Math.floor((Date.now() - timestamp) / 1000);
	if (seconds < 60) return `${seconds}s ago`;
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `${days}d ago`;
}
