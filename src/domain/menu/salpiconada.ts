import type { Producto } from "../builder/types";

/**
 * Salpiconada: un solo paso single con 4 variantes aplanadas,
 * cada una con su precio (define base).
 */
export const salpiconada: Producto = {
  id: "salpiconada",
  nombre: "Salpiconada",
  alias: "Salpiconada",
  pasos: [
    {
      id: "variante",
      tipo: "single",
      titulo: "¿Cómo la quieres?",
      subtitulo: "Elige una opción · todas 12 oz",
      etiqueta: "Variante",
      defineBase: true,
      preseleccion: "sencilla",
      opciones: [
        { id: "sencilla", label: "Sencilla", meta: "12 oz", precio: 8000 },
        { id: "con-queso", label: "Con queso", meta: "12 oz", precio: 12000 },
        { id: "con-helado", label: "Con helado", meta: "12 oz", precio: 12000 },
        { id: "queso-helado", label: "Queso + helado", meta: "12 oz", precio: 15000 },
      ],
    },
  ],
};