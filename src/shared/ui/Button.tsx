import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "primary" | "secondary" | "wa" | "ghost";
type Size = "sm" | "md" | "hero";

const baseClasses =
  "inline-flex items-center justify-center gap-[.55em] font-round font-bold leading-none rounded-full whitespace-nowrap text-center transition-all duration-150 " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[.98] " +
  "focus-visible:outline-3 focus-visible:outline-verde focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-coral text-white shadow-[0_10px_28px_rgb(200_70_95/0.14),inset_0_-3px_0_rgb(0_0_0/0.08),inset_0_2px_0_rgb(255_255_255/0.25)] hover:shadow-fm-lg",
  secondary:
    "bg-white text-coral-700 shadow-[inset_0_0_0_2.5px_var(--color-coral),0_4px_14px_rgb(200_70_95/0.1)] hover:bg-coral-tint",
  wa: "bg-wa text-wa-ink shadow-fm-md hover:brightness-105",
  ghost:
    "bg-transparent text-coral-700 shadow-none hover:bg-coral-tint hover:translate-y-0 hover:shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "text-[.95rem] px-4.5 py-3",
  md: "text-[1.06rem] px-6.5 py-4",
  hero: "text-[1.22rem] px-8.5 py-5 shadow-[0_14px_34px_rgb(232_76_107/0.4),inset_0_-3px_0_rgb(0_0_0/0.1),inset_0_2px_0_rgb(255_255_255/0.3)]",
};

interface OwnProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonProps = OwnProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = OwnProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", block, className, children, ...rest } = props;
  const classes = cn(baseClasses, variants[variant], sizes[size], block && "w-full", className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
