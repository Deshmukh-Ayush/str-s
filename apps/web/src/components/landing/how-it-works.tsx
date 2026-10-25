"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

const STEP_DURATION = 4200;

const SOURCES = ["Figma", "Lucide", "Feather", "Tabler", "Heroicons", "Phosphor", "Iconoir", "Penpot", "Sketch"];

// Real mappings produced by convert() in loose mode
const MAPPINGS = [
  { from: 'width="24"', to: "w-6" },
  { from: 'height="24"', to: "h-6" },
  { from: 'fill="none"', to: "fill-none" },
  { from: 'stroke="currentColor"', to: "stroke-current" },
  { from: 'stroke-width="2"', to: "stroke-2" },
];

const steps = [
  {
    heading: "Paste an SVG from anywhere",
    title: "Paste",
    body: "Raw exports from design tools and icon sets, including inline styles, xlink references and <style> blocks.",
  },
  {
    heading: "Map attributes to Tailwind",
    title: "Map",
    body: "Dimensions, fills and strokes become utility classes. Values off the scale fall back to brackets, or you can keep them as attributes.",
  },
  {
    heading: "Ship a typed React component",
    title: "Ship",
    body: "Typed TSX with camelCased attributes and forwarded props, ready to drop into your component library.",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function HowItWorks() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Once a step has played its fill-in animation it stays filled
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    if (reducedMotion) setVisited(new Set([0, 1, 2]));
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % steps.length), STEP_DURATION);
    return () => clearTimeout(timer);
  }, [active, paused, reducedMotion]);

  useEffect(() => {
    setVisited((prev) => (prev.has(active) ? prev : new Set(prev).add(active)));
  }, [active]);

  const filled = (i: number) => visited.has(i);

  return (
    <div
      className="flex flex-col gap-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h2 className="flex flex-col font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl">
        {steps.map((step, i) => (
          <span
            key={step.title}
            className={cn("transition-colors duration-500", i === active ? "text-fd-foreground" : "text-fd-foreground/35")}
          >
            {step.heading}
            <sup className={cn("ml-1 font-sans text-xs transition-colors duration-500", i === active ? "text-str-accent" : "text-fd-muted-foreground/60")}>
              0{i + 1}
            </sup>
          </span>
        ))}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className="group flex flex-col gap-6 rounded-[1.75rem] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fd-ring"
          >
            <div
              className={cn(
                "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.75rem] border bg-str-surface p-6 transition-all duration-500",
                i === active ? "border-fd-border shadow-[0_18px_40px_-24px_rgb(30_29_27/0.35)] md:scale-[1.02]" : "border-fd-border/60",
              )}
            >
              {i === 0 && <SourcesMock filled={filled(0)} />}
              {i === 1 && <MappingMock filled={filled(1)} />}
              {i === 2 && <OutputMock filled={filled(2)} active={i === active} />}
            </div>
            <div className="flex flex-col gap-1.5 px-1">
              <span className={cn("font-mono text-[11px] transition-colors", i === active ? "text-str-accent" : "text-fd-muted-foreground")}>
                0{i + 1}
              </span>
              <span className="text-sm font-semibold text-fd-foreground">{step.title}</span>
              <span className="text-sm leading-relaxed text-fd-muted-foreground">{step.body}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SourcesMock({ filled }: { filled: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {SOURCES.map((name, i) => (
        <span
          key={name}
          style={{ transitionDelay: filled ? `${i * 90}ms` : "0ms" }}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-background px-2 py-1.5 text-[11px] text-fd-foreground transition-all duration-500",
            filled || i % 4 === 0 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
          )}
        >
          <span className="flex size-4 items-center justify-center rounded bg-fd-muted text-[9px] font-semibold text-fd-muted-foreground">
            {name[0]}
          </span>
          {name}
        </span>
      ))}
    </div>
  );
}

function MappingMock({ filled }: { filled: boolean }) {
  return (
    <div className="flex w-full flex-col gap-2 font-mono text-[11px]">
      {MAPPINGS.map((row, i) => (
        <div
          key={row.to}
          style={{ transitionDelay: filled ? `${i * 160}ms` : "0ms" }}
          className={cn(
            "flex items-center justify-between gap-2 rounded-lg bg-fd-background px-3 py-1.5 transition-all duration-500",
            filled || i === 0 ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
          )}
        >
          <span className="truncate text-fd-muted-foreground">{row.from}</span>
          <span className="shrink-0 rounded-md bg-str-ink px-1.5 py-0.5 text-str-ink-foreground">{row.to}</span>
        </div>
      ))}
    </div>
  );
}

function OutputMock({ filled, active }: { filled: boolean; active: boolean }) {
  const [converted, setConverted] = useState(false);

  useEffect(() => {
    if (!active) return;
    setConverted(false);
    const timer = setTimeout(() => setConverted(true), 1200);
    return () => clearTimeout(timer);
  }, [active]);

  // Inactive cards show the finished state once visited (or always, with reduced motion)
  const done = active ? converted : filled;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-xl border border-fd-border bg-fd-background p-3 font-mono text-[10.5px] leading-relaxed text-fd-muted-foreground">
        <span className="text-fd-foreground">export const</span> UsersIcon = (props) =&gt; (
        <br />
        &nbsp;&nbsp;&lt;svg className=&quot;<span className="text-str-accent">w-6 h-6 stroke-current</span>&quot; …
      </div>
      <div className="flex items-center gap-2 text-[11px] text-fd-muted-foreground">
        {done ? (
          <Check className="size-3.5 text-str-success" aria-hidden="true" />
        ) : (
          <RefreshCw className="size-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        )}
        <span>{done ? "Wrote UsersIcon.tsx" : "Converting 1 icon"}</span>
        <span className="ml-auto rounded-full bg-fd-muted px-2 py-0.5 font-mono text-[10px] text-fd-foreground">
          0.024 ms
        </span>
      </div>
    </div>
  );
}
