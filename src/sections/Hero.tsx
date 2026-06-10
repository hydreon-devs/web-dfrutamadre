import { BRAND } from "../domain/menu";
import { buildWaUrl } from "../shared/lib/whatsapp";
import { Badge, Button, Drip, IconArrow, IconClock, IconPin, IconWhatsApp } from "../shared/ui";

const SALUDO = "¡Hola D'Fruta Madre! 🍓 Quiero pedir fresas con crema a domicilio.";

const DECOS = [
  { img: "/assets/merengon.webp", className: "left-[2%] top-[8%] w-20 -rotate-12 min-[940px]:w-28", delay: "0s", duration: "5.5s" },
  { img: "/assets/cup-fresas-con-crema.webp", className: "right-[3%] top-[6%] w-16 rotate-6 min-[940px]:w-24", delay: "1.2s", duration: "4.5s" },
  { img: "/assets/oblea.webp", className: "left-[6%] bottom-[6%] w-18 rotate-12 min-[940px]:w-26", delay: "2s", duration: "6s" },
  { img: "/assets/cup-duraznos.webp", className: "right-[4%] bottom-[12%] w-16 -rotate-6 min-[940px]:w-24", delay: "3s", duration: "5s" },
];

interface HeroProps {
  onOpenArmador: () => void;
}

export function Hero({ onOpenArmador }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-blush pt-30 pb-[70px] min-[940px]:pt-[150px] min-[940px]:pb-20" id="top">
      <div className="absolute inset-0 gingham opacity-50" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-crema/20 to-crema/85" />
      </div>
      <div
        className="absolute -top-[10%] -right-[15%] w-[60%] h-[70%] blur-[10px] bg-[radial-gradient(circle,rgb(248_200_208/0.7),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="container-fm relative grid grid-cols-1 gap-4.5 items-center min-[940px]:grid-cols-[1.05fr_.95fr] min-[940px]:gap-5">
        <div className="relative z-2 text-center min-[940px]:text-left">
          <Badge variant="green">🍓 Hechas en casa, a tu gusto</Badge>
          <h1 className="display-brand text-[clamp(3.4rem,17vw,6rem)] min-[1100px]:text-[6.4rem] mt-2 mb-2">
            Ármalas
            <br />a tu gusto
          </h1>
          <p className="text-[clamp(1.1rem,4.4vw,1.35rem)] font-semibold text-cacao max-w-[22ch] mx-auto min-[940px]:mx-0">
            {BRAND.tagline}.
          </p>

          <div className="mt-6.5 flex flex-col items-center gap-3 min-[720px]:flex-row min-[720px]:justify-center min-[940px]:justify-start">
            <Button size="hero" onClick={onOpenArmador} className="w-[min(360px,100%)] min-[720px]:w-auto">
              Arma tus fresas <IconArrow />
            </Button>
            <Button
              variant="secondary"
              href={buildWaUrl(BRAND.telefonoIntl, SALUDO)}
              target="_blank"
              rel="noopener"
              className="w-[min(360px,100%)] min-[720px]:w-auto"
            >
              <IconWhatsApp /> Pedir por WhatsApp
            </Button>
          </div>

          <div className="mt-5.5 flex flex-wrap items-center justify-center gap-2.5 font-round font-bold text-[.95rem] text-cacao-soft min-[940px]:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <IconClock /> Mar–Dom · 2–8 PM
            </span>
            <span className="opacity-50">·</span>
            <span className="inline-flex items-center gap-1.5">
              <IconPin /> Calle 10 N18-5, Girardota
            </span>
          </div>
        </div>

        <div className="relative grid place-items-center h-[340px] mt-1.5 min-[940px]:h-[520px]">
          <div
            className="absolute w-[360px] h-[360px] min-[940px]:w-[480px] min-[940px]:h-[480px] bg-[radial-gradient(circle,rgb(232_76_107/0.18),transparent_62%)]"
            aria-hidden="true"
          />
          <img
            className="relative z-2 w-[clamp(260px,74vw,350px)] min-[940px]:w-[clamp(420px,36vw,520px)] object-contain drop-shadow-[0_22px_32px_rgb(200_70_95/0.28)] animate-floaty"
            src="/assets/mascot-fresa.webp"
            alt="Mascota de D'Fruta Madre, una fresa sonriente"
          />
          {DECOS.map((d) => (
            <img
              key={d.img}
              src={d.img}
              alt=""
              aria-hidden="true"
              className={`absolute z-1 object-contain select-none pointer-events-none drop-shadow-[0_10px_16px_rgb(200_70_95/0.22)] animate-floaty ${d.className}`}
              style={{ animationDelay: d.delay, animationDuration: d.duration }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 -bottom-px z-4">
        <Drip color="var(--color-crema)" />
      </div>
    </section>
  );
}
