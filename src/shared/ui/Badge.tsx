import type { ReactNode } from "react";
import { cn } from "../lib/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "coral" | "green" | "light";
  className?: string;
}

export function Badge({ children, variant = "coral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-round font-bold text-[.78rem] tracking-wider uppercase rounded-full px-3.5 py-1.5",
        variant === "coral" && "text-coral-700 bg-coral-tint",
        variant === "green" && "text-verde-700 bg-verde-tint",
        variant === "light" && "text-white bg-white/22",
        className,
      )}
    >
      {children}
    </span>
  );
}
