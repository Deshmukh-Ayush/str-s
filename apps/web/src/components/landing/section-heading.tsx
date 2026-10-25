import * as React from "react";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

/** Serif section headline with an optional letter-spaced eyebrow and muted lede. */
export function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-xl",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-fd-foreground text-balance sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-fd-muted-foreground text-pretty">{description}</p>
      )}
    </div>
  );
}
