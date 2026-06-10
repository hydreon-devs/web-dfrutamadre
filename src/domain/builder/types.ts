/**
 * Motor genérico de armado: un producto se describe como una serie de
 * pasos de selección con reglas de precio. La UI nunca tiene precios
 * escritos a mano; todo sale de estas estructuras.
 */

export interface Opcion {
  id: string;
  label: string;
  /** Detalle corto opcional, ej. "12 oz" */
  meta?: string;
  /** Precio que aporta la opción (solo en pasos `single` que definen base) */
  precio?: number;
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

export interface Producto {
  id: string;
  nombre: string;
  /** Nombre corto para resúmenes, ej. "Fresas" */
  alias?: string;
  pasos: Paso[];
}

/** ids elegidos por paso, en orden de selección (importa para incluidos/extras) */
export type Seleccion = Record<string, string[]>;

/** Un ítem ya armado dentro del pedido */
export interface ItemPedido {
  id: number;
  productoId: string;
  seleccion: Seleccion;
}
