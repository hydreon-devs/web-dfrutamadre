import { cn } from "../lib/cn";

interface LogoProps {
  size?: number;
  light?: boolean;
}

export function Logo({ size = 1, light = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <img
        src="/assets/mascot-fresa.webp"
        alt=""
        className="object-contain"
        style={{ width: 34 * size, height: 34 * size }}
      />
      <span className="inline-block leading-[0.86]">
        <span
          className={cn("font-display block tracking-[.5px]", light ? "text-white" : "text-coral")}
          style={{ fontSize: `${1.18 * size}rem` }}
        >
          D'Fruta
        </span>
        <span
          className={cn(
            "font-display block tracking-[.5px] -mt-0.5",
            light ? "text-white" : "text-verde-700",
          )}
          style={{ fontSize: `${1.18 * size}rem` }}
        >
          Madre
        </span>
      </span>
    </span>
  );
}
