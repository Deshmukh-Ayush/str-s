import Link from "next/link";
import { Container } from "./container";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-fd-border/50 bg-fd-background/80 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono font-semibold tracking-tight text-fd-foreground hover:opacity-80 transition-opacity">
          <span className="rounded bg-fd-foreground px-1.5 py-0.5 text-xs font-bold text-fd-background">STR</span>
          <span className="text-sm">str-s</span>
        </Link>
        <nav className="flex items-center gap-5 text-xs sm:text-sm font-medium text-fd-muted-foreground">
          <Link href="/docs" className="hover:text-fd-foreground transition-colors">
            Docs
          </Link>
          <a href="#benchmarks" className="hover:text-fd-foreground transition-colors">
            Benchmarks
          </a>
          <a
            href="https://github.com/str-tools/str-s"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fd-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/str-s"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-fd-border bg-fd-secondary px-2.5 py-1 text-xs font-mono text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            npm v0.1.0
          </a>
        </nav>
      </Container>
    </header>
  );
}
