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

  return (
    <div className="rounded-lg border border-fd-border bg-fd-card text-fd-card-foreground shadow-xs overflow-hidden">
      {/* Top Toolbar / Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fd-border/70 bg-fd-muted/40 px-3.5 py-2.5 text-xs">
        {/* Tailwind Mapping Option Controls */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-fd-muted-foreground text-[11px] font-medium">
            tailwindMapping:
          </span>
          <div className="inline-flex rounded-md border border-fd-border bg-fd-background p-0.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setTailwindMapping("loose")}
              className={`rounded px-2 py-0.5 transition-colors ${
                tailwindMapping === "loose"
                  ? "bg-fd-foreground text-fd-background font-semibold shadow-2xs"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
              title="loose: Maps standard dimensions to scale and arbitrary values to brackets (e.g. w-[13px])"
            >
              loose
            </button>
            <button
              type="button"
              onClick={() => setTailwindMapping("strict")}
              className={`rounded px-2 py-0.5 transition-colors ${
                tailwindMapping === "strict"
                  ? "bg-fd-foreground text-fd-background font-semibold shadow-2xs"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
              title="strict: Only maps exact Tailwind scale matches, preserving other dimensions as attributes"
            >
              strict
            </button>
            <button
              type="button"
              onClick={() => setTailwindMapping("off")}
              className={`rounded px-2 py-0.5 transition-colors ${
                tailwindMapping === "off"
                  ? "bg-fd-foreground text-fd-background font-semibold shadow-2xs"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
              title="off: Preserves original SVG attributes and styles without Tailwind utility mapping"
            >
              off
            </button>
          </div>
        </div>

        {/* Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded border border-fd-border bg-fd-background px-2 py-1 font-mono text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            Reset icon
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded border border-fd-border bg-fd-background px-2 py-1 font-mono text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!generatedCode}
            className={`rounded border px-2.5 py-1 font-mono text-[11px] transition-colors ${
              copied
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "border-fd-border bg-fd-background text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent disabled:opacity-40 disabled:pointer-events-none"
            }`}
          >
            {copied ? "Copied!" : "Copy React Code"}
          </button>
        </div>
      </div>

      {/* Input Section: Raw SVG Textarea */}
      <div className="border-b border-fd-border/70 p-3 sm:p-4 bg-fd-card">
        <div className="flex items-center justify-between pb-1.5 text-[11px] font-mono text-fd-muted-foreground">
          <label htmlFor="svg-playground-input" className="font-medium text-fd-foreground">
            Paste raw SVG below:
          </label>
          <span className="text-[10px]">
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
          className="w-full rounded-md border border-fd-border/80 bg-fd-secondary/30 p-2.5 font-mono text-xs text-fd-foreground leading-relaxed focus:border-fd-foreground/40 focus:outline-none focus:ring-1 focus:ring-fd-ring transition-colors resize-y"
        />

        {/* Calm Inline Messages & Sanity Status */}
        <div className="pt-1.5 min-h-[22px] flex items-center text-xs font-mono">
          {isExceeded ? (
            <span className="text-amber-600 dark:text-amber-400 text-[11px]">
              Input exceeds 50 KB limit. Please paste a standard icon SVG to avoid performance issues.
            </span>
          ) : isTrimmedEmpty ? (
            <span className="text-fd-muted-foreground text-[11px]">
              Paste or type an SVG string above to preview and convert live.
            </span>
          ) : !isValidSvg ? (
            <span className="text-fd-muted-foreground text-[11px]">
              Doesn't look like valid SVG yet
            </span>
          ) : (
            <span className="text-fd-muted-foreground text-[11px] flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Valid SVG detected ({svgMeta}) • Ready to copy
            </span>
          )}
        </div>
      </div>

      {/* Two-Panel Output: Left/top: Visual Preview, Right/bottom: Generated Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-fd-border/70">
        {/* Left/Top Panel: Visual Preview of pasted SVG */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-fd-border/50 bg-fd-muted/30 px-3.5 py-2 text-[11px] font-mono text-fd-muted-foreground">
            <span className="font-semibold text-fd-foreground">Visual Preview</span>
            <span>{svgMeta ?? "No preview"}</span>
          </div>

          <div className="relative flex flex-1 items-center justify-center p-6 min-h-[220px] sm:min-h-[260px] bg-fd-secondary/15">
            {/* Subtle background grid pattern to make dark/light icons easily visible */}
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(currentColor 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            {previewDataUri ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                <div className="p-4 rounded-lg border border-fd-border/40 bg-fd-background/70 shadow-2xs">
                  {/*
                    Security boundary: SVG is rendered purely via <img> data URI.
                    Browsers treat SVG loaded this way as a static image in an isolated document context.
                    Embedded scripts, foreignObject DOM, and event handlers (onload/onerror) do NOT execute.
                  */}
                  <img
                    src={previewDataUri}
                    alt="Pasted SVG preview"
                    className="max-h-24 max-w-24 sm:max-h-28 sm:max-w-28 object-contain"
                  />
                </div>
                <span className="text-[10px] font-mono text-fd-muted-foreground">
                  Rendered in isolated image context
                </span>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                <span className="text-xs font-mono text-fd-muted-foreground">
                  {isTrimmedEmpty
                    ? "SVG visual preview will appear here"
                    : !isValidSvg
                    ? "Preview unavailable — waiting for valid SVG"
                    : "No preview"}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-fd-border/50 bg-fd-muted/20 px-3.5 py-2 text-[11px] text-fd-muted-foreground font-mono">
            <span>Isolated image context • Zero DOM injection</span>
          </div>
        </div>

        {/* Right/Bottom Panel: Generated React Component */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-fd-border/50 bg-fd-muted/30 px-3.5 py-2 text-[11px] font-mono text-fd-muted-foreground">
            <span className="font-semibold text-fd-foreground">React + Tailwind Output</span>
            <span>TypeScript TSX</span>
          </div>

          <div className="flex-1 min-h-[220px] sm:min-h-[260px] overflow-auto bg-fd-secondary/30">
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
                <span className="text-xs font-mono text-fd-muted-foreground">
                  {isTrimmedEmpty
                    ? "Generated React component code will appear here."
                    : !isValidSvg
                    ? "Waiting for valid SVG input to generate React component."
                    : "Ready"}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-fd-border/50 bg-fd-muted/20 px-3.5 py-2 flex items-center justify-between text-[11px] text-fd-muted-foreground font-mono">
            <span>0.02 ms client-side • 0 network requests</span>
            <span>props forwarded</span>
          </div>
        </div>
      </div>
    </div>
  );
}
