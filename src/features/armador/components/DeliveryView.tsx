import { useRef, useState } from "react";
import type { ItemPedido } from "../../../domain/builder/types";
import { totalPedido } from "../../../domain/builder/pricing";
import { formatPrecio } from "../../../shared/lib/format";
import { cn } from "../../../shared/lib/cn";
import { Button, IconArrow } from "../../../shared/ui";
import type { DatosEntrega, MetodoPago } from "../types";
import { CheckoutShell } from "./CheckoutShell";

interface DeliveryViewProps {
  items: ItemPedido[];
  entrega: DatosEntrega;
  setEntrega: (fn: (d: DatosEntrega) => DatosEntrega) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const PAGOS: { id: MetodoPago; nombre: string; icono: string }[] = [
  { id: "transferencia", nombre: "Transferencia", icono: "📲" },
  { id: "efectivo", nombre: "Efectivo", icono: "💵" },
  { id: "recoger-en-tienda", nombre: "Recoger en tienda", icono: "🏪" },
];

export function DeliveryView({ items, entrega, setEntrega, onBack, onSubmit }: DeliveryViewProps) {
  const total = totalPedido(items);
  const [touchedAddr, setTouchedAddr] = useState(false);
  const [touchedNombre, setTouchedNombre] = useState(false);
  const addrRef = useRef<HTMLTextAreaElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const recogeEnTienda = entrega.pago === "recoger-en-tienda";
  const addrError = touchedAddr && !recogeEnTienda && !entrega.direccion.trim();
  const nombreError = touchedNombre && recogeEnTienda && !entrega.nombreRecoge.trim();

  const set = <K extends keyof DatosEntrega>(k: K, v: DatosEntrega[K]) =>
    setEntrega((d) => ({ ...d, [k]: v }));

  const submit = () => {
    if (recogeEnTienda) {
      if (!entrega.nombreRecoge.trim()) {
        setTouchedNombre(true);
        nombreRef.current?.focus();
        return;
      }
    } else if (!entrega.direccion.trim()) {
      setTouchedAddr(true);
      addrRef.current?.focus();
      return;
    }
    onSubmit();
  };

  const inputClasses =
    "w-full font-body text-base text-cacao bg-white border-2 border-linea rounded-media px-4 py-3.5 transition-all placeholder:text-[#c8a9af] focus:outline-none focus:border-coral focus:shadow-[0_0_0_4px_var(--color-coral-tint)]";

  return (
    <CheckoutShell
      titulo="Datos de entrega"
      onBack={onBack}
      bar={
        <>
          <div className="flex flex-col">
            <span className="text-[.82rem] text-cacao-soft font-bold">Total</span>
            <span className="font-round font-extrabold text-[1.45rem] text-coral leading-none">
              {formatPrecio(total)}
            </span>
          </div>
          <Button onClick={submit}>
            Finalizar pedido <IconArrow />
          </Button>
        </>
      }
    >
      <p className="mb-5 text-cacao">
        Solo nos falta dónde llevarlas. <b>No pedimos tu teléfono</b> — WhatsApp ya te lleva al chat. 🛵
      </p>

      <div className="mb-4">
        <span className="block font-round font-bold text-[.92rem] text-coral-700 mb-1.5">
          Método de pago
        </span>
        <div className="grid grid-cols-1 gap-2.5 min-[560px]:grid-cols-3">
          {PAGOS.map((p) => {
            const on = entrega.pago === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => set("pago", p.id)}
                className={cn(
                  "flex items-center gap-2.5 bg-white border-[2.5px] border-linea rounded-media px-4 py-3.5 transition-all hover:border-rosa",
                  on && "border-coral bg-coral-tint shadow-fm-sm",
                )}
              >
                <span className="text-xl" aria-hidden="true">
                  {p.icono}
                </span>
                <span className="font-round font-extrabold text-cacao text-left leading-tight">
                  {p.nombre}
                </span>
                <span
                  className={cn(
                    "ml-auto grid place-items-center w-5 h-5 flex-none rounded-full border-[2.5px] border-linea bg-white",
                    on && "border-coral",
                  )}
                  aria-hidden="true"
                >
                  <span className={cn("w-2 h-2 rounded-full", on && "bg-coral")} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {!recogeEnTienda && (
        <>
          <label className="block mb-4">
            <span className="block font-round font-bold text-[.92rem] text-coral-700 mb-1.5">
              Dirección{" "}
              <em className="not-italic font-bold text-[.78rem] text-white bg-coral rounded-full px-2 py-0.5">
                obligatorio
              </em>
            </span>
            <textarea
              ref={addrRef}
              className={cn(inputClasses, "resize-y min-h-24", addrError && "border-coral-700")}
              value={entrega.direccion}
              onChange={(e) => set("direccion", e.target.value)}
              onBlur={() => setTouchedAddr(true)}
              placeholder="Calle / carrera, número, barrio, casa o apto…"
            />
            {addrError && (
              <span className="block mt-1 text-[.85rem] font-bold text-coral-700">
                Necesitamos la dirección para el domicilio.
              </span>
            )}
          </label>

          <label className="block mb-4">
            <span className="block font-round font-bold text-[.92rem] text-coral-700 mb-1.5">
              Punto de referencia
            </span>
            <input
              className={inputClasses}
              value={entrega.referencia}
              onChange={(e) => set("referencia", e.target.value)}
              placeholder="Ej: portón verde, frente a la tienda…"
            />
          </label>
        </>
      )}

      {entrega.pago === "efectivo" && (
        <label className="block mb-4">
          <span className="block font-round font-bold text-[.92rem] text-coral-700 mb-1.5">
            ¿Con cuánto pagas?{" "}
            <em className="not-italic font-bold text-[.78rem] text-verde-700 bg-verde-tint rounded-full px-2 py-0.5">
              opcional
            </em>
          </span>
          <input
            className={inputClasses}
            inputMode="numeric"
            value={entrega.pagaCon}
            onChange={(e) => set("pagaCon", e.target.value)}
            placeholder="Ej: 50.000 — para llevar el cambio"
          />
        </label>
      )}

{entrega.pago === "recoger-en-tienda" && (
        <label className="block mb-4">
          <span className="block font-round font-bold text-[.92rem] text-coral-700 mb-1.5">
            Nombre de quien recoge el pedido{" "}
            <em className="not-italic font-bold text-[.78rem] text-white bg-coral rounded-full px-2 py-0.5">
              obligatorio
            </em>
          </span>
          <input
            ref={nombreRef}
            className={cn(inputClasses, nombreError && "border-coral-700")}
            value={entrega.nombreRecoge}
            onChange={(e) => set("nombreRecoge", e.target.value)}
            onBlur={() => setTouchedNombre(true)}
            placeholder="Ej: Juan Pérez"
          />
          {nombreError && (
            <span className="block mt-1 text-[.85rem] font-bold text-coral-700">
              Necesitamos saber quién recoge el pedido.
            </span>
          )}
        </label>
      )}

      <div className="bg-white rounded-media border-2 border-linea px-4 py-3.5 mt-6">
        <div className="flex items-center justify-between">
          <span className="font-round font-bold text-cacao-soft">
            {recogeEnTienda ? "Total a pagar" : "El valor total es sin domicilio"}
          </span>
          <span className="font-round font-extrabold text-[1.3rem] text-coral">
            {formatPrecio(total)}
          </span>
        </div>
        {!recogeEnTienda && (
          <p className="mt-1 text-[.8rem] text-cacao-soft">
            El costo del domicilio varía según tu ubicación.
          </p>
        )}
      </div>
    </CheckoutShell>
  );
}
