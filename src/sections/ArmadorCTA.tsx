import { Button, Drip, IconArrow } from "../shared/ui";
import { PhoneShowcase } from "./PhoneShowcase";

interface ArmadorCTAProps {
  onOpenArmador: () => void;
}

export function ArmadorCTA({ onOpenArmador }: ArmadorCTAProps) {
  return (
    <section className="relative overflow-hidden text-white py-23 bg-gradient-to-br from-[#f36a85] via-coral via-55% to-coral-700">
      <div className="absolute inset-x-0 top-0">
        <Drip color="var(--color-crema)" flip />
      </div>

      <div className="container-fm relative z-2 grid grid-cols-1 gap-7.5 items-center min-[940px]:grid-cols-[1.1fr_.9fr]">
        <div className="text-center min-[940px]:text-left" data-reveal>
          <h2 className="display-brand text-white text-[clamp(3rem,14vw,5rem)] my-2 [text-shadow:0_6px_0_rgb(0_0_0/0.08)]">
            Arma tu pedido
            <br />
            a tu gusto
          </h2>
          <p className="text-[1.12rem] leading-normal font-semibold text-white/95 max-w-[34ch] mx-auto mb-6.5 mt-6 min-[940px]:mx-0">
          Personaliza tu pedido a tu manera: tamaño, salsa y toppings. 
          En segundos tendrás un mensaje listo para enviarnos por WhatsApp
          </p>
          <Button
            size="hero"
            onClick={onOpenArmador}
            className="bg-white text-coral-700 hover:bg-white"
          >
            Arma tu pedido <IconArrow />
          </Button>
          <p className="mt-3.5 text-[.9rem] font-bold text-white/80">
          Del negocio a tus manos, como tú lo quieres.
          </p>
        </div>

        <div className="relative grid place-items-center h-[480px] min-[940px]:h-[700px]" data-reveal>
          <div
            className="absolute w-[300px] h-[300px] min-[940px]:w-[380px] min-[940px]:h-[380px] rounded-full bg-white/12 shadow-[0_0_0_22px_rgb(255_255_255/0.07)]"
            aria-hidden="true"
          />
          <PhoneShowcase />
          {[
            { img: "/assets/merengon.webp", className: "left-[2%] top-[8%] w-20 -rotate-12 min-[940px]:w-28", delay: "0s", duration: "5.5s" },
            { img: "/assets/cup-duraznos.webp", className: "right-[4%] bottom-[12%] w-16 -rotate-6 min-[940px]:w-24", delay: "3s", duration: "5s" },
            { img: "/assets/cup-fresas-con-crema.webp", className: "right-[3%] top-[6%] w-16 rotate-6 min-[940px]:w-24", delay: "1.2s", duration: "4.5s" },
            { img: "/assets/oblea.webp", className: "left-[6%] bottom-[6%] w-18 rotate-12 min-[940px]:w-26", delay: "2s", duration: "6s" },
          ].map((c) => (
            <img
              key={c.img}
              src={c.img}
              alt=""
              aria-hidden="true"
              width={780}
              height={1170}
              decoding="async"
              className={`absolute z-4 object-contain select-none pointer-events-none drop-shadow-[0_10px_16px_rgb(0_0_0/0.22)] animate-floaty ${c.className}`}
              style={{ animationDuration: c.duration, animationDelay: c.delay }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 -bottom-px">
        <Drip color="var(--color-crema)" />
      </div>
    </section>
  );
}
