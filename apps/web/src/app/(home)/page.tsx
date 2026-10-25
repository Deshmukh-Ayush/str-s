import Link from "next/link";
import { Container } from "@/components/landing/container";
import { SectionHeading } from "@/components/landing/section-heading";
import { HeroVisual } from "@/components/landing/hero-visual";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Playground } from "@/components/landing/playground";
import { BenchmarksTable } from "@/components/landing/benchmarks-table";
import { SurfacesGrid } from "@/components/landing/surfaces-grid";
import { CtaCard } from "@/components/landing/cta-card";
import { SourcesMarquee } from "@/components/landing/sources-marquee";
import { CopyableSnippet } from "@/components/landing/install-snippet";

const heroBadges = ["9,600+ ops/sec", "~88× faster than SVGR", "0 dependencies"];

const stats = [
  { value: "0.024 ms", label: "per icon conversion" },
  { value: "~88×", label: "faster than SVGR" },
  { value: "3.1 kB", label: "gzipped, zero deps" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-28 pb-28 sm:gap-36 sm:pb-36">
      {/* 1. Hero — centered column on a warm rounded panel, product collage cropped at the bottom */}
      <section className="px-3 pt-2 sm:px-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-str-panel px-4 pt-20 sm:rounded-[2.5rem] sm:pt-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <a
              href="https://www.npmjs.com/package/@everywhereayush/str-s"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-str-surface/70 px-3 py-1 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              <span className="size-1.5 rounded-full bg-str-accent" />
              str-s v0.1.0 on npm
            </a>

            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-fd-foreground text-balance sm:text-7xl">
              SVG to React and Tailwind, in 3 kB.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-fd-muted-foreground text-pretty sm:text-lg">
              STR is the smallest and fastest SVG to React + Tailwind converter, purpose-built for icons and simple
              graphics. Zero runtime dependencies, typed output, props forwarded.
            </p>

            <ul className="flex flex-wrap justify-center gap-2" aria-label="Highlights">
              {heroBadges.map((badge) => (
                <li key={badge} className="rounded-full bg-fd-accent px-3.5 py-1.5 text-sm text-fd-foreground/80">
                  {badge}
                </li>
              ))}
            </ul>

            <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:items-center">
              <Link
                href="/docs"
                className="inline-flex h-10 items-center justify-center rounded-full bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring"
              >
                Read the docs
              </Link>
              <CopyableSnippet code="pnpm add @everywhereayush/str-s" label="$" className="sm:w-80" />
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* 2. How it works — auto-cycling three-step sequence */}
      <section>
        <Container>
          <HowItWorks />
        </Container>
      </section>

      {/* 3. Playground */}
      <section id="playground" className="scroll-mt-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            title="Try it right here."
            description="Paste an icon from Figma, Lucide, Feather or Tabler and get a clean React component with Tailwind classes. It runs entirely in your browser, with no network requests."
          />
          <div className="mx-auto w-full max-w-5xl">
            <Playground />
          </div>
          <p className="text-center text-sm text-fd-muted-foreground">
            The preview renders as an isolated image, so nothing from the pasted SVG is injected into the page.
          </p>
        </Container>
      </section>

      {/* 4. Benchmarks */}
      <section id="benchmarks" className="scroll-mt-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            title="Measured, not promised."
            description="Benchmarked against SVGR, svg-to-jsx and svg-to-react-cli on identical real-world icon fixtures, using tinybench on Node v24 with warmup iterations excluded."
          />
          <dl className="str-reveal grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 rounded-[1.75rem] bg-str-panel p-8 text-center">
                <dt className="order-2 text-sm text-fd-muted-foreground">{stat.label}</dt>
                <dd className="order-1 font-serif text-5xl tracking-tight text-fd-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="str-reveal">
            <BenchmarksTable />
            <p className="mt-4 text-center text-xs text-fd-muted-foreground">
              Source: <code className="font-mono">packages/core/bench/run-bench.js</code> across 5 standard icon fixtures.{" "}
              <Link href="/docs/benchmarks" className="underline underline-offset-2 hover:text-fd-foreground">
                Methodology
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* 5. Surfaces — bento grid */}
      <section id="surfaces" className="scroll-mt-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            title="Four surfaces, one core."
            description={
              <>
                Every wrapper is a thin layer over the same zero-dependency <code className="font-mono text-sm">str-s</code>{" "}
                package. Conversion logic is never duplicated.
              </>
            }
          />
          <SurfacesGrid />
        </Container>
      </section>

      {/* 6. Quickstart */}
      <section>
        <Container size="narrow" className="flex flex-col gap-10">
          <SectionHeading
            title="Quickstart."
            description="Install the package for your own code, or point your AI agent at the MCP server."
          />
          <div className="str-reveal flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-fd-foreground">Install the npm package</span>
              <CopyableSnippet code="pnpm add @everywhereayush/str-s" label="$" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-fd-foreground">MCP server config (Claude Desktop / Cursor)</span>
              <pre className="overflow-x-auto rounded-2xl bg-str-ink p-5 font-mono text-xs leading-relaxed text-str-ink-foreground">
                <code>{`{
  "mcpServers": {
    "str": {
      "command": "npx",
      "args": ["-y", "str-s-mcp"]
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. CTA */}
      <section>
        <CtaCard />
      </section>

      {/* 8. Sources marquee, sits right above the footer edge */}
      <section aria-label="Supported SVG sources">
        <SourcesMarquee />
      </section>
    </div>
  );
}
