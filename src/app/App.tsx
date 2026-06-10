import { useState } from "react";
import type { Seleccion } from "../domain/builder/types";
import { fresasConCrema } from "../domain/menu";
import { Landing } from "../sections/Landing";
import { ProductBuilder } from "../features/armador/ProductBuilder";
import { CartView } from "../features/armador/components/CartView";
import { DeliveryView } from "../features/armador/components/DeliveryView";
import { WhatsAppView } from "../features/armador/components/WhatsAppView";
import { usePedido } from "../features/armador/hooks/usePedido";
import { ENTREGA_INICIAL, type DatosEntrega } from "../features/armador/types";
import { formatPrecio } from "../shared/lib/format";
import { WhatsAppFab } from "../shared/ui";

type View = "landing" | "armador" | "cart" | "delivery" | "whatsapp";

export function App() {
  const [view, setView] = useState<View>("landing");
  const [editId, setEditId] = useState<number | null>(null);
  const [entrega, setEntrega] = useState<DatosEntrega>(ENTREGA_INICIAL);
  const pedido = usePedido();

  const go = (v: View) => {
    window.scrollTo(0, 0);
    setView(v);
  };

  const openArmador = () => {
    setEditId(null);
    go("armador");
  };

  const editItem = (id: number) => {
    setEditId(id);
    go("armador");
  };

  const submitArmador = (seleccion: Seleccion) => {
    if (editId != null) pedido.actualizar(editId, seleccion);
    else pedido.agregar(fresasConCrema.id, seleccion);
    setEditId(null);
    go("cart");
  };

  const armadorBack = () => {
    setEditId(null);
    setView(pedido.items.length ? "cart" : "landing");
  };

  const finishPedido = () => {
    pedido.vaciar();
    setEntrega(ENTREGA_INICIAL);
    go("landing");
  };

  const itemEnEdicion = editId != null ? pedido.items.find((it) => it.id === editId) : undefined;

  const renderView = () => {
    switch (view) {
      case "landing":
        return <Landing onOpenArmador={openArmador} />;
      case "armador":
        return (
          <ProductBuilder
            producto={fresasConCrema}
            initial={itemEnEdicion?.seleccion}
            editMode={editId != null}
            onBack={armadorBack}
            onSubmit={submitArmador}
          />
        );
      case "cart":
        return (
          <CartView
            items={pedido.items}
            onEdit={editItem}
            onRemove={pedido.eliminar}
            onAddAnother={openArmador}
            onCheckout={() => go("delivery")}
            onBack={() => setView("landing")}
          />
        );
      case "delivery":
        return (
          <DeliveryView
            items={pedido.items}
            entrega={entrega}
            setEntrega={(fn) => setEntrega(fn)}
            onBack={() => go("cart")}
            onSubmit={() => go("whatsapp")}
          />
        );
      case "whatsapp":
        return (
          <WhatsAppView
            items={pedido.items}
            entrega={entrega}
            onBack={() => go("delivery")}
            onSent={finishPedido}
          />
        );
    }
  };

  return (
    <>
      <div key={view + (editId == null ? "" : `-e${editId}`)} className="view-fade-enter">
        {renderView()}
      </div>
      {view === "landing" && <WhatsAppFab />}
      {view === "landing" && pedido.items.length > 0 && (
        <button
          type="button"
          onClick={() => go("cart")}
          className="fixed left-4 bottom-4 z-60 inline-flex items-center gap-2 bg-coral text-white font-round font-extrabold text-[1.05rem] px-4.5 py-3.5 rounded-full shadow-fm-md transition-all hover:-translate-y-0.5 hover:brightness-105"
          aria-label="Ver tu pedido"
        >
          <span aria-hidden="true">🛒</span>
          <span>
            Tu pedido ({pedido.items.length}) · {formatPrecio(pedido.total)}
          </span>
        </button>
      )}
    </>
  );
}
