import type { ItemPedido } from "../../../domain/builder/types";
import { desglosarSeleccion } from "../../../domain/builder/pricing";
import { productoPorId } from "../../../domain/menu";
import { formatPrecio } from "../../../shared/lib/format";
import { Badge, Button, IconArrow, IconCart, IconEdit, IconPlus, IconTrash } from "../../../shared/ui";
import { subtotalItem, totalPedido } from "../hooks/usePedido";
import { CheckoutShell } from "./CheckoutShell";

interface CartViewProps {
  items: ItemPedido[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onAddAnother: () => void;
  onCheckout: () => void;
  onBack: () => void;
}

export function CartView({ items, onEdit, onRemove, onAddAnother, onCheckout, onBack }: CartViewProps) {
  const total = totalPedido(items);

  return (
    <CheckoutShell
      titulo="Tu pedido"
      onBack={onBack}
      bar={
        items.length > 0 ? (
          <>
            <div className="flex flex-col">
              <span className="text-[.82rem] text-cacao-soft font-bold">Total</span>
              <span className="font-round font-extrabold text-[1.45rem] text-coral leading-none">
                {formatPrecio(total)}
              </span>
            </div>
            <Button onClick={onCheckout}>
              Agregar dirección <IconArrow />
            </Button>
          </>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <div className="text-center pt-10">
          <img src="/assets/mascot-fresa.webp" alt="" className="w-32 mx-auto mb-4" />
          <h2 className="font-round font-extrabold text-coral-700 text-2xl mb-1">
            Tu pedido está vacío
          </h2>
          <p className="text-cacao-soft mb-6">Arma tu primera fresa con crema y aparecerá aquí.</p>
          <Button onClick={onAddAnother}>
            Arma tus fresas <IconArrow />
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Badge variant="green">
              <IconCart /> {items.length} {items.length === 1 ? "fresa armada" : "fresas armadas"}
            </Badge>
          </div>

          <div className="grid gap-3.5">
            {items.map((item, i) => {
              const producto = productoPorId(item.productoId);
              if (!producto) return null;
              const desglose = desglosarSeleccion(producto, item.seleccion);
              const base = desglose.find((d) => d.paso.tipo === "single" && d.paso.defineBase);
              const baseOp = base?.paso.opciones.find(
                (o) => o.id === item.seleccion[base.paso.id]?.[0],
              );

              return (
                <article key={item.id} className="flex gap-3.5 bg-white rounded-card shadow-fm-sm p-3.5">
                  <div className="grid place-items-center w-24 h-24 flex-none bg-blush rounded-media overflow-hidden">
                    <img
                      src="/assets/cup-fresa-helado.webp"
                      alt=""
                      className="w-[82%] h-[82%] object-contain drop-shadow-[0_6px_10px_rgb(200_70_95/0.18)]"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-round font-extrabold text-cacao text-[1.1rem]">
                        {producto.alias ?? producto.nombre} #{i + 1}
                      </h3>
                      <span className="font-round font-extrabold text-coral whitespace-nowrap">
                        {formatPrecio(subtotalItem(item))}
                      </span>
                    </div>
                    {baseOp && (
                      <p className="text-[.9rem] text-cacao-soft font-bold mb-1.5">
                        {baseOp.label}
                        {baseOp.meta ? ` · ${baseOp.meta}` : ""}
                      </p>
                    )}

                    <dl className="grid gap-0.5 text-[.9rem]">
                      {desglose
                        .filter((d) => !(d.paso.tipo === "single" && d.paso.defineBase))
                        .map((d) => (
                          <div key={d.paso.id} className="flex gap-1.5">
                            <dt className="font-bold text-cacao-soft flex-none">{d.paso.etiqueta}:</dt>
                            <dd className="text-cacao">
                              {d.labels.length ? d.labels.join(", ") : "—"}
                              {d.extras > 0 && (
                                <em className="not-italic text-coral-700 font-bold">
                                  {" "}
                                  +{formatPrecio(d.costoExtras)}
                                </em>
                              )}
                            </dd>
                          </div>
                        ))}
                    </dl>

                    <div className="flex gap-2 mt-2.5">
                      <button
                        type="button"
                        onClick={() => onEdit(item.id)}
                        className="inline-flex items-center gap-1.5 font-round font-bold text-[.88rem] text-coral-700 bg-coral-tint px-3 py-1.5 rounded-full transition-colors hover:bg-rosa-soft"
                      >
                        <IconEdit /> Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="inline-flex items-center gap-1.5 font-round font-bold text-[.88rem] text-cacao-soft bg-blush px-3 py-1.5 rounded-full transition-colors hover:bg-rosa-soft hover:text-coral-700"
                      >
                        <IconTrash /> Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t-2 border-dashed border-linea mt-5 pt-4">
            <span className="font-round font-extrabold text-[1.15rem] text-cacao">
              Total del pedido
            </span>
            <span className="font-round font-extrabold text-[1.7rem] text-coral">
              {formatPrecio(total)}
            </span>
          </div>

          <Button variant="secondary" block onClick={onAddAnother} className="mt-4">
            <IconPlus /> Armar otra fresa
          </Button>
        </>
      )}
    </CheckoutShell>
  );
}
