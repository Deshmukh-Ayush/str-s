"use client";

import * as React from "react";
import { useState } from "react";

const TABLER_SVG_INPUT = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
</svg>`;

const GENERATED_REACT_OUTPUT = `import * as React from "react";

export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="icon icon-tabler icons-tabler-outline icon-tabler-users w-6 h-6 fill-none stroke-current stroke-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path className="fill-none stroke-none" d="M0 0h24v24H0z" />
    <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
  </svg>
);`;

export function LiveDemo() {
  const [activeTab, setActiveTab] = useState<"output" | "input">("output");
  const [copied, setCopied] = useState(false);

  const activeContent = activeTab === "output" ? GENERATED_REACT_OUTPUT : TABLER_SVG_INPUT;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-fd-border bg-fd-card text-fd-card-foreground shadow-xs overflow-hidden">
      <div className="flex items-center justify-between border-b border-fd-border/70 bg-fd-muted/40 px-3 py-2 text-xs">
        <div className="flex items-center gap-1 font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("output")}
            className={`rounded px-2.5 py-1 transition-colors ${
              activeTab === "output"
                ? "bg-fd-background font-semibold text-fd-foreground shadow-2xs"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            Output (React + Tailwind)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("input")}
            className={`rounded px-2.5 py-1 transition-colors ${
              activeTab === "input"
                ? "bg-fd-background font-semibold text-fd-foreground shadow-2xs"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            Input (Raw SVG)
          </button>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-fd-border bg-fd-background px-2 py-0.5 font-mono text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="p-4 bg-fd-secondary/30 overflow-x-auto">
        <pre className="font-mono text-xs leading-relaxed text-fd-foreground/90">
          <code>{activeContent}</code>
        </pre>
      </div>

      <div className="border-t border-fd-border/50 bg-fd-muted/20 px-3 py-2 flex items-center justify-between text-[11px] text-fd-muted-foreground font-mono">
        <span>Transformed in 0.024 ms (instant)</span>
        <span>w-6 h-6 • stroke-current • stroke-2</span>
      </div>
    </div>
  );
}
