import type { Producto } from "../builder/types";

/**
 * Duraznos con crema: paso 1 tamaño (define base), paso 2 topping
 * (single, 1 incluido sin costo, clásicos y premium fusionados).
 */
export const duraznosConCrema: Producto = {
  id: "duraznos-con-crema",
  nombre: "Duraznos con crema",
  alias: "Duraznos",
  pasos: [
    {
      id: "tamano",
      tipo: "single",
      titulo: "¿Qué tamaño?",
      subtitulo: "Elige uno · define el precio base",
      etiqueta: "Tamaño",
      defineBase: true,
      preseleccion: "med",
      opciones: [
        { id: "peq", label: "Pequeño", meta: "12 oz", precio: 18000 },
        { id: "med", label: "Mediano", meta: "16 oz", precio: 22000 },
        { id: "gra", label: "Grande", meta: "24 oz", precio: 28000 },
      ],
    },
    {
      id: "topping",
      tipo: "single",
      titulo: "¿Topping?",
      subtitulo: "Elige uno · incluido en el precio",
      etiqueta: "Topping",
      preseleccion: "queso",
      opciones: [
        { id: "queso", label: "Queso" },
        { id: "durazno", label: "Durazno" },
        { id: "chocorramito", label: "Chocorramito" },
        { id: "gansito", label: "Gansito" },
        { id: "pinguino", label: "Pingüino" },
        { id: "helado", label: "Helado", meta: "pregunta por el sabor" },
        { id: "galleta-mantequilla", label: "Galleta de Mantequilla" },
        { id: "galleta-waffer", label: "Galleta Waffer" },
        { id: "masmelos", label: "Masmelos" },
        { id: "mermelada-fresa", label: "Mermelada de Fresa" },
        { id: "chispas-chocolate", label: "Chispitas de Chocolate" },
        { id: "chispas-colores", label: "Chispitas de Colores" },
        { id: "gelatina", label: "Gelatina" },
        { id: "oreo", label: "Oreo" },
        { id: "milo", label: "Milo" },
        { id: "zucaritas", label: "Zucaritas" },
        { id: "mani", label: "Maní" },
        { id: "merenguitos", label: "Merenguitos" },
      ],
    },
  ],
};