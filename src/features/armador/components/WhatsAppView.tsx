import type { ItemPedido } from "../../../domain/builder/types";
import { BRAND } from "../../../domain/menu";
import { Button, IconPhone, IconSend, IconWhatsApp } from "../../../shared/ui";
import { buildOrderMessage, waUrlPedido } from "../whatsapp";
import type { DatosEntrega } from "../types";
import { CheckoutShell } from "./CheckoutShell";

interface WhatsAppViewProps {
  items: ItemPedido[];
  entrega: DatosEntrega;
  onBack: () => void;
}

export function WhatsAppView({ items, entrega, onBack }: WhatsAppViewProps) {
  const msg = buildOrderMessage(items, entrega);
  const url = waUrlPedido(items, entrega);
  const lines = msg.split("\n");
  const now = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

  return (
    <CheckoutShell titulo="Vista previa" onBack={onBack}>
      <p className="mb-4 text-cacao">
        <b>Así llega tu pedido por WhatsApp.</b> El mensaje va <u>pre-escrito</u> — solo tienes que
        presionar <b>enviar</b>. ✅
      </p>

      {/* Mock de teléfono */}
      <div className="rounded-card overflow-hidden shadow-fm-md mb-5">
        <div className="flex items-center gap-2.5 bg-[#075e54] text-white px-4 py-3">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-white overflow-hidden flex-none">
            <img src="/assets/mascot-fresa.webp" alt="" className="w-7 h-7 object-contain" />
          </span>
          <span className="flex flex-col leading-tight flex-1">
            <b className="font-round">{BRAND.nombre}</b>
            <em className="not-italic text-[.78rem] text-white/80">en línea</em>
          </span>
          <IconPhone className="text-xl" />
        </div>

        <div className="bg-[#e5ddd5] px-3.5 py-4">
          <div className="w-fit mx-auto text-[.72rem] font-bold text-[#54656f] bg-white/80 rounded-md px-2.5 py-1 mb-3">
            HOY
          </div>
          <div className="relative bg-[#dcf8c6] rounded-xl rounded-tr-sm px-3.5 py-2.5 ml-8 shadow-sm">
            {lines.map((ln, i) => (
              <span key={i} className="block text-[.88rem] leading-snug text-[#111b21]">
                {ln === "" ? "\u00A0" : ln}
              </span>
            ))}
            <span className="block text-right text-[.7rem] text-[#667781] mt-1">
              {now} <span className="text-[#53bdeb]">✓✓</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 mt-4">
            <span className="flex-1 bg-white rounded-full px-4 py-2.5 text-[.9rem] text-[#8696a0]">
              Mensaje pre-escrito…
            </span>
            <span className="grid place-items-center w-11 h-11 rounded-full bg-[#00a884] text-white text-xl flex-none">
              <IconSend />
            </span>
          </div>
        </div>
      </div>

      <Button variant="wa" block href={url} target="_blank" rel="noopener">
        <IconWhatsApp /> Abrir WhatsApp y enviar
      </Button>
      <p className="text-center text-[.85rem] text-cacao-soft mt-2.5 mb-3">
        Se abre el chat con {BRAND.telefonoDisplay} y el mensaje ya escrito.
      </p>
      <Button variant="ghost" block onClick={onBack}>
        Volver a editar
      </Button>
    </CheckoutShell>
  );
}
