import Link from "next/link";
import { Container } from "./container";
import { CursorIcon, GithubIcon, ModelContextProtocolIcon, RaycastIcon, VisualStudioCodeIcon } from "./brand-icons";
import { StrLogo } from "@/components/str-logo";

const ORBIT = [
  { key: "vscode", node: <VisualStudioCodeIcon className="size-4" /> },
  { key: "cursor", node: <CursorIcon className="size-4 dark:invert" /> },
  { key: "raycast", node: <RaycastIcon className="size-4" /> },
  { key: "mcp", node: <ModelContextProtocolIcon className="size-4 fill-current" /> },
  { key: "npm", node: <span className="font-mono text-[10px] font-semibold">npm</span> },
  { key: "tsx", node: <span className="font-mono text-[10px] font-semibold">TSX</span> },
];

const RADIUS = 104;

export function CtaCard() {
  return (
    <Container>
      <div className="str-reveal grid items-center gap-10 rounded-[2rem] bg-str-surface p-8 shadow-[0_30px_80px_-40px_rgb(30_29_27/0.3)] sm:p-12 md:grid-cols-[11fr_9fr]">
        <div className="flex flex-col gap-5">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            Open source · MIT
          </span>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-fd-foreground text-balance sm:text-5xl">
            Paste an SVG. Get a component.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-fd-muted-foreground">
            One zero-dependency core powers every surface, from your editor to your AI agent. Install it once and keep icon work out of your way.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://github.com/Deshmukh-Ayush/str-s"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-fd-border px-5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring"
            >
              <GithubIcon className="size-4 fill-current" aria-hidden="true" />
              Star on GitHub
            </a>
            <Link
              href="/docs"
              className="inline-flex h-10 items-center rounded-full bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring"
            >
              Get started
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-[1.5rem] bg-fd-background/60 px-6 py-10" aria-hidden="true">
          <div className="relative size-64">
            {/* Warm radial glow behind the core */}
            <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--str-accent)_22%,transparent),transparent_70%)]" />
            <div className="absolute inset-0 rounded-full border border-dashed border-fd-border" style={{ margin: 128 - RADIUS }} />
            <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-str-surface shadow-lg">
              <StrLogo size={36} />
            </div>
            <div className="str-orbit absolute inset-0">
              {ORBIT.map((item, i) => {
                const angle = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <div
                    key={item.key}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: `translate(${Math.cos(angle) * RADIUS}px, ${Math.sin(angle) * RADIUS}px)` }}
                  >
                    <div className="str-orbit-counter -ml-5 -mt-5 flex size-10 items-center justify-center rounded-xl border border-fd-border bg-str-surface text-fd-foreground shadow-sm">
                      {item.node}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-fd-muted-foreground">
            <span>0 dependencies</span>
            <span>·</span>
            <span>3.1 kB gzip</span>
            <span>·</span>
            <span>MIT licensed</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
