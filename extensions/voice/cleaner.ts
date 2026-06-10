/**
 * Post-processing for Whisper transcription output.
 *
 * Whisper's initial_prompt conditions style, but doesn't remove fillers.
 * This module cleans up the raw transcript for dictation use:
 *   - Strips filler words (um, uh, hmm, like, you know)
 *   - Removes repeated words (the the → the)
 *   - Cleans up trailing/leading whitespace
 *   - Capitalizes first letter, ensures trailing period
 */

// Filler words to strip. These are common in English spontaneous speech.
// We match word-boundary to avoid stripping "like" from "likely".
const FILLERS = [
  /\b(um+|uh+|uhh+|hmm+|hm+|ah+|er+|ahh+)\b[,.]?\s*/gi,
  /\b(you know|I mean|kind of|sort of|like,\s*)\b\s*/gi,
];

// Repeated words: "the the" → "the"
const REPEATED = /\b(\w+)\s+\1\b/gi;

export function cleanTranscript(raw: string): string {
  let text = raw.trim();
  if (!text) return text;

  // Strip fillers
  for (const pattern of FILLERS) {
    text = text.replace(pattern, "");
  }

  // Collapse repeated words
  text = text.replace(REPEATED, "$1");

  // Clean up double spaces from removals
  text = text.replace(/\s{2,}/g, " ").trim();

  // Capitalize first letter
  if (text.length > 0) {
    text = text[0].toUpperCase() + text.slice(1);
  }

  // Ensure it ends with punctuation
  if (text.length > 0 && !/[.!?]$/.test(text)) {
    text += ".";
  }

  return text;
}

/**
 * Build an initial_prompt for Whisper that conditions clean output.
 * This isn't instructions — it's text that Whisper continues in the style of.
 * A clean, well-punctuated sentence makes Whisper output clean text.
 */
export function buildInitialPrompt(context?: { editorText?: string }): string {
  // Base prompt: clean, well-formatted sentence that sets the style
  const base = "The following is a clear, well-spoken dictation with proper grammar and no filler words.";

  // If there's existing editor text, append the last few words as context
  // This helps Whisper continue from where the user left off
  if (context?.editorText) {
    const words = context.editorText.trim().split(/\s+/);
    const tail = words.slice(-10).join(" ");
    if (tail) {
      return `${base} ${tail}`;
    }
  }

  return base;
}
