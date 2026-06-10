# Pi Extensions

This is my repo of [pi](https://pi.dev/) extensions, which i use for (you guessed it), pi. 

if you foolishly wish to copy these extensions for yourself, run 

```bash 
git clone https://github.com/NicholaiVogel/pi.git ~/.pi/agent 
```

The files in here are of course the ones I've made myself, or rather, my agent made them, per my verbal harassment and belittling:

- **loop** - `/loop` adds a claude code style loop command, for when you need loops, because you think you're a forward deployed loop engineer, and you have no friends or loved ones.
- **autoreview** - `/review` spawns an isolated child pi reviewer that inherits the active model, auto-detects what to review (local/branch/commit), and returns structured findings with severity, file, line, and suggested fixes.
- **web** - adds web search thru searxng and lightpanda

And then some I yoinked from [davis7dotsh/my-pi-setup](https://github.com/davis7dotsh/my-pi-setup) because why write when you can steal:

- **git-status-widget** - shows current git branch and unstaged file count in the status bar, auto-updates every 2s
- **tps-tracker** - live tokens/sec counter during model generation, reports final TPS stats when the agent finishes
- **diff** - `/diff` tracks files changed by the last agent run and lets you open them in your editor
- **yeet** - `/yeet` adds, commits, and pushes in one shot. Ship it.
- **copy-all** - `/copy-all` copies the full conversation thread to clipboard

And some from [dmmulroy/.dotfiles](https://github.com/dmmulroy/.dotfiles):

- **whimsical** - replaces the thinking spinner with random silly messages like "Negotiating with entropy..." and "Bribing the byte fairies..."
- **btw** - `/btw` opens a floating side-chat overlay with its own agent session (read/bash/edit/write tools), multi-turn conversations, and summarize-and-inject-back into the main thread
- **pi-skill-toggle** - `/toggle-skills` discover, enable, and disable skills with an interactive UI

### Themes

32 themes in `~/.pi/agent/themes/` — select with `/settings`:

Catppuccin (frappe, latte, macchiato, mocha) · Nord · Nord Deep · Dracula · Tokyo Dark · Solarized Osaka · Everforest · Everforest Deep · Gruvbox Light · OneDark Pro · OneDark Darker · OneDark Obsidian · Monokai Pro · Amber · Vesper · Miasma · Neapple · GitHub Dark Default · ANSI Dark · ANSI Light · E-Ink · E-Ink Dark · Green Screen 80s · Orange Tabby Cute · Noctis Lux

Sources: [sting8k/pi-themes](https://github.com/sting8k/pi-themes), [otahontas/pi-coding-agent-catppuccin](https://github.com/otahontas/pi-coding-agent-catppuccin), [leblancfg/pi-ansi-themes](https://github.com/leblancfg/pi-ansi-themes), [bombman/pi-agent-themes](https://github.com/bombman/pi-agent-themes), [davis7dotsh/my-pi-setup](https://github.com/davis7dotsh/my-pi-setup)

However, I am also using extensions that I installed from the third party extensions repository available on [pi.dev](https://pi.dev/packages) so do with that which you will. Here is a list: 

- pi-ask-user - `pi install npm:pi-ask-user` adds an interactive `ask_user` tool for collecting user decisions during an agent run.
- pi-bar - `pi install npm:pi-bar` pi-bar keeps your model, thinking level, context pressure, a live progress update, and any extension statuses visible in pi's footer.
- pi-codex-goal - `pi install npm:pi-codex-goal` Codex-style goal tracking for pi.
- pi-subagents - `pi install npm:pi-subagents` `lets Pi delegate work to focused child agents. Use it for code review, scouting, implementation, parallel audits, saved workflows, background jobs, and anything else that benefits from a second or third set of model eyes.

