import type { PasoMulti } from "../../../domain/builder/types";
import { formatPrecio } from "../../../shared/lib/format";
import { cn } from "../../../shared/lib/cn";
import { IconCheck } from "../../../shared/ui";

interface PasoMultiViewProps {
  paso: PasoMulti;
  elegidas: string[];
  onToggle: (id: string) => void;
}

export function PasoMultiView({ paso, elegidas, onToggle }: PasoMultiViewProps) {
  const extras = Math.max(0, elegidas.length - paso.incluidos);

  // posición de selección → incluido o extra
  const tierDe = (id: string): "incl" | "extra" | null => {
    const i = elegidas.indexOf(id);
    if (i < 0) return null;
    return i < paso.incluidos ? "incl" : "extra";
  };

  return (
    <div>
      {/* Contador */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-white border-2 border-linea rounded-media px-4 py-2.5 mb-3.5 text-[.92rem] font-bold text-cacao">
        <span>
          <b className="font-round font-extrabold">{elegidas.length}</b> elegido
          {elegidas.length === 1 ? "" : "s"}
        </span>
        <span className="w-px h-4 bg-linea" aria-hidden="true" />
        <span className={cn(extras > 0 && "text-coral-700")}>
          <b className="font-round font-extrabold">{extras}</b> extra{extras === 1 ? "" : "s"}
          {extras > 0 && (
            <em className="not-italic"> · +{formatPrecio(extras * paso.costoExtra)}</em>
          )}
        </span>
        <span className="ml-auto text-[.82rem] text-verde-700 bg-verde-tint rounded-full px-2.5 py-0.5">
          {paso.incluidos} incluido{paso.incluidos === 1 ? "" : "s"}
        </span>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2.5">
        {paso.opciones.map((op) => {
          const tier = tierDe(op.id);
          const on = tier !== null;
          return (
            <button
              key={op.id}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(op.id)}
              className={cn(
                "inline-flex items-center gap-2 font-round font-semibold text-[.98rem] text-cacao bg-white border-2 border-linea px-4 py-2.5 rounded-full transition-all",
                "hover:border-rosa hover:-translate-y-px",
                on && "bg-coral border-coral text-white shadow-fm-sm",
                tier === "extra" && "bg-coral-700 border-coral-700",
              )}
            >
              <span className={cn("hidden", on && "inline-flex")} aria-hidden="true">
                <IconCheck />
              </span>
              <span>{op.label}</span>
              {tier === "incl" && (
                <span className="text-[.72rem] font-extrabold uppercase tracking-wide bg-white/25 rounded-full px-2 py-0.5">
                  incluido
                </span>
              )}
              {tier === "extra" && (
                <span className="text-[.72rem] font-extrabold uppercase tracking-wide bg-white/25 rounded-full px-2 py-0.5">
                  +{formatPrecio(paso.costoExtra)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
