export type MetodoPago = "efectivo" | "transferencia" | "recoger-en-tienda";

export interface DatosEntrega {
  direccion: string;
  referencia: string;
  pago: MetodoPago;
  pagaCon: string;
  nombreRecoge: string;
}

export const ENTREGA_INICIAL: DatosEntrega = {
  direccion: "",
  referencia: "",
  pago: "transferencia",
  pagaCon: "",
  nombreRecoge: "",
};
