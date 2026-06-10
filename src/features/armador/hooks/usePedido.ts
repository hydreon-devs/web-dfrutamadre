import { useRef, useState } from "react";
import type { ItemPedido, Seleccion } from "../../../domain/builder/types";
import { calcularPrecio } from "../../../domain/builder/pricing";
import { productoPorId } from "../../../domain/menu";

export function subtotalItem(item: ItemPedido): number {
  const producto = productoPorId(item.productoId);
  return producto ? calcularPrecio(producto, item.seleccion) : 0;
}

export function totalPedido(items: ItemPedido[]): number {
  return items.reduce((acc, item) => acc + subtotalItem(item), 0);
}

/** Estado del pedido: lista de ítems armados, con alta, edición y borrado. */
export function usePedido() {
  const [items, setItems] = useState<ItemPedido[]>([]);
  const idRef = useRef(1);

  const agregar = (productoId: string, seleccion: Seleccion) => {
    setItems((prev) => [...prev, { id: idRef.current++, productoId, seleccion }]);
  };

  const actualizar = (id: number, seleccion: Seleccion) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, seleccion } : it)));
  };

  const eliminar = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const vaciar = () => setItems([]);

  return { items, agregar, actualizar, eliminar, vaciar, total: totalPedido(items) };
}
