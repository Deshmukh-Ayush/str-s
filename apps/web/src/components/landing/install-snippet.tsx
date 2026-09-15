"use client";

import * as React from "react";
import { useState } from "react";

export function CopyableSnippet({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-fd-border bg-fd-muted/30 px-3 py-2 font-mono text-xs text-fd-foreground">
      {label && <span className="text-fd-muted-foreground select-none">{label}</span>}
      <code className="truncate select-all">{code}</code>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded border border-fd-border bg-fd-background px-2 py-0.5 text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
