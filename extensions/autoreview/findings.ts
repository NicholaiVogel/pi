/**
 * Pure, dependency-free findings parsing & union logic for autoreview.
 *
 * Kept in its own module (no pi imports) so it can be unit-tested directly with
 * bun/node and so the parsing policy is isolated from the tool/transport layer.
 */

export type Severity = "critical" | "warning" | "info" | "suggestion";

export interface Finding {
  severity: Severity;
  file: string;
  line?: number;
  description: string;
  suggested_fix?: string;
}

export const SEV_RANK: Record<Severity, number> = { critical: 4, warning: 3, info: 2, suggestion: 1 };

export function normalizeSeverity(s: any): Severity {
  const v = String(s ?? "").toLowerCase().trim();
  if (["critical", "crit", "blocker", "block", "high", "error", "bug", "must", "p0", "p1"].includes(v)) return "critical";
  if (["warning", "warn", "medium", "moderate", "p2"].includes(v)) return "warning";
  if (["info", "informational", "low", "note", "nit", "p3"].includes(v)) return "info";
  if (["suggestion", "sug", "style", "minor", "improvement", "p4"].includes(v)) return "suggestion";
  return "warning"; // unknown severity stays visible rather than being dropped
}

/** Coerce an arbitrary parsed object into a valid Finding; drop items with no description. */
export function normalizeFindings(arr: any[]): Finding[] {
  const out: Finding[] = [];
  for (const f of arr) {
    if (!f || typeof f !== "object") continue;
    const description = String(f.description ?? f.issue ?? f.problem ?? f.reason ?? f.message ?? "").trim();
    if (!description) continue;
    const file = String(f.file ?? f.path ?? f.location ?? f.where ?? "").trim();
    const sev = normalizeSeverity(f.severity ?? f.priority ?? f.level);
    const rawLine = f.line ?? f.startLine ?? f.lineNumber ?? f.lineno;
    const line = rawLine != null && rawLine !== "" ? Number(rawLine) : NaN;
    const fix = f.suggested_fix ?? f.fix ?? f.suggestion ?? f.recommendation ?? f.resolution;
    const finding: Finding = {
      severity: sev,
      file: file || "(unspecified)",
      description,
    };
    if (!Number.isNaN(line)) finding.line = line;
    if (fix != null && String(fix).trim()) finding.suggested_fix = String(fix);
    out.push(finding);
  }
  return out;
}

/** Extract the first balanced [...] or {...} span starting at the matching opener. */
export function extractFirstBalanced(s: string, open: string, close: string): string | null {
  const start = s.indexOf(open);
  if (start < 0) return null;
  let depth = 0;
  let inStr: string | null = null;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return s.slice(start, i + 1);
    }
  }
  return null;
}

/**
 * Defensive findings parser. Handles:
 *  - ```json / ```JSON / ``` (case-insensitive info string, optional trailing space)
 *  - bare JSON arrays/objects with no fence
 *  - { "findings": [...] } / { "results": [...] } wrappers
 *  - a single finding object
 *  - trailing commas before the closing bracket
 * Tries the LAST candidate first (findings usually appear at the end of output),
 * then earlier ones. Returns [] only if nothing parses.
 */
export function parseFindings(text: string): Finding[] {
  if (!text || !text.trim()) return [];

  const candidates: string[] = [];

  // 1. Fenced blocks (json/JSON/plain), allow optional trailing whitespace after info string.
  const fenceRe = /```(?:json|JSON)?[ \t]*\r?\n([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = fenceRe.exec(text)) !== null) {
    candidates.push(m[1]);
  }
  candidates.reverse(); // prefer the last fenced block

  // 2. Bare JSON spans (greedy; only used if JSON.parse succeeds).
  const bareRe = /(\[[\s\S]*\]|\{[\s\S]*\})/g;
  while ((m = bareRe.exec(text)) !== null) {
    candidates.push(m[1]);
  }

  const tryParse = (raw: string): Finding[] | null => {
    let s = raw.trim();
    if (!s) return null;
    // Strip a trailing comma before the closing bracket/brace.
    s = s.replace(/,\s*([\]\}])\s*$/, "$1");
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return normalizeFindings(parsed);
      if (parsed && typeof parsed === "object") {
        if (Array.isArray(parsed.findings)) return normalizeFindings(parsed.findings);
        if (Array.isArray(parsed.results)) return normalizeFindings(parsed.results);
        if (Array.isArray(parsed.issues)) return normalizeFindings(parsed.issues);
        return normalizeFindings([parsed]); // single finding object
      }
    } catch {
      // Fall back to extracting the first balanced array/object.
      const arr = extractFirstBalanced(s, "[", "]") ?? extractFirstBalanced(s, "{", "}");
      if (arr) {
        try {
          const p = JSON.parse(arr.replace(/,\s*([\]\}])\s*$/, "$1"));
          if (Array.isArray(p)) return normalizeFindings(p);
          if (p && Array.isArray(p.findings)) return normalizeFindings(p.findings);
        } catch {
          /* keep trying other candidates */
        }
      }
    }
    return null;
  };

  for (const c of candidates) {
    const found = tryParse(c);
    if (found && found.length > 0) return found;
  }
  return [];
}

export function findingKey(f: Finding): string {
  const desc = (f.description || "").toLowerCase().replace(/\s+/g, " ").slice(0, 120);
  return `${(f.file || "").toLowerCase()}:${f.line ?? 0}:${desc}`;
}

/** Union two finding lists; on collision keep the higher severity. */
export function unionFindings(existing: Finding[], incoming: Finding[]): Finding[] {
  const map = new Map<string, Finding>();
  for (const f of [...existing, ...incoming]) {
    const k = findingKey(f);
    const cur = map.get(k);
    if (!cur) {
      map.set(k, { ...f });
    } else if (SEV_RANK[cur.severity] < SEV_RANK[f.severity]) {
      cur.severity = f.severity;
    }
  }
  return [...map.values()].sort(
    (a, b) =>
      SEV_RANK[b.severity] - SEV_RANK[a.severity] ||
      String(a.file).localeCompare(String(b.file)) ||
      (a.line ?? 0) - (b.line ?? 0),
  );
}

/** Return any prose the reviewer wrote after its JSON block (best-effort). */
export function proseAfterJson(text: string): string {
  if (!text) return "";
  const idx = text.lastIndexOf("```");
  if (idx < 0) return "";
  const after = text.slice(idx + 3).trim();
  // Drop a trailing duplicate fence opener artifacts.
  return after.replace(/^json/i, "").trim();
}
