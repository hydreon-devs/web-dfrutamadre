import { useState } from "react";
import type { Producto, Seleccion } from "../../domain/builder/types";
import { calcularPrecio } from "../../domain/builder/pricing";
import { pasoCompleto, seleccionInicial } from "../../domain/builder/validation";
import { formatPrecio } from "../../shared/lib/format";
import { cn } from "../../shared/lib/cn";
import { Button, IconArrow, IconBack, Logo } from "../../shared/ui";
import { PasoSingleView } from "./components/PasoSingleView";
import { PasoMultiView } from "./components/PasoMultiView";

interface ProductBuilderProps {
  producto: Producto;
  /** Selección inicial al editar un ítem existente */
  initial?: Seleccion;
  editMode?: boolean;
  onBack: () => void;
  onSubmit: (seleccion: Seleccion) => void;
}

/**
 * Wizard genérico: recibe cualquier config de producto y la renderiza
 * paso a paso (una pregunta por pantalla, mobile-first).
 */
export function ProductBuilder({ producto, initial, editMode, onBack, onSubmit }: ProductBuilderProps) {
  const [seleccion, setSeleccion] = useState<Seleccion>(
    () => initial ?? seleccionInicial(producto),
  );
  const [step, setStep] = useState(0);

  const pasos = producto.pasos;
  const paso = pasos[step];
  const total = calcularPrecio(producto, seleccion);
  const esUltimo = step === pasos.length - 1;
  const completo = pasoCompleto(paso, seleccion);

  const go = (n: number) => {
    setStep(n);
    window.scrollTo(0, 0);
  };

  const next = () => {
    if (!completo) return;
    if (esUltimo) onSubmit(seleccion);
    else go(step + 1);
  };

  const prev = () => {
    if (step === 0) onBack();
    else go(step - 1);
  };

  const elegirSingle = (id: string) =>
    setSeleccion((s) => ({ ...s, [paso.id]: [id] }));

  const toggleMulti = (id: string) =>
    setSeleccion((s) => {
      const lista = s[paso.id] ?? [];
      return {
        ...s,
        [paso.id]: lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id],
      };
    });

  const ctaLabel = esUltimo ? (editMode ? "Guardar cambios" : "Agregar al pedido") : "Siguiente";

  return (
    <div className="min-h-dvh bg-crema pb-28">
      {/* Top: volver + progreso */}
      <header className="sticky top-0 z-40 bg-crema/90 backdrop-blur-md shadow-[0_4px_18px_rgb(200_70_95/0.08)]">
        <div className="container-fm flex items-center justify-between gap-3 py-2.5">
          <button
            type="button"
            onClick={prev}
            className="inline-flex items-center gap-1.5 bg-white border-2 border-linea text-coral-700 font-round font-bold px-3.5 py-2 rounded-full transition-all hover:bg-coral-tint hover:-translate-x-0.5"
            aria-label="Volver"
          >
            <IconBack /> <span>{step === 0 ? (editMode ? "Cancelar" : "Volver") : "Volver"}</span>
          </button>
          <span className="font-round font-bold text-[.92rem] text-cacao-soft">
            {editMode ? "Editando" : "Paso"} {step + 1}{" "}
            <span className="opacity-60">/ {pasos.length}</span>
          </span>
          <Logo size={0.72} />
        </div>
        <div
          className="container-fm flex gap-1.5 pb-2.5"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={pasos.length}
        >
          {pasos.map((p, i) => (
            <span
              key={p.id}
              className={cn(
                "h-1.5 flex-1 rounded-full bg-linea transition-colors",
                i <= step && "bg-coral",
                i === step && "bg-coral-700",
              )}
            />
          ))}
        </div>
      </header>

      {/* Cuerpo: una pregunta por pantalla */}
      <main className="container-fm max-w-[640px] pt-6">
        <div key={paso.id} className="view-fade-enter">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="font-round font-extrabold text-coral-700 text-[1.6rem] leading-tight">
                {paso.titulo}
              </h2>
              {paso.subtitulo && (
                <p className="text-cacao-soft font-bold text-[.92rem] mt-0.5">{paso.subtitulo}</p>
              )}
            </div>
            <span
              className={cn(
                "flex-none font-round font-bold text-[.78rem] uppercase tracking-wide rounded-full px-3 py-1.5 mt-1",
                paso.tipo === "single" ? "bg-verde-tint text-verde-700" : "bg-coral-tint text-coral-700",
              )}
            >
              {paso.tipo === "single" ? "Elige 1" : "Elige varios"}
            </span>
          </div>

          {paso.tipo === "single" ? (
            <PasoSingleView paso={paso} elegida={seleccion[paso.id]?.[0]} onElegir={elegirSingle} />
          ) : (
            <PasoMultiView paso={paso} elegidas={seleccion[paso.id] ?? []} onToggle={toggleMulti} />
          )}
        </div>
      </main>

      {/* Barra inferior: total + acción */}
      <footer className="fixed inset-x-0 bottom-0 z-55 bg-white shadow-[0_-8px_24px_rgb(200_70_95/0.14)]">
        <div className="container-fm flex items-center justify-between gap-3 py-3">
          <div className="flex flex-col">
            <span className="text-[.82rem] text-cacao-soft font-bold whitespace-nowrap">
              {esUltimo ? "Subtotal" : "Total"}
            </span>
            <span className="font-round font-extrabold text-[1.45rem] text-coral leading-none">
              {formatPrecio(total)}
            </span>
          </div>
          <Button onClick={next} disabled={!completo} className={cn(!completo && "opacity-50")}>
            {ctaLabel} <IconArrow />
          </Button>
        </div>
      </footer>
    </div>
  );
}
