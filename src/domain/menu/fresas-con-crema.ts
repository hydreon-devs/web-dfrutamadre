import type { Producto } from "../builder/types";

/**
 * Producto estrella. Cambiar un precio o un topping = editar este archivo,
 * sin tocar UI ni lógica.
 */
export const fresasConCrema: Producto = {
  id: "fresas-con-crema",
  nombre: "Fresas con crema",
  alias: "Fresas",
  descripcion: "Incluye 2 toppings clásicos y 1 premium. Suma los que quieras.",
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
        { id: "peq", label: "Pequeño", meta: "12 oz", precio: 15000 },
        { id: "med", label: "Mediano", meta: "16 oz", precio: 18000 },
        { id: "gra", label: "Grande", meta: "24 oz", precio: 25000 },
      ],
    },
    {
      id: "salsa",
      tipo: "single",
      titulo: "¿Con qué salsa?",
      subtitulo: "Elige una · sin costo",
      etiqueta: "Salsa",
      preseleccion: "lecherita",
      opciones: [
        { id: "lecherita", label: "Lecherita", meta: "Incluida" },
        { id: "arequipe", label: "Arequipe", meta: "Incluida" },
        { id: "chocolate", label: "Chocolate", meta: "Incluida" },
        { id: "sin-salsa", label: "Sin salsa" },
      ],
    },
    {
      id: "clasicos",
      tipo: "multi",
      titulo: "Toppings clásicos",
      subtitulo: "2 incluidos · cada extra +$3.000",
      etiqueta: "Clásicos",
      incluidos: 2,
      costoExtra: 3000,
      opciones: [
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
    {
      id: "premium",
      tipo: "multi",
      titulo: "Toppings premium",
      subtitulo: "1 incluido · cada extra +$3.500",
      etiqueta: "Premium",
      incluidos: 1,
      costoExtra: 3500,
      opciones: [
        { id: "queso", label: "Queso" },
        { id: "durazno", label: "Durazno" },
        { id: "chocorramito", label: "Chocorramito" },
        { id: "gansito", label: "Gansito" },
        { id: "pinguino", label: "Pingüino" },
        { id: "helado", label: "Helado", meta: "pregunta por el sabor" },
        { id: "porcion-fresa", label: "Porción de Fresa" },
      ],
    },
  ],
};
