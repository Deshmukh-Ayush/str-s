import { convert } from "@everywhereayush/str-s";

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
</svg>`;

// Converted at build time with the real package, so the hero never shows made-up output
const SAMPLE_OUTPUT = convert(SAMPLE_SVG, {
  componentName: "UsersIcon",
  tailwindMapping: "loose",
  typescript: true,
  componentStyle: "arrow",
});

function UsersGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
  );
}

function TrafficLights() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

/**
 * Layered product collage: an editor window with the real conversion,
 * flanked by a terminal card and a size-preview card. Cropped by the hero panel.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-4xl" role="img" aria-label="Editor window showing a raw SVG converted into a typed React component with Tailwind classes">
      {/* Editor window */}
      <div className="overflow-hidden rounded-t-2xl border border-b-0 border-fd-border bg-str-surface shadow-[0_24px_60px_-30px_rgb(30_29_27/0.35)]">
        <div className="flex items-center gap-4 border-b border-fd-border px-4 py-3">
          <TrafficLights />
          <div className="flex gap-1 font-mono text-[11px]">
            <span className="rounded-md px-2 py-1 text-fd-muted-foreground">users.svg</span>
            <span className="rounded-md bg-fd-muted px-2 py-1 text-fd-foreground">UsersIcon.tsx</span>
          </div>
        </div>
        <div className="grid md:grid-cols-[5fr_6fr]">
          <pre className="hidden overflow-hidden border-r border-fd-border p-5 font-mono text-[11px] leading-relaxed text-fd-muted-foreground md:block">
            <code>{SAMPLE_SVG}</code>
          </pre>
          <pre className="overflow-hidden p-5 pb-16 font-mono text-[11px] leading-relaxed text-fd-foreground">
            <code>{SAMPLE_OUTPUT}</code>
          </pre>
        </div>
      </div>

      {/* Terminal card, lower left */}
      <div className="absolute -left-10 bottom-0 hidden w-64 overflow-hidden rounded-t-xl bg-str-ink text-str-ink-foreground shadow-xl lg:block">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <TrafficLights />
        </div>
        <pre className="px-4 pb-8 font-mono text-[11px] leading-relaxed">
          <code>
            <span className="text-str-ink-muted">$ </span>pnpm add @everywhereayush/str-s{"\n"}
            <span className="text-str-ink-muted">+ str-s 0.1.0</span>{"\n"}
            <span className="text-[#3ccf55]">✓</span> 0 dependencies · 3.1 kB
          </code>
        </pre>
      </div>

      {/* Size preview card, lower right */}
      <div className="absolute -right-10 bottom-0 hidden w-56 rounded-t-xl border border-b-0 border-fd-border bg-str-surface p-4 pb-8 shadow-xl lg:block">
        <span className="text-[11px] font-medium text-fd-muted-foreground">Preview</span>
        <div className="mt-3 flex items-end justify-between text-fd-foreground">
          {["size-4", "size-6", "size-8", "size-10"].map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <UsersGlyph className={size} />
              <span className="font-mono text-[10px] text-fd-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
