/**
 * Datos de marca y contenido de la landing. Texto y precios viven aquí,
 * nunca hardcodeados en la UI.
 */

export const BRAND = {
  nombre: "D'Fruta Madre",
  tagline: "Fresas con crema a domicilio en Girardota",
  instagram: "fresas.de.girardota",
  instagramUrl: "https://instagram.com/fresas.de.girardota",
  telefonoDisplay: "+57 300 841 53 68",
  telefonoIntl: "573234519204",
  horario: "Martes a Domingo · 2:00 – 8:00 PM",
  cobertura: "Cobertura solo en Girardota",
  direccion: "Calle 10 N18-5, Girardota",
} as const;

export interface PrecioEspecial {
  label: string;
  precio: number;
}

export interface Especial {
  id: string;
  nombre: string;
  desc: string;
  img: string;
  precios: PrecioEspecial[];
  tag?: string;
}

/** Otros antojos del menú (no entran al armador por ahora) */
export const ESPECIALES: Especial[] = [
  {
    id: "merengon",
    nombre: "Merengón D'Fruta Madre",
    desc: "Crema de la casa, fresa, durazno, mermelada de fresa y merengue.",
    img: "/assets/merengon.webp",
    precios: [{ label: "Porción", precio: 15000 }],
  },
  {
    id: "oblea",
    nombre: "Oblea pa' antojarse",
    desc: "Crema de la casa, arequipe, mermelada de fresa, queso, oblea + topping clásico.",
    img: "/assets/oblea.webp",
    precios: [
      { label: "Individual", precio: 8000 },
    ],
    tag: "Solo en punto físico",
  },
  {
    id: "salpiconada",
    nombre: "Salpiconada",
    desc: "Lecherita, jugo de frutas y una mezcla de piña, mango y papaya.",
    img: "/assets/cup-fresa-helado.webp",
    precios: [
      { label: "12 oz", precio: 8000 },
      { label: "16 oz", precio: 12000 },
    ],
  },
  {
    id: "duraznos",
    nombre: "Duraznos con crema",
    desc: "Duraznos en almíbar bañados en crema de la casa.",
    img: "/assets/cup-salpiconada.webp",
    precios: [
      { label: "16 oz", precio: 18000 },
      { label: "24 oz", precio: 22000 },
    ],
  },
];

export interface OtroProducto {
  nombre: string;
  precio: number;
}

export const OTROS: OtroProducto[] = [
  { nombre: "Chococono", precio: 4000 },
  { nombre: "Mermelada de Fresa · 24 oz", precio: 16000 },
  { nombre: "Vaso de Crema · 12 oz", precio: 15000 },
  { nombre: "Botella de Agua · 300 ml", precio: 1000 },
];

export interface Resena {
  nombre: string;
  meta: string;
  estrellas: number;
  texto: string;
}

/** Reseñas de ejemplo — reemplazar por reales */
export const RESENAS: Resena[] = [
  {
    nombre: "Laura M.",
    meta: "Barrio El Llano",
    estrellas: 5,
    texto:
      "Las mejores de Girardota 🍓 pedí las grandes con oreo y gansito y llegaron divinas. Súper cumplidos con el domicilio.",
  },
  {
    nombre: "Andrés P.",
    meta: "Cliente frecuente",
    estrellas: 5,
    texto: "El merengón es otro nivel. Ya es plan fijo de los domingos en familia.",
  },
  {
    nombre: "Daniela R.",
    meta: "Parque principal",
    estrellas: 5,
    texto:
      "Me encanta poder armarlas a mi gusto. La crema es bien casera, se nota el cariño.",
  },
];

export interface PasoComoPedir {
  n: string;
  titulo: string;
  desc: string;
}

export const PASOS_COMO_PEDIR: PasoComoPedir[] = [
  { n: "1", titulo: "Arma", desc: "Elige tamaño, salsa y tus toppings favoritos." },
  { n: "2", titulo: "Resumen", desc: "Revisa tu pedido y el total al instante." },
  { n: "3", titulo: "WhatsApp", desc: "Enviamos tu pedido listo para confirmar." },
  { n: "4", titulo: "Domicilio", desc: "Lo llevamos calientico... digo, bien frío, a tu casa." },
];
