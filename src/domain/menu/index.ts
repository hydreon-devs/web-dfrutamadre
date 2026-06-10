import { fresasConCrema } from "./fresas-con-crema";
import type { Producto } from "../builder/types";

export { fresasConCrema };
export * from "./marca";

/** Registro de productos disponibles en el armador. Agregar uno = agregar su config aquí. */
export const PRODUCTOS_ARMADOR: Producto[] = [fresasConCrema];

export function productoPorId(id: string): Producto | undefined {
  return PRODUCTOS_ARMADOR.find((p) => p.id === id);
}
