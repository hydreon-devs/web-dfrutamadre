import { duraznosConCrema } from "./duraznos-con-crema";
import { fresasConCrema } from "./fresas-con-crema";
import { salpiconada } from "./salpiconada";
import type { Producto, ProductoArmador, ProductoDirecto } from "../builder/types";

export { duraznosConCrema, fresasConCrema, salpiconada };
export * from "./marca";

/* ─────────────── Registro de productos a domicilio ─────────────── */

/** Productos configurables (wizard paso a paso). */
export const PRODUCTOS_CONFIGURABLES: Producto[] = [
  fresasConCrema,
  duraznosConCrema,
  salpiconada,
];

/** Productos directos (precio fijo, se agregan con cantidad). */
export const PRODUCTOS_DIRECTOS: ProductoDirecto[] = [
  { id: "merengon", nombre: "Merengón D'Fruta Madre", alias: "Merengón", precio: 15000 },
  { id: "mermelada-fresa", nombre: "Mermelada de Fresa · 24 oz", alias: "Mermelada", precio: 16000 },
  { id: "vaso-crema", nombre: "Vaso de Crema · 12 oz", alias: "Vaso de Crema", precio: 15000 },
  { id: "chococono", nombre: "Chococono", alias: "Chococono", precio: 4000 },
  { id: "agua", nombre: "Botella de Agua · 300 ml", alias: "Agua", precio: 1000 },
];

/** Todos los productos disponibles a domicilio (configurables + directos). */
export const PRODUCTOS_ARMADOR: ProductoArmador[] = [
  ...PRODUCTOS_CONFIGURABLES,
  ...PRODUCTOS_DIRECTOS,
];

/** Busca un producto configurable por id. */
export function productoPorId(id: string): Producto | undefined {
  return PRODUCTOS_CONFIGURABLES.find((p) => p.id === id);
}

/** Busca un producto directo por id. */
export function productoDirectoPorId(id: string): ProductoDirecto | undefined {
  return PRODUCTOS_DIRECTOS.find((p) => p.id === id);
}

/** Busca cualquier producto (configurable o directo) por id. */
export function productoArmadorPorId(id: string): ProductoArmador | undefined {
  return PRODUCTOS_ARMADOR.find((p) => p.id === id);
}
