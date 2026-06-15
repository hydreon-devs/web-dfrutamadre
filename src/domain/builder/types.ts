/**
 * Motor genérico de armado: un producto se describe como una serie de
 * pasos de selección con reglas de precio. La UI nunca tiene precios
 * escritos a mano; todo sale de estas estructuras.
 */

/* ─────────────── Opciones y pasos ─────────────── */

export interface Opcion {
  id: string;
  label: string;
  /** Detalle corto opcional, ej. "12 oz" */
  meta?: string;
  /** Precio que aporta la opción (solo en pasos `single` que definen base) */
  precio?: number;
  /** Título de grupo: las opciones contiguas con el mismo valor se muestran bajo ese encabezado */
  grupo?: string;
}

interface PasoBase {
  id: string;
  titulo: string;
  subtitulo?: string;
  /** Nombre corto para resúmenes y el mensaje de WhatsApp, ej. "Salsa" */
  etiqueta: string;
  opciones: Opcion[];
}

/** Elige exactamente 1. Puede fijar el precio base (tamaño) o ser gratis (salsa). */
export interface PasoSingle extends PasoBase {
  tipo: "single";
  /** Este paso fija el precio base del producto */
  defineBase?: boolean;
  /** Opción marcada por defecto al iniciar el armado */
  preseleccion?: string;
}

/** Elige varios: N incluidos gratis y un costo por cada extra. */
export interface PasoMulti extends PasoBase {
  tipo: "multi";
  incluidos: number;
  costoExtra: number;
}

export type Paso = PasoSingle | PasoMulti;

/* ─────────────── Productos ─────────────── */

/** Producto configurable (wizard paso a paso): tamaños, toppings, etc. */
export interface Producto {
  id: string;
  nombre: string;
  /** Nombre corto para resúmenes, ej. "Fresas" */
  alias?: string;
  /** Descripción corta de lo que incluye, para el catálogo. */
  descripcion?: string;
  pasos: Paso[];
}

/** Producto directo: precio fijo, se agrega con cantidad. */
export interface ProductoDirecto {
  id: string;
  nombre: string;
  /** Nombre corto para resúmenes */
  alias?: string;
  precio: number;
}

export type ProductoArmador = Producto | ProductoDirecto;

/* ─────────────── Estado del pedido ─────────────── */

/** ids elegidos por paso, en orden de selección (importa para incluidos/extras) */
export type Seleccion = Record<string, string[]>;

/** Ítem configurable (wizard): tiene selección paso a paso. */
export interface ItemPedidoConfigurable {
  id: number;
  productoId: string;
  tipo: "configurable";
  seleccion: Seleccion;
  subtotal: number;
}

/** Ítem directo: precio fijo × cantidad. */
export interface ItemPedidoDirecto {
  id: number;
  productoId: string;
  tipo: "directo";
  cantidad: number;
  subtotal: number;
}

export type ItemPedido = ItemPedidoConfigurable | ItemPedidoDirecto;
