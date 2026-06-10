import type { Paso, Producto, Seleccion } from "./types";

/** Un paso está completo si cumple su regla: single → exactamente 1; multi → cualquier cantidad. */
export function pasoCompleto(paso: Paso, seleccion: Seleccion): boolean {
  const elegidas = seleccion[paso.id] ?? [];
  if (paso.tipo === "single") return elegidas.length === 1;
  return true;
}

/** Una selección es válida cuando todos los pasos del producto están completos. */
export function seleccionValida(producto: Producto, seleccion: Seleccion): boolean {
  return producto.pasos.every((paso) => pasoCompleto(paso, seleccion));
}

/** Selección inicial: vacía por paso, salvo preselecciones de pasos single. */
export function seleccionInicial(producto: Producto): Seleccion {
  return Object.fromEntries(
    producto.pasos.map((p) => [
      p.id,
      p.tipo === "single" && p.preseleccion ? [p.preseleccion] : [],
    ]),
  );
}
