/**
 * Native web tools for pi — web_search and web_fetch
 *
 * web_search: SearXNG meta-search (25+ engines, JSON API)
 * web_fetch:  Lightpanda fast headless fetch (markdown/html)
 *
 * No skill invocation needed. These are always-on tools.
 */

import { execSync, spawn } from "node:child_process";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { StringEnum } from "@earendil-works/pi-ai";
import { Text } from "@earendil-works/pi-tui";
import { Type } from "typebox";

// -- Constants --

const SEARXNG_URL = "http://localhost:8888";
const LIGHTPANDA_BIN = "lightpanda";
const MAX_FETCH_BYTES = 2 * 1024 * 1024; // 2MB cap on fetched content
const DEFAULT_FETCH_CHARS = 50_000; // default character limit

// -- Helpers --

function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + `\n\n... (truncated at ${maxChars} chars, ${text.length} total)`;
}

function shortenUrl(url: string, maxLen = 80): string {
  if (url.length <= maxLen) return url;
  return url.slice(0, maxLen - 3) + "...";
}

// ============================================================
// web_search
// ============================================================

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  engine?: string;
  publishedDate?: string;
}

interface SearchDetails {
  query: string;
  category: string;
  resultCount: number;
  results: SearchResult[];
}

function runSearch(
  query: string,
  category?: string,
  page?: number,
): SearchDetails {
  const params = new URLSearchParams({
    q: query,
    format: "json",
  });
  if (category) params.set("categories", category);
  if (page && page > 1) params.set("pageno", String(page));

  const url = `${SEARXNG_URL}/search?${params}`;

  let raw: string;
  try {
    raw = execSync(`curl -s "${url}"`, {
      timeout: 30_000,
      maxBuffer: 5 * 1024 * 1024,
      encoding: "utf-8",
    });
  } catch (err: any) {
    throw new Error(
      `SearXNG search failed (is it running? docker start searxng): ${err.message}`,
    );
  }

  let data: any;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("SearXNG returned invalid JSON");
  }

  const results: SearchResult[] = (data.results || []).map(
    (r: any, i: number) => ({
      title: r.title || "(no title)",
      url: r.url || "",
      snippet: (r.content || "").slice(0, 300),
      engine: r.engine,
      publishedDate: r.publishedDate || undefined,
    }),
  );

  return {
    query,
    category: category || "general",
    resultCount: results.length,
    results,
  };
}

// ============================================================
// web_fetch
// ============================================================

interface FetchDetails {
  url: string;
  format: string;
  charCount: number;
  truncated: boolean;
}

function runFetch(
  url: string,
  format: "markdown" | "html" = "markdown",
  stripMode?: string,
  maxChars: number = DEFAULT_FETCH_CHARS,
): { content: string; details: FetchDetails } {
  const args = ["fetch", "--dump", format];
  if (stripMode) args.push("--strip_mode", stripMode);
  args.push(url);

  let raw: string;
  try {
    raw = execSync(`${LIGHTPANDA_BIN} ${args.join(" ")}`, {
      timeout: 60_000,
      maxBuffer: MAX_FETCH_BYTES,
      encoding: "utf-8",
    });
  } catch (err: any) {
    throw new Error(`Lightpanda fetch failed for ${url}: ${err.message}`);
  }

  const truncated = raw.length > maxChars;
  const content = truncate(raw.trim(), maxChars);

  return {
    content,
    details: {
      url,
      format,
      charCount: raw.length,
      truncated,
    },
  };
}

// ============================================================
// Extension
// ============================================================

export default function (pi: ExtensionAPI) {
  // -- web_search tool --

  pi.registerTool({
    name: "web_search",
    label: "Web Search",
    description:
      "Search the web using SearXNG (aggregates Google, Bing, DuckDuckGo, Brave, and 20+ engines). Returns titles, URLs, and snippets. Use this as your default for finding information, looking things up, researching topics, or answering questions that benefit from current web data.",
    promptSnippet: "Search the web for current information",
    promptGuidelines: [
      "Use web_search when you need current information, facts, documentation, or any question that benefits from live web data.",
      "web_search returns snippets — often enough for simple factual questions without fetching the full page.",
      "For deeper reading, follow web_search with web_fetch on the most relevant URLs.",
    ],
    parameters: Type.Object({
      query: Type.String({ description: "Search query" }),
      category: Type.Optional(
        StringEnum(
          ["general", "news", "images", "files", "science", "it", "music", "videos"] as const,
          { description: "Search category (default: general)" },
        ),
      ),
      page: Type.Optional(
        Type.Number({ description: "Page number for pagination (default: 1)" }),
      ),
    }),

    async execute(_id, params, _signal, _onUpdate, _ctx) {
      try {
        const details = runSearch(params.query, params.category, params.page);

        if (details.results.length === 0) {
          return {
            content: [{ type: "text", text: `No results for "${params.query}".` }],
            details,
          };
        }

        // Format results as readable text for the LLM
        const lines = details.results.slice(0, 10).map(
          (r, i) =>
            `${i + 1}. **${r.title}**\n   ${r.url}\n   ${r.snippet}${r.publishedDate ? `\n   Published: ${r.publishedDate}` : ""}`,
        );

        const text = [
          `Search results for "${params.query}" (${details.resultCount} results):`,
          "",
          ...lines,
        ].join("\n");

        return {
          content: [{ type: "text", text }],
          details,
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Search failed: ${err.message}` }],
          details: { query: params.query, category: params.category || "general", resultCount: 0, results: [] },
          isError: true,
        };
      }
    },

    renderCall(args, theme) {
      const preview = args.query.length > 60 ? args.query.slice(0, 60) + "..." : args.query;
      let text = theme.fg("toolTitle", theme.bold("web_search ")) + theme.fg("text", preview);
      if (args.category && args.category !== "general") {
        text += theme.fg("muted", ` [${args.category}]`);
      }
      return new Text(text, 0, 0);
    },

    renderResult(result, { expanded }, theme) {
      const details = result.details as SearchDetails | undefined;
      if (!details) {
        const text = result.content[0];
        return new Text(text?.type === "text" ? text.text : "(no results)", 0, 0);
      }

      const icon = result.isError
        ? theme.fg("error", "✗")
        : theme.fg("success", "✓");

      let text = `${icon} ${theme.fg("toolTitle", theme.bold("search"))}`;
      text += theme.fg("muted", ` "${details.query}" → ${details.resultCount} results`);

      const count = expanded ? details.results.length : Math.min(5, details.results.length);
      for (const r of details.results.slice(0, count)) {
        text += `\n  ${theme.fg("accent", r.title)}`;
        text += `\n  ${theme.fg("dim", shortenUrl(r.url, 70))}`;
        if (r.snippet) {
          const snip = expanded ? r.snippet : r.snippet.slice(0, 100);
          text += `\n  ${theme.fg("muted", snip)}`;
        }
      }

      if (!expanded && details.results.length > 5) {
        text += `\n  ${theme.fg("muted", `... +${details.results.length - 5} more (Ctrl+O to expand)`)}`;
      }

      return new Text(text, 0, 0);
    },
  });

  // -- web_fetch tool --

  pi.registerTool({
    name: "web_fetch",
    label: "Web Fetch",
    description:
      "Fetch a web page and extract its content as clean markdown (or HTML). Uses Lightpanda, a fast headless browser built in Zig. Use this to read articles, documentation, blog posts, or any URL. Prefer this over web_search when you already have the URL. For JS-heavy pages that return empty content, note it in the result and the agent may need to try an alternative.",
    promptSnippet: "Fetch and read a web page by URL",
    promptGuidelines: [
      "Use web_fetch when you have a URL and need the full page content.",
      "web_fetch returns clean markdown by default — usually enough for reading and summarizing.",
      "If web_fetch returns empty or garbage content, the page may need full browser rendering — note this in your response.",
      "Do not use web_fetch for URLs ending in .md — those are already markdown.",
    ],
    parameters: Type.Object({
      url: Type.String({ description: "URL to fetch" }),
      format: Type.Optional(
        StringEnum(["markdown", "html"] as const, {
          description: "Output format (default: markdown)",
        }),
      ),
      strip_mode: Type.Optional(
        Type.String({
          description: 'Comma-separated tags to strip (e.g. "js,css"). Default: "js,css"',
        }),
      ),
      max_chars: Type.Optional(
        Type.Number({
          description: `Maximum characters to return (default: ${DEFAULT_FETCH_CHARS}). Set higher for long articles.`,
        }),
      ),
    }),

    async execute(_id, params, _signal, _onUpdate, _ctx) {
      const format = params.format || "markdown";
      const stripMode = params.strip_mode || "js,css";
      const maxChars = params.max_chars || DEFAULT_FETCH_CHARS;

      try {
        const { content, details } = runFetch(params.url, format, stripMode, maxChars);

        if (!content.trim()) {
          return {
            content: [{
              type: "text",
              text: `Page returned empty content. The page may require JavaScript rendering that Lightpanda cannot handle. URL: ${params.url}`,
            }],
            details,
          };
        }

        return {
          content: [{ type: "text", text: content }],
          details,
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Fetch failed: ${err.message}` }],
          details: {
            url: params.url,
            format: params.format || "markdown",
            charCount: 0,
            truncated: false,
          },
          isError: true,
        };
      }
    },

    renderCall(args, theme) {
      const url = shortenUrl(args.url, 60);
      return new Text(
        theme.fg("toolTitle", theme.bold("web_fetch ")) + theme.fg("accent", url),
        0, 0,
      );
    },

    renderResult(result, _options, theme) {
      const details = result.details as FetchDetails | undefined;
      const icon = result.isError
        ? theme.fg("error", "✗")
        : theme.fg("success", "✓");

      let text = `${icon} ${theme.fg("toolTitle", theme.bold("fetch"))}`;

      if (details) {
        text += theme.fg("muted", ` ${details.charCount} chars`);
        if (details.truncated) {
          text += theme.fg("warning", " (truncated)");
        }
      }

      // Show first few lines of content
      const content = result.content[0];
      if (content?.type === "text" && content.text) {
        const preview = content.text.split("\n").slice(0, 3).join("\n").slice(0, 150);
        text += `\n${theme.fg("dim", preview)}`;
      }

      return new Text(text, 0, 0);
    },
  });
}
