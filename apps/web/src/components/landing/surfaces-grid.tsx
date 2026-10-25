import * as React from "react";
import { ArrowUp, Search } from "lucide-react";
import { CopyableSnippet } from "./install-snippet";
import { CursorIcon, ModelContextProtocolIcon, RaycastIcon, VisualStudioCodeIcon } from "./brand-icons";
import { StrLogo } from "@/components/str-logo";

function SurfaceCard({
  visual,
  title,
  meta,
  children,
}: {
  visual: React.ReactNode;
  title: React.ReactNode;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <article className="str-reveal flex flex-col overflow-hidden rounded-[1.75rem] bg-str-panel">
      <div className="relative flex h-56 items-center justify-center overflow-hidden px-6 sm:h-64" aria-hidden="true">
        {visual}
      </div>
      <div className="flex flex-col gap-2 p-6 pt-2 sm:p-8 sm:pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-base font-semibold text-fd-foreground">{title}</h3>
          <span className="text-xs text-fd-muted-foreground">{meta}</span>
        </div>
        <div className="text-sm leading-relaxed text-fd-muted-foreground">{children}</div>
      </div>
    </article>
  );
}

export function SurfacesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SurfaceCard
        title={
          <>
            <VisualStudioCodeIcon className="size-4" /> VS Code &amp; <CursorIcon className="size-4 dark:invert" /> Cursor
          </>
        }
        meta="OpenVSX + Marketplace"
        visual={
          // Dark pill toolbar, cropped at the left edge
          <div className="absolute left-0 flex items-center gap-1.5 rounded-r-full bg-str-ink py-1.5 pl-6 pr-1.5 text-sm text-str-ink-foreground shadow-xl">
            <span className="px-3 font-mono text-xs text-str-ink-muted">Ctrl+.</span>
            <span className="rounded-full bg-white/10 px-4 py-2">Paste as SVG</span>
            <span className="rounded-full bg-white px-4 py-2 font-medium text-str-ink">Paste as React</span>
          </div>
        }
      >
        Intercepts SVG pastes in .tsx and .jsx files and converts them in a single undo step. Use the Paste As widget to keep raw SVG.
        <code className="mt-3 block font-mono text-xs">ext install everywhereayush.str-vscode</code>
      </SurfaceCard>

      <SurfaceCard
        title={
          <>
            <RaycastIcon className="size-4" /> Raycast
          </>
        }
        meta="macOS · Coming soon"
        visual={
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-fd-border bg-str-surface shadow-lg">
            <div className="flex items-center gap-2 border-b border-fd-border px-4 py-3 text-sm text-fd-muted-foreground">
              <Search className="size-4" />
              <span>svg</span>
            </div>
            <div className="flex flex-col gap-1 p-2 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-fd-muted px-3 py-2 text-fd-foreground">
                <span>Convert SVG from Clipboard</span>
                <span className="text-xs text-fd-muted-foreground">↵</span>
              </div>
              <div className="flex items-center justify-between rounded-lg px-3 py-2 text-fd-muted-foreground">
                <span>Convert Selected SVG</span>
              </div>
            </div>
          </div>
        }
      >
        Converts SVG from the clipboard or the frontmost selection and copies the component back. Testing is waiting on Mac hardware access.
      </SurfaceCard>

      <SurfaceCard
        title={
          <>
            <ModelContextProtocolIcon className="size-4 dark:invert" /> MCP Server
          </>
        }
        meta="AI agents"
        visual={
          <div className="w-full max-w-sm rounded-2xl bg-str-surface p-4 shadow-lg">
            <div className="flex items-center gap-2 text-xs text-fd-muted-foreground">
              <span className="size-1.5 rounded-full bg-str-success" />
              <span className="font-mono">convert_svg_to_react</span>
              <span className="ml-auto">0.02 ms</span>
            </div>
            <p className="mt-3 text-sm text-fd-foreground">Turn this logo SVG into a typed component.</p>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-fd-muted py-1.5 pl-3 pr-1.5 text-sm text-fd-muted-foreground">
              <span>Ask your agent…</span>
              <span className="flex size-7 items-center justify-center rounded-full bg-str-ink text-str-ink-foreground">
                <ArrowUp className="size-3.5" />
              </span>
            </div>
          </div>
        }
      >
        Exposes <code className="font-mono text-xs">convert_svg_to_react</code> as a native tool for Claude Code, Cursor Agent and Windsurf.
        <code className="mt-3 block font-mono text-xs">npx -y str-s-mcp</code>
      </SurfaceCard>

      <SurfaceCard
        title={
          <>
            <StrLogo size={16} className="size-4 rounded-xs" /> Core Library
          </>
        }
        meta="str-s on npm"
        visual={
          <pre className="w-full max-w-sm overflow-hidden rounded-2xl bg-str-ink p-5 font-mono text-xs leading-relaxed text-str-ink-foreground shadow-lg">
            <code>
              <span className="text-str-ink-muted">import</span> {"{ convert }"} <span className="text-str-ink-muted">from</span>{" "}
              <span className="text-[#f0a37e]">&quot;@everywhereayush/str-s&quot;</span>;{"\n\n"}
              <span className="text-str-ink-muted">const</span> tsx = convert(svg, {"{"}{"\n"}
              {"  "}componentName: <span className="text-[#f0a37e]">&quot;LogoIcon&quot;</span>,{"\n"}
              {"  "}typescript: <span className="text-[#f0a37e]">true</span>,{"\n"}
              {"}"});
            </code>
          </pre>
        }
      >
        Dual CJS/ESM exports with zero runtime dependencies. Synchronous, sub-millisecond conversion for Vite, Next.js and build scripts.
        <CopyableSnippet code="pnpm add @everywhereayush/str-s" className="mt-3" />
      </SurfaceCard>
    </div>
  );
}
