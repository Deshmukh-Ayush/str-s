import Image from "next/image";
import { cn } from "@/lib/cn";

export interface StrLogoProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

export function StrLogo({ className, size = 24, priority = false }: StrLogoProps) {
  return (
    <Image
      src="/str-logo.svg"
      alt="STR Logo"
      width={size}
      height={size}
      className={cn("rounded-md shrink-0", className)}
      unoptimized
      priority={priority}
    />
  );
}
