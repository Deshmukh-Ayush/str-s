import Link from "next/link";
import { Container } from "./container";
import { StrLogo } from "@/components/str-logo";

export function LandingFooter() {
  return (
    <footer className="border-t border-fd-border/50 py-12 text-xs text-fd-muted-foreground">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex flex-col gap-2.5 max-w-xs">
            <Link href="/" className="flex items-center gap-2 font-mono font-semibold text-fd-foreground hover:opacity-80 transition-opacity">
              <StrLogo size={20} />
              <span>STR (str-s)</span>
            </Link>
            <p className="leading-relaxed">
              The smallest and fastest SVG to React + Tailwind converter, purpose-built for icons with zero runtime dependencies.
            </p>
            <p className="mt-2 text-fd-foreground">
              Built by{" "}
              <a
                href="https://x.com/everywhereayush"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline hover:text-fd-primary transition-colors"
              >
                @everywhereayush
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-fd-foreground">Surfaces</span>
              <Link href="/docs/vscode-cursor" className="hover:text-fd-foreground transition-colors">
                VS Code & Cursor
              </Link>
              <Link href="/docs/raycast" className="hover:text-fd-foreground transition-colors">
                Raycast
              </Link>
              <Link href="/docs/mcp-server" className="hover:text-fd-foreground transition-colors">
                MCP Server
              </Link>
              <Link href="/docs/api-reference" className="hover:text-fd-foreground transition-colors">
                Core Library
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-fd-foreground">Resources</span>
              <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/docs/benchmarks" className="hover:text-fd-foreground transition-colors">
                Benchmarks
              </Link>
              <a
                href="https://github.com/Deshmukh-Ayush/str-s"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fd-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@everywhereayush/str-s"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fd-foreground transition-colors"
              >
                npm
              </a>
              <Link href="/llms.txt" className="hover:text-fd-foreground transition-colors font-mono">
                llms.txt
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-fd-border/40 pt-6 gap-2 text-[11px]">
          <span>MIT License © STR Contributors</span>
          <span className="font-mono">≤3.1 kB gzip • 0 deps • &gt;9,600 ops/s</span>
        </div>
      </Container>
    </footer>
  );
}
