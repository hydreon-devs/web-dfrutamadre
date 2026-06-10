/**
 * Adaptador de salida hacia WhatsApp: convierte el pedido en un mensaje
 * de texto compacto y arma el enlace wa.me. El canal es infraestructura,
 * no dominio: si mañana cambia, solo se toca este archivo.
 */
import type { ItemPedido } from "../../domain/builder/types";
import { desglosarSeleccion } from "../../domain/builder/pricing";
import { BRAND, productoPorId } from "../../domain/menu";
import { formatPrecio } from "../../shared/lib/format";
import { buildWaUrl } from "../../shared/lib/whatsapp";
import { subtotalItem, totalPedido } from "./hooks/usePedido";
import type { DatosEntrega } from "./types";

export function buildOrderMessage(items: ItemPedido[], entrega: DatosEntrega): string {
  const L: string[] = [];
  L.push("¡Hola D'Fruta Madre! 🍓 Quiero hacer este pedido:");
  L.push("");

  items.forEach((item, i) => {
    const producto = productoPorId(item.productoId);
    if (!producto) return;
    const desglose = desglosarSeleccion(producto, item.seleccion);
    const base = desglose.find((d) => d.paso.tipo === "single" && d.paso.defineBase);
    const baseOp = base?.paso.opciones.find((o) => o.id === item.seleccion[base.paso.id]?.[0]);

    const titulo = baseOp
      ? `${producto.alias ?? producto.nombre} #${i + 1} — ${baseOp.label}${baseOp.meta ? ` (${baseOp.meta})` : ""}`
      : `${producto.alias ?? producto.nombre} #${i + 1}`;
    L.push(`🍓 ${titulo}`);

    desglose.forEach((d) => {
      if (d.paso.tipo === "single" && d.paso.defineBase) return;
      if (d.labels.length === 0) return;
      const extras =
        d.extras > 0 ? `  (${d.extras} extra${d.extras > 1 ? "s" : ""} +${formatPrecio(d.costoExtras)})` : "";
      L.push(`   ${d.paso.etiqueta}: ${d.labels.join(", ")}${extras}`);
    });

    L.push(`   Subtotal: ${formatPrecio(subtotalItem(item))}`);
    L.push("");
  });

  L.push(`💰 TOTAL: ${formatPrecio(totalPedido(items))}`);
  L.push("");
  L.push(`📍 Dirección: ${entrega.direccion.trim() || "—"}`);
  if (entrega.referencia.trim()) L.push(`🗺️ Referencia: ${entrega.referencia.trim()}`);

  let pagoLine = `💵 Pago: ${entrega.pago === "transferencia" ? "Transferencia" : entrega.pago === "recoger-en-tienda" ? "Recoger en tienda" : "Efectivo"}`;
  if (entrega.pago === "efectivo" && entrega.pagaCon.trim()) {
    const monto = Number(entrega.pagaCon.replace(/\D/g, "")) || 0;
    if (monto > 0) pagoLine += ` — Pago con: ${formatPrecio(monto)}`;
  }
  if (entrega.pago === "recoger-en-tienda" && entrega.nombreRecoge.trim()) {
    pagoLine += ` — El pedido es recogido por: ${entrega.nombreRecoge.trim()}`;
  }
  L.push(pagoLine);
  L.push("");

  return L.join("\n");
}

export function waUrlPedido(items: ItemPedido[], entrega: DatosEntrega): string {
  return buildWaUrl(BRAND.telefonoIntl, buildOrderMessage(items, entrega));
}
