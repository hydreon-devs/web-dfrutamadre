import type { Producto } from "../builder/types";

/**
 * Duraznos con crema: paso 1 tamaño (define base), paso 2 topping
 * (single, 1 incluido sin costo, clásicos y premium fusionados
 * pero separados visualmente vía `grupo`).
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
        { id: "queso", label: "Queso", grupo: "Premium" },
        { id: "durazno", label: "Durazno", grupo: "Premium" },
        { id: "chocorramito", label: "Chocorramito", grupo: "Premium" },
        { id: "gansito", label: "Gansito", grupo: "Premium" },
        { id: "pinguino", label: "Pingüino", grupo: "Premium" },
        { id: "helado", label: "Helado", meta: "pregunta por el sabor", grupo: "Premium" },
        { id: "galleta-mantequilla", label: "Galleta de Mantequilla", grupo: "Clásicos" },
        { id: "galleta-waffer", label: "Galleta Waffer", grupo: "Clásicos" },
        { id: "masmelos", label: "Masmelos", grupo: "Clásicos" },
        { id: "mermelada-fresa", label: "Mermelada de Fresa", grupo: "Clásicos" },
        { id: "chispas-chocolate", label: "Chispitas de Chocolate", grupo: "Clásicos" },
        { id: "chispas-colores", label: "Chispitas de Colores", grupo: "Clásicos" },
        { id: "gelatina", label: "Gelatina", grupo: "Clásicos" },
        { id: "oreo", label: "Oreo", grupo: "Clásicos" },
        { id: "milo", label: "Milo", grupo: "Clásicos" },
        { id: "zucaritas", label: "Zucaritas", grupo: "Clásicos" },
        { id: "mani", label: "Maní", grupo: "Clásicos" },
        { id: "merenguitos", label: "Merenguitos", grupo: "Clásicos" },
      ],
    },
  ],
};