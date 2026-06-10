import { BRAND } from "../domain/menu";
import { buildWaUrl } from "../shared/lib/whatsapp";
import {
  Button,
  Drip,
  IconArrow,
  IconHeart,
  IconInstagram,
  IconPhone,
  IconWhatsApp,
  Logo,
} from "../shared/ui";

const SALUDO = "¡Hola D'Fruta Madre! 🍓 Quiero hacer un pedido a domicilio.";

interface FooterProps {
  onOpenArmador: () => void;
}

export function Footer({ onOpenArmador }: FooterProps) {
  const wa = buildWaUrl(BRAND.telefonoIntl, SALUDO);

  return (
    <footer className="relative text-white pt-23 pb-28 min-[720px]:pb-9 bg-gradient-to-b from-coral to-coral-700">
      <div className="absolute inset-x-0 top-0">
        <Drip color="var(--color-crema)" flip />
      </div>

      <div className="container-fm">
        <div className="text-center max-w-[560px] mx-auto mb-12" data-reveal>
          <h2 className="display-brand text-white text-[clamp(2.6rem,11vw,4rem)] mb-1 [text-shadow:0_5px_0_rgb(0_0_0/0.08)]">
            ¿Se te antojó?
          </h2>
          <p className="text-[1.1rem] font-semibold text-white/92 mb-6">
            Ármalas a tu gusto y te las llevamos a la puerta.
          </p>
          <div className="flex flex-col items-center gap-3 min-[720px]:flex-row min-[720px]:justify-center">
            <Button
              size="hero"
              onClick={onOpenArmador}
              className="bg-white text-coral-700 hover:bg-white w-[min(340px,100%)] min-[720px]:w-auto"
            >
              Arma tu pedido <IconArrow />
            </Button>
            <Button variant="wa" href={wa} target="_blank" rel="noopener" className="w-[min(340px,100%)] min-[720px]:w-auto">
              <IconWhatsApp /> WhatsApp
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center border-t-2 border-white/18 pt-7.5">
          <Logo size={1.05} light />
          <div className="flex gap-3">
            <a
              className="grid place-items-center w-12 h-12 rounded-full bg-white/16 text-white text-[1.3rem] transition-all hover:bg-white hover:text-coral hover:-translate-y-0.5"
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
            <a
              className="grid place-items-center w-12 h-12 rounded-full bg-white/16 text-white text-[1.3rem] transition-all hover:bg-white hover:text-coral hover:-translate-y-0.5"
              href={wa}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
            >
              <IconWhatsApp />
            </a>
            <a
              className="grid place-items-center w-12 h-12 rounded-full bg-white/16 text-white text-[1.3rem] transition-all hover:bg-white hover:text-coral hover:-translate-y-0.5"
              href={`tel:+${BRAND.telefonoIntl}`}
              aria-label="Llamar"
            >
              <IconPhone />
            </a>
          </div>
          <p className="inline-flex items-center gap-2 font-round font-bold text-[1.1rem]">
            <IconHeart className="text-rosa" /> Gracias por apoyar mi negocio
          </p>
          <p className="text-[.85rem] text-white/70">
            @{BRAND.instagram} · {BRAND.telefonoDisplay} · Girardota, Antioquia
          </p>
          <p className="text-[.85rem] text-white/70">
            Sitio creado por{" "}
            <a
              className="font-bold text-white/90 underline underline-offset-2 transition-colors hover:text-white"
              href="https://hydreon.com.co"
              target="_blank"
              rel="noopener"
            >
              Hydreon Studios
            </a>{" "}
            ·{" "}
            <a
              className="inline-flex items-center gap-1 font-bold text-white/90 underline underline-offset-2 transition-colors hover:text-white"
              href="https://instagram.com/hydreon.co"
              target="_blank"
              rel="noopener"
            >
              <IconInstagram /> @hydreon.co
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
