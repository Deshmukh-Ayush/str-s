import Link from "next/link";
import { Container } from "@/components/landing/container";
import { LiveDemo } from "@/components/landing/live-demo";
import { BenchmarksTable } from "@/components/landing/benchmarks-table";
import { CopyableSnippet } from "@/components/landing/install-snippet";

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
            SVG to React and Tailwind. Near instant. Near zero weight.
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
                <span className="font-medium text-sm text-fd-foreground">VS Code & Cursor Extension</span>
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
                <span className="font-medium text-sm text-fd-foreground">Raycast Extension</span>
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
                <span className="font-medium text-sm text-fd-foreground">Model Context Protocol (MCP) Server</span>
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
