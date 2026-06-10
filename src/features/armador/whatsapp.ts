/**
 * Adaptador de salida hacia WhatsApp: convierte el pedido en un mensaje
 * de texto compacto y arma el enlace wa.me. El canal es infraestructura,
 * no dominio: si mañana cambia, solo se toca este archivo.
 */
import type { ItemPedido, ItemPedidoConfigurable, ItemPedidoDirecto } from "../../domain/builder/types";
import { desglosarSeleccion } from "../../domain/builder/pricing";
import { BRAND, productoDirectoPorId, productoPorId } from "../../domain/menu";
import { formatPrecio } from "../../shared/lib/format";
import { buildWaUrl } from "../../shared/lib/whatsapp";
import type { DatosEntrega } from "./types";

function buildItemConfigurable(item: ItemPedidoConfigurable, index: number): string[] {
  const L: string[] = [];
  const producto = productoPorId(item.productoId);
  if (!producto) return L;

  const desglose = desglosarSeleccion(producto, item.seleccion);
  const base = desglose.find((d) => d.paso.tipo === "single" && d.paso.defineBase);
  const baseOp = base?.paso.opciones.find((o) => o.id === item.seleccion[base.paso.id]?.[0]);

  const titulo = baseOp
    ? `${producto.alias ?? producto.nombre} #${index + 1} — ${baseOp.label}${baseOp.meta ? ` (${baseOp.meta})` : ""}`
    : `${producto.alias ?? producto.nombre} #${index + 1}`;

  L.push(`🍓 ${titulo}`);

  desglose.forEach((d) => {
    if (d.paso.tipo === "single" && d.paso.defineBase) return;
    if (d.labels.length === 0) return;
    const extras =
      d.extras > 0 ? `  (${d.extras} extra${d.extras > 1 ? "s" : ""} +${formatPrecio(d.costoExtras)})` : "";
    L.push(`   ${d.paso.etiqueta}: ${d.labels.join(", ")}${extras}`);
  });

  L.push(`   Subtotal: ${formatPrecio(item.subtotal)}`);
  return L;
}

function buildItemDirecto(item: ItemPedidoDirecto): string[] {
  const L: string[] = [];
  const producto = productoDirectoPorId(item.productoId);
  if (!producto) return L;

  L.push(
    `${producto.alias ?? producto.nombre}${item.cantidad > 1 ? ` x${item.cantidad}` : ""} — ${formatPrecio(item.subtotal)}`,
  );
  return L;
}

export function buildOrderMessage(items: ItemPedido[], entrega: DatosEntrega): string {
  const L: string[] = [];
  L.push("¡Hola D'Fruta Madre! 🍓 Quiero hacer este pedido:");
  L.push("");

  let idx = 0;
  items.forEach((item) => {
    if (item.tipo === "configurable") {
      buildItemConfigurable(item, idx).forEach((l) => L.push(l));
      idx++;
    } else {
      buildItemDirecto(item).forEach((l) => L.push(l));
    }
    L.push("");
  });

  const total = items.reduce((acc, it) => acc + it.subtotal, 0);
  L.push(`💰 TOTAL: ${formatPrecio(total)}`);
  L.push("");

  if (entrega.pago !== "recoger-en-tienda") {
    L.push(`📍 Dirección: ${entrega.direccion.trim() || "—"}`);
    if (entrega.referencia.trim()) L.push(`🗺️ Referencia: ${entrega.referencia.trim()}`);
  }

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
