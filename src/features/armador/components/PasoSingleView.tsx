import type { PasoSingle } from "../../../domain/builder/types";
import { formatPrecio } from "../../../shared/lib/format";
import { cn } from "../../../shared/lib/cn";

interface PasoSingleViewProps {
  paso: PasoSingle;
  elegida?: string;
  onElegir: (id: string) => void;
}

export function PasoSingleView({ paso, elegida, onElegir }: PasoSingleViewProps) {
  return (
    <div className="grid gap-2.5">
      {paso.opciones.map((op) => {
        const on = elegida === op.id;
        return (
          <button
            key={op.id}
            type="button"
            aria-pressed={on}
            onClick={() => onElegir(op.id)}
            className={cn(
              "flex items-center gap-3.5 w-full text-left bg-white border-[2.5px] border-linea rounded-media px-4 py-3.5 transition-all",
              "hover:border-rosa hover:-translate-y-px",
              on && "border-coral bg-coral-tint shadow-fm-sm",
            )}
          >
            <span
              className={cn(
                "grid place-items-center w-5.5 h-5.5 rounded-full border-[2.5px] border-linea bg-white flex-none transition-colors",
                on && "border-coral",
              )}
              aria-hidden="true"
            >
              <span className={cn("w-2.5 h-2.5 rounded-full", on && "bg-coral")} />
            </span>
            <span className="flex flex-col flex-1 min-w-0">
              <span className="font-round font-extrabold text-cacao text-[1.05rem] leading-tight">
                {op.label}
              </span>
              {op.meta && <span className="text-[.85rem] text-cacao-soft font-bold">{op.meta}</span>}
            </span>
            <span
              className={cn(
                "font-round font-extrabold whitespace-nowrap",
                op.precio != null ? "text-coral" : "text-verde-700 text-[.9rem]",
              )}
            >
              {op.precio != null ? formatPrecio(op.precio) : "sin costo"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
