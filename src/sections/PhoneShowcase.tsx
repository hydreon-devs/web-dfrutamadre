import { useEffect, useRef, useState, type ReactNode } from "react";
import { calcularPrecio, desglosarSeleccion } from "../domain/builder/pricing";
import type { Producto, Seleccion } from "../domain/builder/types";
import { PRODUCTOS_CONFIGURABLES, fresasConCrema, imgProducto } from "../domain/menu";
import { cn } from "../shared/lib/cn";
import { formatPrecio } from "../shared/lib/format";
import { IconCheck, IconWhatsApp } from "../shared/ui";

/** Selección de ejemplo: labels y total salen del producto real, no se hardcodean. */
const SELECCION_DEMO: Seleccion = {
  tamano: ["med"],
  salsa: ["lecherita"],
  clasicos: ["oreo", "masmelos"],
  premium: ["durazno"],
};

const PASOS_DEMO = desglosarSeleccion(fresasConCrema, SELECCION_DEMO);
const TOTAL_DEMO = calcularPrecio(fresasConCrema, SELECCION_DEMO);

/** Precio base mínimo de un producto configurable, para el "Desde $…" del catálogo. */
function precioDesde(producto: Producto): number {
  const base = producto.pasos.find((p) => p.tipo === "single" && p.defineBase);
  return base ? Math.min(...base.opciones.map((o) => o.precio ?? 0)) : 0;
}

/**
 * Secuencia de la demo, por índice de paso:
 *   0 catálogo · 1 tap en Fresas · 2-5 pasos del armado completándose ·
 *   6 resumen · 7 tap en Enviar → vuelve a 0.
 */
const DURACIONES_MS = [1500, 900, 1000, 900, 900, 1100, 1700, 2000];

/** Con prefers-reduced-motion el loop sigue, pero más lento y solo con crossfade. */
const FACTOR_REDUCIDO = 1.6;

function prefiereReducido(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Mockup decorativo de un teléfono que simula el flujo real del pedido en un
 * loop de ~10s: catálogo → armado paso a paso → resumen + enviar. Arranca al
 * entrar al viewport y se pausa al salir. Con `prefers-reduced-motion` la
 * secuencia avanza igual pero más lenta y con transiciones de opacidad pura
 * (sin desplazamientos, escalas ni ondas de tap) vía variantes motion-reduce.
 */
export function PhoneShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducido] = useState(prefiereReducido);
  const [paso, setPaso] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(
      () => setPaso((p) => (p + 1) % DURACIONES_MS.length),
      DURACIONES_MS[paso] * (reducido ? FACTOR_REDUCIDO : 1),
    );
    return () => clearTimeout(t);
  }, [paso, visible, reducido]);

  const escena = paso <= 1 ? "catalogo" : paso <= 5 ? "armado" : "resumen";

  return (
    <div
      ref={ref}
      className="relative z-2 w-[clamp(205px,52vw,245px)] min-[940px]:w-[300px] aspect-[9/19] rounded-[46px] min-[940px]:rounded-[54px] border-[9px] min-[940px]:border-[11px] border-[#2a171d] bg-blush shadow-fm-lg overflow-hidden"
      aria-hidden="true"
    >
      {/* Barra de estado + isla dinámica */}
      <span className="absolute z-3 top-3 left-6 font-round font-bold text-[.7rem] min-[940px]:text-[.8rem] text-cacao">
        9:41
      </span>
      <span className="absolute z-3 top-2.5 min-[940px]:top-3 left-1/2 -translate-x-1/2 w-16 h-4.5 min-[940px]:w-20 min-[940px]:h-5.5 rounded-full bg-[#2a171d]" />
      <span className="absolute z-3 top-4 right-6 flex gap-1">
        {[0, 1, 2].map((d) => (
          <span key={d} className="w-1 h-1 rounded-full bg-cacao" />
        ))}
      </span>

      {/* Escena 1: catálogo de productos */}
      <Escena activa={escena === "catalogo"}>
        <TituloEscena>¿Qué se te antoja?</TituloEscena>
        {PRODUCTOS_CONFIGURABLES.map((p) => {
          const presionada = p.id === fresasConCrema.id && paso === 1;
          return (
            <div
              key={p.id}
              className={cn(
                "relative flex items-center gap-2.5 bg-white rounded-2xl shadow-fm-sm px-3 py-2.5 transition-all duration-300",
                presionada && "scale-[.96] ring-2 ring-coral motion-reduce:scale-100",
              )}
            >
              <img
                src={imgProducto(p.id)}
                alt=""
                className="w-9 h-11 min-[940px]:w-11 min-[940px]:h-13 flex-none object-contain drop-shadow-[0_4px_6px_rgb(200_70_95/0.18)]"
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0">
                <p className="font-round font-extrabold text-[.82rem] min-[940px]:text-[.95rem] text-cacao leading-tight">
                  {p.nombre}
                </p>
                <p className="font-round font-bold text-[.72rem] min-[940px]:text-[.8rem] text-verde-700">
                  Desde {formatPrecio(precioDesde(p))}
                </p>
              </div>
              {presionada && <Tap className="right-4 bottom-2" />}
            </div>
          );
        })}
      </Escena>

      {/* Escena 2: pasos del armado completándose */}
      <Escena activa={escena === "armado"}>
        <TituloEscena>{fresasConCrema.nombre}</TituloEscena>
        {PASOS_DEMO.map((d, i) => {
          const hecha = escena !== "armado" || paso >= i + 2;
          return (
            <div
              key={d.paso.id}
              className={cn(
                "bg-white rounded-2xl shadow-fm-sm px-3.5 py-2.5 transition-all duration-300",
                hecha ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 motion-reduce:translate-y-0",
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="grid place-items-center w-5 h-5 min-[940px]:w-6 min-[940px]:h-6 rounded-full text-white text-[.65rem] min-[940px]:text-[.75rem] bg-gradient-to-br from-[#f36a85] to-coral">
                  <IconCheck />
                </span>
                <span className="font-round font-extrabold text-[.8rem] min-[940px]:text-[.92rem] text-coral-700">
                  {d.paso.etiqueta}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {d.labels.map((label) => (
                  <span
                    key={label}
                    className="font-round font-bold text-[.72rem] min-[940px]:text-[.8rem] text-coral-700 bg-coral-tint px-2.5 py-0.5 rounded-full"
                  >
                    {label}
                  </span>
                ))}
                {d.base > 0 && (
                  <span className="font-round font-bold text-[.72rem] min-[940px]:text-[.8rem] text-verde-700 bg-verde-tint px-2.5 py-0.5 rounded-full">
                    {formatPrecio(d.base)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </Escena>

      {/* Escena 3: resumen del pedido + enviar */}
      <Escena activa={escena === "resumen"}>
        <TituloEscena>Tu pedido</TituloEscena>
        <div className="bg-white rounded-2xl shadow-fm-sm px-3.5 py-3">
          <div className="flex items-center gap-2 mb-1.5">
            <img
              src={imgProducto(fresasConCrema.id)}
              alt=""
              className="w-7 h-9 min-[940px]:w-9 min-[940px]:h-11 flex-none object-contain drop-shadow-[0_4px_6px_rgb(200_70_95/0.18)]"
              loading="lazy"
              decoding="async"
            />
            <p className="font-round font-extrabold text-[.84rem] min-[940px]:text-[.95rem] text-cacao">
              {fresasConCrema.nombre}
            </p>
          </div>
          <ul className="flex flex-col gap-0.5 text-[.74rem] min-[940px]:text-[.84rem] text-cacao-soft">
            {PASOS_DEMO.map((d) => (
              <li key={d.paso.id}>
                <span className="font-bold text-cacao">{d.paso.etiqueta}:</span>{" "}
                {d.labels.join(", ")}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-baseline justify-between bg-white rounded-2xl shadow-fm-sm px-3.5 py-3">
          <span className="font-round font-extrabold text-[.84rem] min-[940px]:text-[.95rem] text-cacao">Total</span>
          <span className="font-round font-extrabold text-[1.05rem] min-[940px]:text-[1.2rem] text-coral-700">
            {formatPrecio(TOTAL_DEMO)}
          </span>
        </div>
        <div className="relative mt-auto">
          <span
            className={cn(
              "flex items-center justify-center gap-1.5 w-full rounded-full bg-wa text-wa-ink font-round font-extrabold text-[.8rem] min-[940px]:text-[.92rem] py-2.5 min-[940px]:py-3 transition-transform duration-300",
              paso === 7 && "scale-[.96] motion-reduce:scale-100",
            )}
          >
            <IconWhatsApp className="text-[1rem]" /> Enviar pedido
          </span>
          {paso === 7 && <Tap className="right-8 top-1/2 -translate-y-1/2" />}
        </div>
      </Escena>
    </div>
  );
}

function Escena({ activa, children }: { activa: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col gap-2.5 min-[940px]:gap-3 px-3.5 min-[940px]:px-4 pt-11 min-[940px]:pt-13 pb-5 transition-all duration-500 motion-reduce:duration-[900ms]",
        activa ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 motion-reduce:translate-y-0",
      )}
    >
      {children}
    </div>
  );
}

function TituloEscena({ children }: { children: ReactNode }) {
  return (
    <p className="font-round font-extrabold text-[.9rem] min-[940px]:text-[1.05rem] text-coral-700 mb-0.5">{children}</p>
  );
}

/** Indicador de tap simulado: punto coral con onda expansiva (sin onda en motion-reduce). */
function Tap({ className }: { className?: string }) {
  return (
    <span className={cn("absolute z-4 grid place-items-center", className)}>
      <span className="absolute w-8 h-8 rounded-full bg-coral/40 animate-ping motion-reduce:hidden" />
      <span className="w-4 h-4 rounded-full bg-coral/70 ring-2 ring-white" />
    </span>
  );
}
