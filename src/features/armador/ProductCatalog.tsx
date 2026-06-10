import type { ItemPedido, Producto, ProductoDirecto } from "../../domain/builder/types";
import { PRODUCTOS_CONFIGURABLES, PRODUCTOS_DIRECTOS } from "../../domain/menu";
import { formatPrecio } from "../../shared/lib/format";
import { Button, IconArrow, Logo } from "../../shared/ui";
import { QuantityStepper } from "./components/QuantityStepper";

/* ─────────────── Assets ─────────────── */

const IMG_PRODUCTO: Record<string, string> = {
  "fresas-con-crema": "/assets/cup-fresas-con-crema.webp",
  "duraznos-con-crema": "/assets/cup-duraznos.webp",
  "salpiconada": "/assets/cup-salpiconada.webp",
  "merengon": "/assets/merengon.webp",
  "mermelada-fresa": "/assets/mascot-fresa.webp",
  "vaso-crema": "/assets/mascot-fresa.webp",
  "chococono": "/assets/mascot-fresa.webp",
  "agua": "/assets/mascot-fresa.webp",
};

function productoImg(id: string): string {
  return IMG_PRODUCTO[id] ?? "/assets/mascot-fresa.webp";
}

/* ─────────────── Tipos de las props ─────────────── */

interface ProductCatalogProps {
  /** Ítems ya en el pedido (para calcular cantidades previas). */
  items: ItemPedido[];
  onStartWizard: (producto: Producto) => void;
  onUpdateDirecto: (productoId: string, cantidad: number) => void;
  onVerPedido: () => void;
  onBack: () => void;
}

/* ─────────────── helpers ─────────────── */

function cantidadEnPedido(items: ItemPedido[], productoId: string): number {
  const directo = items.find((it) => it.tipo === "directo" && it.productoId === productoId);
  return directo?.tipo === "directo" ? directo.cantidad : 0;
}

/* ─────────────── Producto configurable ─────────────── */

interface ConfigurableRowProps {
  producto: Producto;
  onArmar: () => void;
}

function ConfigurableRow({ producto, onArmar }: ConfigurableRowProps) {
  const pasoBase = producto.pasos.find((p) => p.tipo === "single" && p.defineBase);
  const precioMin = pasoBase?.opciones.reduce((min, o) => Math.min(min, o.precio ?? 0), Infinity) ?? 0;

  return (
    <article className="flex gap-3.5 bg-white rounded-card shadow-fm-sm p-3.5">
      <div className="grid place-items-center w-24 h-24 flex-none bg-blush rounded-media overflow-hidden">
        <img
          src={productoImg(producto.id)}
          alt=""
          className="w-[82%] h-[82%] object-contain drop-shadow-[0_6px_10px_rgb(200_70_95/0.18)]"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="font-round font-extrabold text-cacao text-[1.05rem] leading-tight">
            {producto.nombre}
          </h3>
          <p className="text-[.85rem] text-cacao-soft font-bold">Desde {formatPrecio(precioMin)}</p>
        </div>
        <Button size="sm" onClick={onArmar} className="self-start mt-2">
          Armar <IconArrow />
        </Button>
      </div>
    </article>
  );
}

/* ─────────────── Producto directo ─────────────── */

interface DirectoRowProps {
  producto: ProductoDirecto;
  cantidad: number;
  onChange: (cantidad: number) => void;
}

function DirectoRow({ producto, cantidad, onChange }: DirectoRowProps) {
  const subtotal = producto.precio * cantidad;
  return (
    <article className="flex gap-3.5 bg-white rounded-card shadow-fm-sm p-3.5">
      <div className="grid place-items-center w-24 h-24 flex-none bg-blush rounded-media overflow-hidden">
        <img
          src={productoImg(producto.id)}
          alt=""
          className="w-[82%] h-[82%] object-contain drop-shadow-[0_6px_10px_rgb(200_70_95/0.18)]"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="font-round font-extrabold text-cacao text-[1.05rem] leading-tight">
            {producto.nombre}
          </h3>
          <p className="text-[.85rem] text-cacao-soft font-bold">{formatPrecio(producto.precio)} c/u</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <QuantityStepper cantidad={Math.max(1, cantidad)} onChange={onChange} />
          {cantidad > 0 && (
            <span className="font-round font-extrabold text-coral text-[1.05rem]">
              {formatPrecio(subtotal)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─────────────── Catálogo completo ─────────────── */

export function ProductCatalog({
  items,
  onStartWizard,
  onUpdateDirecto,
  onVerPedido,
  onBack,
}: ProductCatalogProps) {
  const itemCount = items.length;
  const total = items.reduce((acc, it) => acc + it.subtotal, 0);

  return (
    <div className="min-h-dvh bg-crema pb-28">
      <header className="sticky top-0 z-40 bg-crema/90 backdrop-blur-md shadow-[0_4px_18px_rgb(200_70_95/0.08)]">
        <div className="container-fm flex items-center justify-between gap-3 py-2.5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 bg-white border-2 border-linea text-coral-700 font-round font-bold px-3.5 py-2 rounded-full transition-all hover:bg-coral-tint hover:-translate-x-0.5"
          >
            ← <span>Volver</span>
          </button>
          <span className="font-round font-extrabold text-cacao">Arma tu pedido</span>
          <Logo size={0.72} />
        </div>
      </header>

      <main className="container-fm max-w-[640px] pt-5">
        {/* Configurables */}
        <section className="mb-7">
          <h2 className="font-round font-extrabold text-coral-700 text-[1.15rem] mb-3">
            Armalos a tu gusto
          </h2>
          <div className="grid gap-3.5">
            {PRODUCTOS_CONFIGURABLES.map((producto) => (
              <ConfigurableRow
                key={producto.id}
                producto={producto}
                onArmar={() => onStartWizard(producto)}
              />
            ))}
          </div>
        </section>

        {/* Directos */}
        <section className="mb-7">
          <h2 className="font-round font-extrabold text-coral-700 text-[1.15rem] mb-3">
            Otros antojos
          </h2>
          <div className="grid gap-3.5">
            {PRODUCTOS_DIRECTOS.map((producto) => {
              const cantidad = cantidadEnPedido(items, producto.id);
              return (
                <DirectoRow
                  key={producto.id}
                  producto={producto}
                  cantidad={cantidad}
                  onChange={(nueva) => onUpdateDirecto(producto.id, nueva)}
                />
              );
            })}
          </div>
        </section>
      </main>

      {/* Carrito flotante */}
      {itemCount > 0 && (
        <button
          type="button"
          onClick={onVerPedido}
          className="fixed left-4 bottom-4 z-60 inline-flex items-center gap-2 bg-coral text-white font-round font-extrabold text-[1.05rem] px-4.5 py-3.5 rounded-full shadow-fm-md transition-all hover:-translate-y-0.5 hover:brightness-105"
        >
          🛒 Tu pedido ({itemCount}) · {formatPrecio(total)}
        </button>
      )}
    </div>
  );
}