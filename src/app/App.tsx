import { useState } from "react";
import type { Producto, Seleccion } from "../domain/builder/types";
import { seleccionInicial } from "../domain/builder/validation";
import { productoPorId } from "../domain/menu";
import { Landing } from "../sections/Landing";
import { ProductBuilder } from "../features/armador/ProductBuilder";
import { ProductCatalog } from "../features/armador/ProductCatalog";
import { CartView } from "../features/armador/components/CartView";
import { DeliveryView } from "../features/armador/components/DeliveryView";
import { WhatsAppView } from "../features/armador/components/WhatsAppView";
import { usePedido } from "../features/armador/hooks/usePedido";
import { ENTREGA_INICIAL, type DatosEntrega } from "../features/armador/types";
import { formatPrecio } from "../shared/lib/format";
import { WhatsAppFab } from "../shared/ui";
import { JsonLd } from "./JsonLd";

type View = "landing" | "catalog" | "armador" | "cart" | "delivery" | "whatsapp";

export function App() {
  const [view, setView] = useState<View>("landing");
  /** Si se está editando un ítem configurable, su id; null = modo agregar. */
  const [editId, setEditId] = useState<number | null>(null);
  /** El producto que se está armando en el wizard. */
  const [wizardProducto, setWizardProducto] = useState<Producto | null>(null);
  /** Selección inicial del wizard al entrar desde el menú de la landing. */
  const [wizardInitial, setWizardInitial] = useState<Seleccion | null>(null);
  /** Desde dónde se abrió el wizard, para que "Volver" regrese ahí. */
  const [wizardOrigin, setWizardOrigin] = useState<"landing" | "catalog">("catalog");
  const [entrega, setEntrega] = useState<DatosEntrega>(ENTREGA_INICIAL);
  const pedido = usePedido();

  const go = (v: View) => {
    window.scrollTo(0, 0);
    setView(v);
  };

  /* ── Navegación principal ── */

  const openCatalog = () => {
    setEditId(null);
    go("catalog");
  };

  const startWizard = (producto: Producto) => {
    setWizardProducto(producto);
    setWizardInitial(null);
    setWizardOrigin("catalog");
    setEditId(null);
    go("armador");
  };

  /** Abre el wizard desde el menú de la landing, con opciones preseleccionadas (ej. tamaño). */
  const armarDesdeLanding = (productoId: string, preseleccion?: Record<string, string>) => {
    const producto = productoPorId(productoId);
    if (!producto) return;
    const inicial = seleccionInicial(producto);
    for (const [pasoId, opcionId] of Object.entries(preseleccion ?? {})) {
      inicial[pasoId] = [opcionId];
    }
    setWizardProducto(producto);
    setWizardInitial(inicial);
    setWizardOrigin("landing");
    setEditId(null);
    go("armador");
  };

  /** Suma 1 unidad de un producto directo desde la landing, sin salir de ella. */
  const agregarDirectoDesdeLanding = (productoId: string) => {
    const existente = pedido.items.find(
      (it) => it.tipo === "directo" && it.productoId === productoId,
    );
    if (existente?.tipo === "directo") {
      pedido.actualizarDirecto(existente.id, existente.cantidad + 1);
    } else {
      pedido.agregarDirecto(productoId, 1);
    }
  };

  const editItem = (id: number) => {
    setEditId(id);
    const item = pedido.items.find((it) => it.id === id);
    if (item?.tipo === "configurable") {
      const prod = productoPorId(item.productoId);
      if (prod) {
        setWizardProducto(prod);
        go("armador");
      }
    }
  };

  const submitArmador = (seleccion: Seleccion) => {
    if (editId != null) {
      pedido.actualizarConfigurable(editId, seleccion);
    } else if (wizardProducto) {
      pedido.agregarConfigurable(wizardProducto.id, seleccion);
    }
    setEditId(null);
    setWizardProducto(null);
    setWizardInitial(null);
    go("cart");
  };

  const armadorBack = () => {
    setEditId(null);
    setWizardProducto(null);
    setWizardInitial(null);
    if (wizardOrigin === "landing") setView("landing");
    else setView(pedido.items.length ? "cart" : "catalog");
  };

  const updateDirecto = (productoId: string, cantidad: number) => {
    // Si ya existe en el pedido, actualizarlo; si no, agregarlo
    const existente = pedido.items.find(
      (it) => it.tipo === "directo" && it.productoId === productoId,
    );
    if (existente) {
      pedido.actualizarDirecto(existente.id, cantidad);
    } else {
      pedido.agregarDirecto(productoId, cantidad);
    }
  };

  const finishPedido = () => {
    pedido.vaciar();
    setEntrega(ENTREGA_INICIAL);
    go("landing");
  };

  const itemEnEdicion =
    editId != null ? pedido.items.find((it) => it.id === editId) : undefined;

  /* ── Render ── */

  const renderView = () => {
    switch (view) {
      case "landing":
        return (
          <Landing
            onOpenArmador={openCatalog}
            onArmarProducto={armarDesdeLanding}
            onAgregarDirecto={agregarDirectoDesdeLanding}
          />
        );

      case "catalog":
        return (
          <ProductCatalog
            items={pedido.items}
            onStartWizard={startWizard}
            onUpdateDirecto={updateDirecto}
            onVerPedido={() => go("cart")}
            onBack={() => go("landing")}
          />
        );

      case "armador":
        return wizardProducto ? (
          <ProductBuilder
            producto={wizardProducto}
            initial={
              itemEnEdicion?.tipo === "configurable"
                ? itemEnEdicion.seleccion
                : wizardInitial ?? undefined
            }
            editMode={editId != null}
            onBack={armadorBack}
            onSubmit={submitArmador}
          />
        ) : null;

      case "cart":
        return (
          <CartView
            items={pedido.items}
            onEdit={editItem}
            onRemove={pedido.eliminar}
            onUpdateCantidad={(id, cantidad) => pedido.actualizarDirecto(id, cantidad)}
            onAddAnother={openCatalog}
            onCheckout={() => go("delivery")}
            onBack={() => go("catalog")}
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
      <JsonLd />
      <div key={view} className="view-fade-enter">
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
