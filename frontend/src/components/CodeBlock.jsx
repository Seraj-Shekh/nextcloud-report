import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * CodeBlock — terminal / config style code block with copy-to-clipboard.
 * Accepts `code` (string) and optional `language` + `title` (e.g. filename / shell).
 */
export default function CodeBlock({ code, language = "bash", title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Clipboard error", err);
    }
  };

  const highlighted = highlight(code, language);

  return (
    <div className="code-block my-5" data-testid="code-block">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs text-white/50 font-mono tracking-wide">
            {title || `${language}`}
          </span>
        </div>
        <button
          onClick={handleCopy}
          data-testid="copy-code-button"
          className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white/95 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

/* Minimal, safe shell/php highlighter — purely visual, escapes HTML first. */
function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlight(code, language) {
  const escaped = escapeHtml(code);

  // Use sentinel markers so we can apply class-name HTML at the very end
  // without quote-based regex chewing on previously-inserted spans.
  const OPEN = (cls) => `§§${cls}§§`;
  const CLOSE = "§§/§§";
  const finalize = (s) =>
    s
      .replace(/§§\/§§/g, "</span>")
      .replace(/§§([a-z-]+)§§/g, '<span class="$1">');

  if (language === "php") {
    const out = escaped
      .replace(/('[^']*')/g, `${OPEN("tok-str")}$1${CLOSE}`)
      .replace(/(=&gt;)/g, `${OPEN("tok-flag")}$1${CLOSE}`)
      .replace(/(\/\/[^\n]*)/g, `${OPEN("tok-comment")}$1${CLOSE}`);
    return finalize(out);
  }

  // bash / shell
  const out = escaped
    .split("\n")
    .map((line) => {
      if (/^\s*#/.test(line)) {
        return `${OPEN("tok-comment")}${line}${CLOSE}`;
      }
      return line
        .replace(/("[^"]*"|'[^']*')/g, `${OPEN("tok-str")}$1${CLOSE}`)
        .replace(/^(\s*)([a-zA-Z_][\w-]*)/, `$1${OPEN("tok-cmd")}$2${CLOSE}`)
        .replace(/(\s)(--?[\w-]+)/g, `$1${OPEN("tok-flag")}$2${CLOSE}`);
    })
    .join("\n");
  return finalize(out);
}
