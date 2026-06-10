import { BRAND } from "../../domain/menu";
import { buildWaUrl } from "../lib/whatsapp";
import { IconWhatsApp } from "./icons";

const SALUDO = "¡Hola D'Fruta Madre! 🍓 Quiero hacer un pedido a domicilio.";

export function WhatsAppFab() {
  return (
    <a
      className="fixed right-4 bottom-4 z-60 inline-flex items-center gap-2 bg-wa text-white font-round font-extrabold text-[1.05rem] px-4.5 py-3.5 rounded-full animate-fab-pulse transition-all hover:-translate-y-0.5 hover:brightness-105"
      href={buildWaUrl(BRAND.telefonoIntl, SALUDO)}
      target="_blank"
      rel="noopener"
      aria-label="Pedir por WhatsApp"
    >
      <IconWhatsApp className="text-2xl" />
      <span>Pedir</span>
    </a>
  );
}
