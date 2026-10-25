"use client";

import * as React from "react";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export function CopyableSnippet({ code, label, className }: { code: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write failures
    }
  };

  return (
    <div
      className={cn(
        "flex h-10 min-w-0 items-center gap-2.5 rounded-full border border-fd-border bg-str-surface pl-4 pr-1 font-mono text-xs text-fd-foreground",
        className,
      )}
    >
      {label && <span className="select-none text-fd-muted-foreground">{label}</span>}
      <code className="min-w-0 flex-1 truncate select-all">{code}</code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : `Copy “${code}”`}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-fd-ring"
      >
        {copied ? <Check className="size-3.5 text-str-success" /> : <Copy className="size-3.5" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
