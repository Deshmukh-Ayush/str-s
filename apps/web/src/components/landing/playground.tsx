"use client";

import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { convert, isConvertibleSvg } from "@everywhereayush/str-s";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

const DEFAULT_TABLER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
</svg>`;

const MAX_INPUT_LENGTH = 50 * 1024; // 50 KB max input length to avoid browser jank

type TailwindMapping = "loose" | "strict" | "off";

export function Playground() {
  const [rawInput, setRawInput] = useState<string>(DEFAULT_TABLER_SVG);
  const [debouncedInput, setDebouncedInput] = useState<string>(DEFAULT_TABLER_SVG);
  const [tailwindMapping, setTailwindMapping] = useState<TailwindMapping>("loose");
  const [copied, setCopied] = useState<boolean>(false);

  // Debounce input (250ms) to avoid converting on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(rawInput);
    }, 250);
    return () => clearTimeout(timer);
  }, [rawInput]);

  // Input limits & sanity pre-check
  const isExceeded = debouncedInput.length > MAX_INPUT_LENGTH;
  const isTrimmedEmpty = debouncedInput.trim().length === 0;
  const isValidSvg = !isExceeded && !isTrimmedEmpty && isConvertibleSvg(debouncedInput);

  // Extract dimensions or viewBox for display
  const svgMeta = useMemo(() => {
    if (!isValidSvg) return null;
    const widthMatch = debouncedInput.match(/width=["']([^"']+)["']/i);
    const heightMatch = debouncedInput.match(/height=["']([^"']+)["']/i);
    const viewBoxMatch = debouncedInput.match(/viewBox=["']([^"']+)["']/i);

    const dims = widthMatch && heightMatch ? `${widthMatch[1]} × ${heightMatch[1]}` : null;
    const vb = viewBoxMatch ? `viewBox="${viewBoxMatch[1]}"` : null;
    return dims || vb || "SVG Vector";
  }, [debouncedInput, isValidSvg]);

  // Client-side conversion using real published package
  const generatedCode = useMemo(() => {
    if (!isValidSvg) return "";
    try {
      return convert(debouncedInput, {
        componentName: "UsersIcon",
        tailwindMapping,
        typescript: true,
        componentStyle: "arrow",
      });
    } catch {
      return "";
    }
  }, [debouncedInput, isValidSvg, tailwindMapping]);

  // Safe base64 encoded data URI for <img> tag preview (never dangerouslySetInnerHTML)
  const previewDataUri = useMemo(() => {
    if (!isValidSvg) return null;
    try {
      const trimmed = debouncedInput.trim();
      const base64 =
        typeof window !== "undefined"
          ? window.btoa(unescape(encodeURIComponent(trimmed)))
          : Buffer.from(trimmed).toString("base64");
      return `data:image/svg+xml;base64,${base64}`;
    } catch {
      return null;
    }
  }, [debouncedInput, isValidSvg]);

  const handleCopy = useCallback(async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write failures
    }
  }, [generatedCode]);

  const handleReset = useCallback(() => {
    setRawInput(DEFAULT_TABLER_SVG);
    setDebouncedInput(DEFAULT_TABLER_SVG);
  }, []);

  const handleClear = useCallback(() => {
    setRawInput("");
    setDebouncedInput("");
  }, []);

  const activeMode = MODES.find((m) => m.value === tailwindMapping)!;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Segmented control: tailwindMapping */}
      <div className="flex flex-col items-center gap-3">
        <div role="radiogroup" aria-label="tailwindMapping" className="inline-flex rounded-full bg-str-panel p-1 text-sm">
          {MODES.map((mode) => (
            <button
              key={mode.value}
              type="button"
              role="radio"
              aria-checked={tailwindMapping === mode.value}
              onClick={() => setTailwindMapping(mode.value)}
              className={`rounded-full px-5 py-1.5 font-mono text-xs transition-all focus-visible:outline-2 focus-visible:outline-fd-ring ${
                tailwindMapping === mode.value
                  ? "bg-str-surface text-fd-foreground shadow-sm"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              {mode.value}
            </button>
          ))}
        </div>
        <p className="max-w-md text-center text-xs text-fd-muted-foreground" aria-live="polite">
          {activeMode.description}
        </p>
      </div>

      {/* OS-style window */}
      <div className="w-full overflow-hidden rounded-2xl border border-fd-border bg-str-surface text-fd-card-foreground shadow-[0_24px_60px_-30px_rgb(30_29_27/0.35)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fd-border px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[11px] text-fd-muted-foreground">playground.tsx</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={handleReset} className={TOOLBAR_BUTTON}>
              Reset
            </button>
            <button type="button" onClick={handleClear} className={TOOLBAR_BUTTON}>
              Clear
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!generatedCode}
              className="inline-flex h-8 items-center rounded-full bg-fd-primary px-4 text-xs font-medium text-fd-primary-foreground transition-opacity hover:opacity-85 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring"
            >
              {copied ? "Copied" : "Copy React code"}
            </button>
          </div>
        </div>

        {/* Input: raw SVG */}
        <div className="border-b border-fd-border p-4 sm:p-5">
          <div className="flex items-center justify-between pb-2 text-xs text-fd-muted-foreground">
            <label htmlFor="svg-playground-input" className="font-medium text-fd-foreground">
              Paste raw SVG
            </label>
            <span className="font-mono text-[11px]">
              {debouncedInput.length > 0 ? `${(debouncedInput.length / 1024).toFixed(1)} KB / 50 KB` : "50 KB max"}
            </span>
          </div>

          <textarea
            id="svg-playground-input"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="Paste raw SVG here (e.g. <svg viewBox='0 0 24 24'>...)"
            rows={5}
            spellCheck={false}
            className="w-full resize-y rounded-xl border border-fd-border bg-fd-background p-3 font-mono text-xs leading-relaxed text-fd-foreground transition-colors focus:border-fd-ring focus:outline-none focus:ring-2 focus:ring-fd-ring/40"
          />

          <div className="flex min-h-[22px] items-center pt-2 text-[11px]" aria-live="polite">
            {isExceeded ? (
              <span className="text-amber-700 dark:text-amber-400">
                Input exceeds 50 KB limit. Please paste a standard icon SVG to avoid performance issues.
              </span>
            ) : isTrimmedEmpty ? (
              <span className="text-fd-muted-foreground">Paste or type an SVG string above to preview and convert live.</span>
            ) : !isValidSvg ? (
              <span className="text-fd-muted-foreground">Doesn&apos;t look like valid SVG yet</span>
            ) : (
              <span className="flex items-center gap-1.5 text-fd-muted-foreground">
                <span className="size-1.5 rounded-full bg-str-success" />
                Valid SVG detected ({svgMeta}) · Ready to copy
              </span>
            )}
          </div>
        </div>

        {/* Output: preview + generated code */}
        <div className="grid grid-cols-1 divide-y divide-fd-border md:grid-cols-[2fr_3fr] md:divide-x md:divide-y-0">
          <div className="flex flex-col">
            <div className={PANEL_HEADER}>
              <span className="font-medium text-fd-foreground">Preview</span>
              <span className="font-mono">{svgMeta ?? "No preview"}</span>
            </div>

            <div className="relative flex min-h-[220px] flex-1 items-center justify-center bg-fd-background/50 p-6 sm:min-h-[260px]">
              {/* Dot grid so both dark and light icons stay visible */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "16px 16px" }}
              />

              {previewDataUri ? (
                <div className="relative z-10 rounded-2xl border border-fd-border bg-str-surface p-5 shadow-sm">
                  {/*
                    Security boundary: SVG is rendered purely via <img> data URI.
                    Browsers treat SVG loaded this way as a static image in an isolated document context.
                    Embedded scripts, foreignObject DOM, and event handlers (onload/onerror) do NOT execute.
                  */}
                  <img
                    src={previewDataUri}
                    alt="Pasted SVG preview"
                    className="max-h-24 max-w-24 object-contain sm:max-h-28 sm:max-w-28"
                  />
                </div>
              ) : (
                <span className="relative z-10 text-center text-xs text-fd-muted-foreground">
                  {isTrimmedEmpty
                    ? "SVG visual preview will appear here"
                    : !isValidSvg
                    ? "Preview unavailable — waiting for valid SVG"
                    : "No preview"}
                </span>
              )}
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <div className={PANEL_HEADER}>
              <span className="font-medium text-fd-foreground">React + Tailwind</span>
              <span className="font-mono">TSX</span>
            </div>

            <div className="min-h-[220px] flex-1 overflow-auto sm:min-h-[260px]">
              {isValidSvg && generatedCode ? (
                <DynamicCodeBlock
                  lang="tsx"
                  code={generatedCode}
                  codeblock={{
                    allowCopy: false, // Handled via our dedicated copy button above
                    keepBackground: false,
                    className: "my-0 border-0 rounded-none bg-transparent shadow-none text-xs",
                    viewportProps: {
                      className: "p-4 max-h-[360px]",
                    },
                  }}
                />
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center p-6 text-center">
                  <span className="text-xs text-fd-muted-foreground">
                    {isTrimmedEmpty
                      ? "Generated React component code will appear here."
                      : !isValidSvg
                      ? "Waiting for valid SVG input to generate React component."
                      : "Ready"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MODES: { value: TailwindMapping; description: string }[] = [
  { value: "loose", description: "Maps standard dimensions to the scale and arbitrary values to brackets, e.g. w-[13px]." },
  { value: "strict", description: "Only maps exact Tailwind scale matches and keeps other dimensions as attributes." },
  { value: "off", description: "Keeps the original SVG attributes and styles without Tailwind mapping." },
];

const TOOLBAR_BUTTON =
  "inline-flex h-8 items-center rounded-full px-3 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-fd-ring";

const PANEL_HEADER =
  "flex items-center justify-between border-b border-fd-border px-4 py-2.5 text-[11px] text-fd-muted-foreground";

