import type { ItemPedido, Paso, Producto, Seleccion } from "./types";

/** Total de un ítem configurable (wizard) según el producto y la selección. Función pura. */
export function calcularPrecio(producto: Producto, seleccion: Seleccion): number {
  return producto.pasos.reduce((total, paso) => {
    const elegidas = seleccion[paso.id] ?? [];
    if (paso.tipo === "single") {
      const op = paso.opciones.find((o) => o.id === elegidas[0]);
      return total + (op?.precio ?? 0);
    }
    const extras = Math.max(0, elegidas.length - paso.incluidos);
    return total + extras * paso.costoExtra;
  }, 0);
}

/** Total de un ítem directo: precio × cantidad. */
export function calcularPrecioDirecto(precio: number, cantidad: number): number {
  return precio * cantidad;
}

/** Subtotal de un ítem (configurable o directo). Ya calculado, se guarda en el estado. */
export function subtotalItem(item: ItemPedido): number {
  return item.subtotal;
}

/** Total del pedido: suma de subtotales de todos los ítems. */
export function totalPedido(items: ItemPedido[]): number {
  return items.reduce((acc, item) => acc + item.subtotal, 0);
}

/** Cantidad de opciones extra (por encima de las incluidas) en un paso multi. */
export function extrasDePaso(paso: Paso, seleccion: Seleccion): number {
  if (paso.tipo !== "multi") return 0;
  const elegidas = seleccion[paso.id] ?? [];
  return Math.max(0, elegidas.length - paso.incluidos);
}

export interface DesglosePaso {
  paso: Paso;
  /** Labels de las opciones elegidas, en orden de selección */
  labels: string[];
  /** Aporte del paso al precio base (pasos single con precio) */
  base: number;
  /** Cantidad de extras (pasos multi) */
  extras: number;
  /** Costo total de los extras */
  costoExtras: number;
}

/**
 * Desglose por paso de una selección: qué se eligió y cuánto aporta.
 * Lo usan el resumen del carrito y el mensaje de WhatsApp.
 */
export function desglosarSeleccion(
  producto: Producto,
  seleccion: Seleccion,
): DesglosePaso[] {
  return producto.pasos.map((paso) => {
    const elegidas = seleccion[paso.id] ?? [];
    const labels = elegidas
      .map((id) => paso.opciones.find((o) => o.id === id)?.label)
      .filter((l): l is string => Boolean(l));

    if (paso.tipo === "single") {
      const op = paso.opciones.find((o) => o.id === elegidas[0]);
      return { paso, labels, base: op?.precio ?? 0, extras: 0, costoExtras: 0 };
    }
    const extras = Math.max(0, elegidas.length - paso.incluidos);
    return { paso, labels, base: 0, extras, costoExtras: extras * paso.costoExtra };
  });
}
