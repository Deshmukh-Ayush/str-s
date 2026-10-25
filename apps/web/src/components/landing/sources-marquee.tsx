import * as React from "react";

const ROWS = [
  ["Figma", "Lucide", "Feather", "Tabler", "Heroicons", "Phosphor", "Iconoir", "Remix Icon"],
  ["Illustrator", "Inkscape", "Sketch", "Penpot", "Radix Icons", "Material Symbols", "Font Awesome", "Simple Icons"],
];

function Chip({ name }: { name: string }) {
  return (
    <span className="flex shrink-0 items-center gap-3 text-xl font-medium tracking-tight text-fd-foreground sm:text-2xl">
      <span className="flex size-10 items-center justify-center rounded-xl border border-fd-border bg-str-surface text-sm font-semibold text-fd-muted-foreground">
        {name[0]}
      </span>
      {name}
    </span>
  );
}

/** Infinite rows of SVG sources. Static when reduced motion is requested; the full list is always in the sr-only list. */
export function SourcesMarquee() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-center text-sm text-fd-muted-foreground">Works with SVGs exported from</p>
      <ul className="sr-only">
        {ROWS.flat().map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div className="str-marquee flex flex-col gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" aria-hidden="true">
        {ROWS.map((row, r) => (
          <div
            key={r}
            data-reverse={r % 2 === 1 ? "" : undefined}
            className="str-marquee-track flex w-max gap-12 pr-12"
            style={{ "--str-marquee-duration": `${45 + r * 10}s` } as React.CSSProperties}
          >
            {[...row, ...row].map((name, i) => (
              <Chip key={`${name}-${i}`} name={name} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
