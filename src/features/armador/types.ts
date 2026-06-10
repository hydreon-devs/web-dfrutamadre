export type MetodoPago = "efectivo" | "transferencia";

export interface DatosEntrega {
  direccion: string;
  referencia: string;
  pago: MetodoPago;
  pagaCon: string;
}

export const ENTREGA_INICIAL: DatosEntrega = {
  direccion: "",
  referencia: "",
  pago: "efectivo",
  pagaCon: "",
};
