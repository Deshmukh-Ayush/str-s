import Link from "next/link";
import { Container } from "./container";

const columns = [
  {
    title: "Surfaces",
    links: [
      { href: "/docs/vscode-cursor", label: "VS Code & Cursor" },
      { href: "/docs/raycast", label: "Raycast" },
      { href: "/docs/mcp-server", label: "MCP Server" },
      { href: "/docs/api-reference", label: "Core Library" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs/benchmarks", label: "Benchmarks" },
      { href: "https://github.com/Deshmukh-Ayush/str-s", label: "GitHub", external: true },
      { href: "https://www.npmjs.com/package/@everywhereayush/str-s", label: "npm", external: true },
      { href: "/llms.txt", label: "llms.txt" },
    ],
  },
];

const linkClass =
  "rounded-sm text-str-ink-foreground/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60";

export function LandingFooter() {
  return (
    <footer className="bg-str-ink pb-8 pt-20 text-sm text-str-ink-muted sm:pt-24">
      <Container className="flex flex-col gap-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div className="flex max-w-xs flex-col gap-3">
            <Link href="/" className="text-2xl font-semibold tracking-tight text-str-ink-foreground">
              str-s
            </Link>
            <p className="leading-relaxed">
              The smallest and fastest SVG to React + Tailwind converter, purpose-built for icons.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-2.5">
              <span className="font-medium text-str-ink-foreground">{column.title}</span>
              {column.links.map((link) =>
                link.external ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>MIT License © STR Contributors</span>
          <span>
            Built by{" "}
            <a
              href="https://x.com/everywhereayush"
              target="_blank"
              rel="noreferrer"
              className="text-str-ink-foreground/90 underline underline-offset-2 hover:text-white"
            >
              @everywhereayush
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
