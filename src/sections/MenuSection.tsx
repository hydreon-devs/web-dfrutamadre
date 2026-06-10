import { useEffect, useRef, useState } from "react";
import { BRAND, ESPECIALES, OTROS, fresasConCrema } from "../domain/menu";
import type { Especial } from "../domain/menu";
import type { PasoMulti, PasoSingle } from "../domain/builder/types";
import { formatPrecio } from "../shared/lib/format";
import { buildWaUrl } from "../shared/lib/whatsapp";
import { Badge } from "../shared/ui";
import { cn } from "../shared/lib/cn";

const tamanos = fresasConCrema.pasos.find((p) => p.id === "tamano") as PasoSingle;
const salsas = fresasConCrema.pasos.find((p) => p.id === "salsa") as PasoSingle;
const clasicos = fresasConCrema.pasos.find((p) => p.id === "clasicos") as PasoMulti;
const premium = fresasConCrema.pasos.find((p) => p.id === "premium") as PasoMulti;

const escalaTamano: Record<string, number> = { peq: 0.78, med: 0.92, gra: 1.1 };

function EspecialCard({ p }: { p: Especial }) {
  const [aviso, setAviso] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const mostrarAviso = () => {
    window.clearTimeout(timerRef.current);
    setAviso(true);
    timerRef.current = window.setTimeout(() => setAviso(false), 4000);
  };

  const cardClasses =
    "relative flex flex-col bg-white rounded-card shadow-fm-sm p-3.5 border-2 border-transparent transition-all hover:-translate-y-1 hover:shadow-fm-md hover:border-rosa-soft";

  const contenido = (
    <>
      {p.tag && (
        <Badge variant="coral" className="absolute top-5.5 left-5.5 z-3">
          {p.tag}
        </Badge>
      )}
      <div className="relative grid place-items-center aspect-square bg-blush rounded-media overflow-hidden">
        <img
          src={p.img}
          alt={p.nombre}
          className="w-[86%] h-[86%] object-contain drop-shadow-[0_8px_14px_rgb(200_70_95/0.18)]"
        />
      </div>
      <h4 className="font-round font-extrabold text-coral-700 text-[1.12rem] mt-2.5 mb-0.5">
        {p.nombre}
      </h4>
      <p className="text-[.92rem] text-cacao-soft mb-3">{p.desc}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {p.precios.map((s, i) => (
          <span key={i} className="inline-flex flex-col bg-blush rounded-[14px] px-3 py-1.5">
            <span className="text-[.72rem] text-cacao-soft font-bold">{s.label}</span>
            <span className="font-round font-extrabold text-coral-700">
              {formatPrecio(s.precio)}
            </span>
          </span>
        ))}
      </div>
    </>
  );

  if (p.waMensaje) {
    return (
      <a
        href={buildWaUrl(BRAND.telefonoIntl, p.waMensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {contenido}
        <span className="mt-3 font-round font-extrabold text-[.9rem] text-coral">
          Pedir por WhatsApp →
        </span>
      </a>
    );
  }

  return (
    <button type="button" onClick={mostrarAviso} className={cn(cardClasses, "text-left")}>
      {contenido}
      <span className="mt-3 font-round font-extrabold text-[.9rem] text-cacao-soft">
        Disponible en nuestro punto físico 🏪
      </span>
      {aviso && (
        <span className="absolute inset-x-2.5 bottom-2.5 z-3 bg-coral text-white text-[.85rem] font-bold rounded-media px-3 py-2.5 shadow-fm-md">
          Las obleas solo se venden en nuestro punto físico 🏪 {BRAND.direccion}
        </span>
      )}
    </button>
  );
}

function ChipStatic({ children, prem }: { children: string; prem?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-round font-semibold text-[.98rem] text-cacao bg-white border-2 border-linea px-4 py-2.5 rounded-full",
        prem && "border-rosa",
      )}
    >
      {children}
    </span>
  );
}

export function MenuSection() {
  return (
    <section className="relative bg-crema py-[clamp(48px,9vw,96px)]" id="menu">
      <div className="container-fm">
        <div className="max-w-[640px] mx-auto mb-10 text-center" data-reveal>
          <p className="font-round font-bold text-[.82rem] tracking-[.14em] uppercase text-verde-700">
            La carta completa
          </p>
          <h2 className="font-round font-extrabold text-coral-700 text-[clamp(2rem,6vw,3rem)] leading-tight mt-1 mb-2">
            Nuestro menú
          </h2>
          <p className="text-cacao-soft">Fresas con crema recién hechas, más antojos de la casa.</p>
        </div>

        {/* Tamaños */}
        <div className="mt-7.5" data-reveal>
          <h3 className="font-round font-extrabold text-coral-700 text-2xl mb-0.5">
            Fresas con crema
          </h3>
          <p className="text-cacao-soft font-semibold mb-4">Elige tamaño y ármalas como quieras.</p>
          <div className="grid grid-cols-3 gap-3 min-[940px]:gap-4.5">
            {tamanos.opciones.map((t) => (
              <article
                key={t.id}
                className="bg-white rounded-card shadow-fm-sm border-2 border-transparent px-2.5 pt-3.5 pb-4.5 text-center transition-all hover:-translate-y-1 hover:shadow-fm-md hover:border-rosa-soft"
              >
                <div className="grid place-items-center aspect-square bg-blush rounded-media overflow-hidden mb-2.5">
                  <img
                    src="/assets/cup-chocolate.webp"
                    alt=""
                    className="w-[78%] h-[78%] object-contain drop-shadow-[0_8px_12px_rgb(200_70_95/0.18)]"
                    style={{ transform: `scale(${0.7 + (escalaTamano[t.id] ?? 1) * 0.28})` }}
                  />
                </div>
                <h4 className="font-round font-extrabold text-cacao text-[1.05rem]">{t.label}</h4>
                <p className="text-cacao-soft text-[.85rem] font-bold mb-1.5">{t.meta}</p>
                <p className="font-round font-extrabold text-coral text-[1.25rem]">
                  {formatPrecio(t.precio ?? 0)}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Salsas + toppings */}
        <div className="grid grid-cols-1 gap-3.5 mt-4.5 min-[720px]:grid-cols-2">
          <div
            className="bg-white rounded-card shadow-fm-sm p-5 min-[720px]:col-span-2"
            data-reveal
          >
            <h3 className="font-round font-extrabold text-coral-700 text-2xl">Salsas</h3>
            <p className="text-cacao-soft font-semibold mb-3.5">Incluida · elige una</p>
            <div className="flex flex-wrap gap-2">
              {salsas.opciones
                .filter((s) => s.id !== "sin-salsa")
                .map((s) => (
                  <ChipStatic key={s.id}>{s.label}</ChipStatic>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-card shadow-fm-sm p-5" data-reveal>
            <div className="flex items-center justify-between gap-2.5 mb-3.5">
              <h3 className="font-round font-extrabold text-coral-700 text-2xl">
                Toppings clásicos
              </h3>
              <Badge>+{formatPrecio(clasicos.costoExtra)} c/u</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {clasicos.opciones.map((t) => (
                <ChipStatic key={t.id}>{t.label}</ChipStatic>
              ))}
            </div>
          </div>

          <div
            className="rounded-card shadow-fm-sm p-5 bg-gradient-to-b from-white to-coral-tint"
            data-reveal
          >
            <div className="flex items-center justify-between gap-2.5 mb-3.5">
              <h3 className="font-round font-extrabold text-coral-700 text-2xl">
                Toppings premium
              </h3>
              <Badge>+{formatPrecio(premium.costoExtra)} c/u</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {premium.opciones.map((t) => (
                <ChipStatic key={t.id} prem>
                  {t.label}
                </ChipStatic>
              ))}
            </div>
          </div>
        </div>

        {/* Especiales */}
        <div className="mt-11" data-reveal>
          <h3 className="font-round font-extrabold text-coral-700 text-2xl mb-0.5">
            Otros antojos
          </h3>
          <p className="text-cacao-soft font-semibold mb-4">De la casa, para variar.</p>
          <div className="grid grid-cols-2 gap-3.5 min-[940px]:grid-cols-4">
            {ESPECIALES.map((p) => (
              <EspecialCard key={p.id} p={p} />
            ))}
          </div>
        </div>

        {/* Otros simples */}
        <div className="bg-white rounded-card shadow-fm-sm p-5.5 mt-5.5" data-reveal>
          <h3 className="font-round font-extrabold text-coral-700 text-2xl mb-3.5">
            Para acompañar
          </h3>
          <ul className="grid gap-3.5 list-none m-0 p-0">
            {OTROS.map((o, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr_auto] items-end gap-2">
                <span className="font-bold text-cacao leading-tight">{o.nombre}</span>
                <span className="border-b-2 border-dotted border-linea -translate-y-[5px] min-w-4" />
                <span className="font-round font-extrabold text-coral whitespace-nowrap">
                  {formatPrecio(o.precio)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
