import * as React from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Standard content container enforcing the max-w-xl layout constraint.
 * Every landing page section must wrap its content with this component.
 */
export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-xl px-4 sm:px-6", className)} {...props}>
      {children}
    </div>
  );
}
