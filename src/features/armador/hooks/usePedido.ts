import { useRef, useState } from "react";
import type { ItemPedido, ItemPedidoConfigurable, ItemPedidoDirecto, Seleccion } from "../../../domain/builder/types";
import { calcularPrecio, calcularPrecioDirecto, totalPedido } from "../../../domain/builder/pricing";
import { productoPorId, productoDirectoPorId } from "../../../domain/menu";

export { totalPedido, type ItemPedido };

/** Estado del pedido: lista de ítems heterogéneos (configurables + directos), con alta, edición y borrado. */
export function usePedido() {
  const [items, setItems] = useState<ItemPedido[]>([]);
  const idRef = useRef(1);

  /** Agrega un ítem configurable (wizard completado). */
  const agregarConfigurable = (productoId: string, seleccion: Seleccion) => {
    const producto = productoPorId(productoId);
    if (!producto) return;
    const subtotal = calcularPrecio(producto, seleccion);
    const item: ItemPedidoConfigurable = {
      id: idRef.current++,
      productoId,
      tipo: "configurable",
      seleccion,
      subtotal,
    };
    setItems((prev) => [...prev, item]);
  };

  /** Agrega o incrementa un ítem directo. Si ya existe, incrementa su cantidad. */
  const agregarDirecto = (productoId: string, cantidad: number) => {
    const producto = productoDirectoPorId(productoId);
    if (!producto || cantidad <= 0) return;
    const subtotal = calcularPrecioDirecto(producto.precio, cantidad);

    setItems((prev) => {
      const existente = prev.find((it) => it.tipo === "directo" && it.productoId === productoId);
      if (existente) {
        return prev.map((it) =>
          it.tipo === "directo" && it.productoId === productoId
            ? { ...it, cantidad: it.cantidad + cantidad, subtotal: it.subtotal + subtotal }
            : it,
        );
      }
      const item: ItemPedidoDirecto = {
        id: idRef.current++,
        productoId,
        tipo: "directo",
        cantidad,
        subtotal,
      };
      return [...prev, item];
    });
  };

  /** Actualiza un ítem configurable existente. */
  const actualizarConfigurable = (id: number, seleccion: Seleccion) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id || it.tipo !== "configurable") return it;
        const producto = productoPorId(it.productoId);
        if (!producto) return it;
        return { ...it, seleccion, subtotal: calcularPrecio(producto, seleccion) };
      }),
    );
  };

  /** Actualiza la cantidad de un ítem directo (reemplaza, no suma). */
  const actualizarDirecto = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminar(id);
      return;
    }
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id || it.tipo !== "directo") return it;
        const producto = productoDirectoPorId(it.productoId);
        if (!producto) return it;
        return { ...it, cantidad, subtotal: calcularPrecioDirecto(producto.precio, cantidad) };
      }),
    );
  };

  /** Elimina cualquier ítem por id. */
  const eliminar = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  /** Limpia el pedido completo. */
  const vaciar = () => setItems([]);

  return {
    items,
    agregarConfigurable,
    agregarDirecto,
    actualizarConfigurable,
    actualizarDirecto,
    eliminar,
    vaciar,
    total: totalPedido(items),
  };
}
