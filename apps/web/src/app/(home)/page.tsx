import Link from "next/link";
import { Container } from "@/components/landing/container";
import { LiveDemo } from "@/components/landing/live-demo";
import { BenchmarksTable } from "@/components/landing/benchmarks-table";
import { CopyableSnippet } from "@/components/landing/install-snippet";
import type { SVGProps } from "react";


export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 py-12 sm:py-20">
      {/* 1. Hero Section */}
      <section className="flex flex-col gap-6">
        <Container className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-xs font-mono text-fd-muted-foreground">
            <span>npm package:</span>
            <code className="rounded border border-fd-border/70 bg-fd-muted/50 px-1.5 py-0.5 text-fd-foreground font-semibold">
              str-s
            </code>
            <span>•</span>
            <span>v0.1.0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fd-foreground leading-tight">
            3kb - SVG to React and Tailwind.
          </h1>

          <p className="text-base text-fd-muted-foreground leading-relaxed">
            STR is the smallest and fastest SVG to React + Tailwind converter, purpose-built for icons and simple graphics.
            Converts in 0.024 milliseconds with zero runtime dependencies and a 3.1 kB gzipped bundle.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-fd-foreground">
            <span className="rounded border border-fd-border bg-fd-muted/30 px-2 py-1">
              9,600+ ops/sec
            </span>
            <span className="rounded border border-fd-border bg-fd-muted/30 px-2 py-1">
              ~88x faster than SVGR
            </span>
            <span className="rounded border border-fd-border bg-fd-muted/30 px-2 py-1">
              0 dependencies
            </span>
            <span className="rounded border border-fd-border bg-fd-muted/30 px-2 py-1">
              3.1 kB gzip
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
            <Link
              href="/docs"
              className="inline-flex h-9 items-center justify-center rounded-md bg-fd-foreground px-4 text-xs font-medium text-fd-background hover:opacity-90 transition-opacity"
            >
              Read documentation
            </Link>
            <div className="grow">
              <CopyableSnippet code="pnpm add str-s" label="$" />
            </div>
          </div>

          <p className="pt-2 text-xs text-fd-muted-foreground">
            Created by{" "}
            <a
              href="https://x.com/everywhereayush"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-fd-foreground underline hover:text-fd-primary transition-colors"
            >
              @everywhereayush
            </a>
          </p>
        </Container>
      </section>

      {/* 2. Live-ish Demo */}
      <section className="flex flex-col gap-4">
        <Container className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold tracking-tight text-fd-foreground">
            See the transformation
          </h2>
          <p className="text-sm text-fd-muted-foreground">
            Paste raw icon SVGs from Figma, Lucide, Feather, or Tabler. Receive clean React components with auto-mapped Tailwind utility classes and forwarded props.
          </p>
          <div className="pt-3">
            <LiveDemo />
          </div>
        </Container>
      </section>

      {/* 3. Benchmark Comparison */}
      <section id="benchmarks" className="flex flex-col gap-4">
        <Container className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold tracking-tight text-fd-foreground">
            Verified performance benchmarks
          </h2>
          <p className="text-sm text-fd-muted-foreground">
            Benchmarked against SVGR, svg-to-jsx, and svg-to-react-cli across identical real-world icon fixtures using tinybench on Node v24. Warmup iterations excluded.
          </p>
          <div className="pt-3">
            <BenchmarksTable />
          </div>
        </Container>
      </section>

      {/* 4. Four Surfaces */}
      <section className="flex flex-col gap-4">
        <Container className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-fd-foreground">
              Four surfaces, one shared core
            </h2>
            <p className="text-sm text-fd-muted-foreground">
              Every wrapper is a thin layer importing the same zero-dependency <code className="font-mono text-xs">str-s</code> package. Conversion logic is never duplicated.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="rounded-lg border border-fd-border bg-fd-card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-fd-foreground flex items-center"><VisualStudioCodeIcon className="size-4 mr-1" /> VS Code & <CursorIcon className="size-4 mx-1 dark:invert" /> Cursor Extension</span>
                <span className="font-mono text-[11px] text-fd-muted-foreground">OpenVSX + Marketplace</span>
              </div>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                Intercepts SVG paste in .tsx and .jsx files with automatic conversion. Supports single undo step (Ctrl+Z restores raw SVG) and commands.
              </p>
              <div className="pt-1">
                <code className="text-[11px] font-mono text-fd-muted-foreground">ext install str-tools.str-vscode</code>
              </div>
            </div>

            <div className="rounded-lg border border-fd-border bg-fd-card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-fd-foreground flex items-center"><RaycastIcon className="size-4 mr-1" /> Raycast Extension</span>
                <span className="font-mono text-[11px] text-fd-muted-foreground">macOS global command</span>
              </div>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                Converts SVG from clipboard or frontmost window selection back into the clipboard with toast confirmation and native preferences.
              </p>
              <div className="pt-1">
                <code className="text-[11px] font-mono text-fd-muted-foreground">Raycast Store: Convert SVG from Clipboard</code>
              </div>
            </div>

            <div className="rounded-lg border border-fd-border bg-fd-card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-fd-foreground flex items-center"><ModelContextProtocolIcon className="mr-1 size-4 dark:invert" />Model Context Protocol (MCP) Server</span>
                <span className="font-mono text-[11px] text-fd-muted-foreground">AI agents</span>
              </div>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                Exposes <code className="font-mono">convert_svg_to_react</code> as a native MCP tool for Claude Code, Cursor Agent, and Windsurf.
              </p>
              <div className="pt-1">
                <code className="text-[11px] font-mono text-fd-muted-foreground">npx -y str-s-mcp</code>
              </div>
            </div>

            <div className="rounded-lg border border-fd-border bg-fd-card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-fd-foreground">Core Library</span>
                <span className="font-mono text-[11px] text-fd-muted-foreground">str-s (npm)</span>
              </div>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                Dual CJS/ESM exports with zero runtime dependencies. Sub-millisecond synchronous conversion for Vite, Next.js, and scripts.
              </p>
              <div className="pt-1">
                <CopyableSnippet code="pnpm add str-s" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Install / Quickstart */}
      <section className="flex flex-col gap-4">
        <Container className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-fd-foreground">
              Quickstart
            </h2>
            <p className="text-sm text-fd-muted-foreground">
              Get started using STR in your code or add the MCP server configuration to your AI agent.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-fd-foreground">Install npm package:</span>
            <CopyableSnippet code="pnpm add str-s" />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <span className="text-xs font-medium text-fd-foreground">MCP Server Configuration (Claude Desktop / Cursor):</span>
            <div className="rounded-md border border-fd-border bg-fd-card p-3 font-mono text-xs overflow-x-auto text-fd-foreground">
              <pre>
{`{
  "mcpServers": {
    "str": {
      "command": "npx",
      "args": ["-y", "str-s-mcp"]
    }
  }
}`}
              </pre>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


export function CursorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="Ebene_1" version="1.1" viewBox="0 0 466.73 532.09" {...props}>
      <defs>
        <style>{`.st0 {
          fill: #26251e;
        }`}</style>
      </defs>
      <path className="st0" d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z" />
    </svg>
  );
}

export function VisualStudioCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 254" {...props}>
      <defs>
        <linearGradient id="SVG6Q5wMbNQ" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <path id="SVGWhZ12djk" d="M180.828 252.605a15.87 15.87 0 0 0 12.65-.486l52.501-25.262a15.94 15.94 0 0 0 9.025-14.364V41.197a15.94 15.94 0 0 0-9.025-14.363l-52.5-25.263a15.88 15.88 0 0 0-18.115 3.084L74.857 96.35l-43.78-33.232a10.614 10.614 0 0 0-13.56.603L3.476 76.494c-4.63 4.211-4.635 11.495-.012 15.713l37.967 34.638l-37.967 34.637c-4.623 4.219-4.618 11.502.012 15.714l14.041 12.772a10.614 10.614 0 0 0 13.56.604l43.78-33.233l100.507 91.695a15.85 15.85 0 0 0 5.464 3.571m10.464-183.649l-76.262 57.889l76.262 57.888z" />
      </defs>
      <mask id="SVGSAQ58H2f" fill="#fff">
        <use href="#SVGWhZ12djk" />
      </mask>
      <path fill="#0065a9" d="M246.135 26.873L193.593 1.575a15.885 15.885 0 0 0-18.123 3.08L3.466 161.482c-4.626 4.219-4.62 11.502.012 15.714l14.05 12.772a10.625 10.625 0 0 0 13.569.604L238.229 33.436c6.949-5.271 16.93-.315 16.93 8.407v-.61a15.94 15.94 0 0 0-9.024-14.36" mask="url(#SVGSAQ58H2f)" />
      <path fill="#007acc" d="m246.135 226.816l-52.542 25.298a15.89 15.89 0 0 1-18.123-3.08L3.466 92.207c-4.626-4.218-4.62-11.502.012-15.713l14.05-12.773a10.625 10.625 0 0 1 13.569-.603l207.132 157.135c6.949 5.271 16.93.315 16.93-8.408v.611a15.94 15.94 0 0 1-9.024 14.36" mask="url(#SVGSAQ58H2f)" />
      <path fill="#1f9cf0" d="M193.428 252.134a15.89 15.89 0 0 1-18.125-3.083c5.881 5.88 15.938 1.715 15.938-6.603V11.273c0-8.318-10.057-12.483-15.938-6.602a15.89 15.89 0 0 1 18.125-3.084l52.533 25.263a15.94 15.94 0 0 1 9.03 14.363V212.51c0 6.125-3.51 11.709-9.03 14.363z" mask="url(#SVGSAQ58H2f)" />
      <path fill="url(#SVG6Q5wMbNQ)" fillOpacity=".25" d="M180.828 252.605a15.87 15.87 0 0 0 12.65-.486l52.5-25.263a15.94 15.94 0 0 0 9.026-14.363V41.197a15.94 15.94 0 0 0-9.025-14.363L193.477 1.57a15.88 15.88 0 0 0-18.114 3.084L74.857 96.35l-43.78-33.232a10.614 10.614 0 0 0-13.56.603L3.476 76.494c-4.63 4.211-4.635 11.495-.012 15.713l37.967 34.638l-37.967 34.637c-4.623 4.219-4.618 11.502.012 15.714l14.041 12.772a10.614 10.614 0 0 0 13.56.604l43.78-33.233l100.506 91.695a15.9 15.9 0 0 0 5.465 3.571m10.464-183.65l-76.262 57.89l76.262 57.888z" mask="url(#SVGSAQ58H2f)" />
    </svg>
  );
}


export function RaycastIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 18.079V21L0 14L1.46 12.54L7 18.081V18.079ZM9.921 21H7L14 28L15.46 26.54L9.921 21ZM26.535 15.462L27.996 14L13.996 0L12.538 1.466L18.077 7.004H14.73L10.864 3.146L9.404 4.606L11.809 7.01H10.129V17.876H20.994V16.196L23.399 18.6L24.859 17.14L20.994 13.274V9.927L26.535 15.462ZM7.73 6.276L6.265 7.738L7.833 9.304L9.294 7.844L7.73 6.276ZM20.162 18.708L18.702 20.17L20.268 21.738L21.73 20.276L20.162 18.708ZM4.596 9.41L3.134 10.872L7 14.738V11.815L4.596 9.41ZM16.192 21.006H13.268L17.134 24.872L18.596 23.41L16.192 21.006Z" fill="#FF6363" />
    </svg>
  );
}



export function ModelContextProtocolIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 285" {...props}>
      <path d="M184.913 14.498c11.45 11.45 16.119 27.115 14.005 42.002c14.886-2.115 30.551 2.554 42.005 14.008l.578.578c19.332 19.331 19.332 50.674 0 70.005L140.199 242.394a3.3 3.3 0 0 0 0 4.665l20.802 20.802c3.866 3.867 3.866 10.135 0 14.002c-3.867 3.866-10.136 3.866-14.002 0l-20.8-20.803c-9.022-9.02-9.022-23.647 0-32.668L227.5 127.09c11.6-11.599 11.6-30.404-.005-42.008l-.577-.578c-11.455-11.454-29.937-11.597-41.567-.43l-.438.43l-84.59 84.59c-3.866 3.866-10.134 3.866-14 0c-3.867-3.867-3.867-10.135 0-14.001l84.589-84.59c11.6-11.6 11.6-30.404 0-42.004c-11.598-11.598-30.404-11.598-42.003 0L16.901 140.509c-3.867 3.866-10.135 3.866-14.001 0c-3.867-3.866-3.867-10.135 0-14.001L114.908 14.499c19.332-19.332 50.675-19.332 70.005 0m-28.001 28.003c3.866 3.866 3.866 10.134 0 14l-82.84 82.84c-11.6 11.599-11.6 30.404 0 42.004c11.598 11.598 30.404 11.598 42.003 0l82.84-82.84c3.866-3.866 10.134-3.866 14 0c3.867 3.866 3.867 10.135 0 14l-82.84 82.841c-19.33 19.33-50.673 19.33-70.005 0c-19.33-19.333-19.33-50.675 0-70.006l82.84-82.84c3.867-3.866 10.135-3.866 14.002 0" />
    </svg>
  );
}
