import {
	CustomEditor,
	type ExtensionAPI,
	type KeybindingsManager,
	type Theme,
} from "@earendil-works/pi-coding-agent";
import {
	truncateToWidth,
	visibleWidth,
	type EditorTheme,
	type TUI,
} from "@earendil-works/pi-tui";

function fitBorder(
	left: string,
	width: number,
	border: (text: string) => string,
): string {
	if (width <= 0) return "";
	if (width < 4) return border("─".repeat(width));

	const label = truncateToWidth(left, Math.max(0, width - 4), "");
	const remaining = Math.max(0, width - visibleWidth(label) - 4);
	return `${border("── ")}${label}${border(` ${"─".repeat(remaining)}`)}`;
}

function textFromContent(content: unknown): string {
	if (typeof content === "string") return content;
	if (!Array.isArray(content)) return "";
	return content
		.filter(
			(part): part is { type: "text"; text: string } =>
				Boolean(part) &&
				typeof part === "object" &&
				(part as { type?: unknown }).type === "text" &&
				typeof (part as { text?: unknown }).text === "string",
		)
		.map((part) => part.text)
		.join("\n");
}

function promptHistory(ctx: { sessionManager: { getBranch(): readonly unknown[] } }): string[] {
	return ctx.sessionManager
		.getBranch()
		.filter((entry): entry is { type: "message"; message: { role: string; content: unknown } } => {
			if (!entry || typeof entry !== "object") return false;
			const value = entry as { type?: unknown; message?: unknown };
			if (value.type !== "message" || !value.message || typeof value.message !== "object") {
				return false;
			}
			return (value.message as { role?: unknown }).role === "user";
		})
		.map((entry) => textFromContent(entry.message.content))
		.filter((prompt) => prompt.length > 0);
}

class CleanPromptEditor extends CustomEditor {
	constructor(
		tui: TUI,
		theme: EditorTheme,
		keybindings: KeybindingsManager,
		private readonly getAppTheme: () => Theme,
	) {
		// Keep pi's working indicator in this border. This is what lets the
		// whimsical extension continue to update the message without creating a
		// second row above the prompt.
		super(tui, theme, keybindings, { embedWorkingStatus: true });
	}

	protected override renderBottomBorder(width: number, hiddenLineCount: number): string {
		if (hiddenLineCount > 0) return super.renderBottomBorder(width, hiddenLineCount);
		return fitBorder(
			this.getAppTheme().fg("dim", "enter send  |  shift+enter newline"),
			width,
			(text) => this.borderColor(text),
		);
	}
}

export default function (pi: ExtensionAPI) {
	pi.on("session_start", (event, ctx) => {
		if (ctx.mode !== "tui") return;

		// The initial startup render hydrates after session_start. Session reloads
		// and session replacements hydrate before it, so seed those editors here.
		const history = event.reason === "startup" ? [] : promptHistory(ctx);
		ctx.ui.setEditorComponent((tui, theme, keybindings) =>
			(() => {
				const editor = new CleanPromptEditor(tui, theme, keybindings, () => ctx.ui.theme);
				for (const prompt of history) editor.addToHistory(prompt);
				return editor;
			})(),
		);
	});

	pi.registerCommand("diagnostics", {
		description: "Reload resources and show startup diagnostics",
		handler: async (_args, ctx) => {
			await ctx.reload();
		},
	});
}
