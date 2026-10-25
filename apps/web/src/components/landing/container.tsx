import * as React from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "narrow";
}

/**
 * Standard content container. `default` is the wide section width,
 * `narrow` is for centered text blocks (headlines, ledes).
 */
export function Container({ className, children, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        size === "narrow" ? "max-w-2xl" : "max-w-6xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
