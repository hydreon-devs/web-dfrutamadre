import { Badge, Button, Drip, IconArrow } from "../shared/ui";

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
          <Badge variant="light">★ Lo más pedido</Badge>
          <h2 className="display-brand text-white text-[clamp(3rem,14vw,5rem)] my-2 [text-shadow:0_6px_0_rgb(0_0_0/0.08)]">
            Arma tu
            <br />
            pedido
          </h2>
          <p className="text-[1.12rem] leading-normal font-semibold text-white/95 max-w-[34ch] mx-auto mb-6.5 min-[940px]:mx-0">
            Tú mandas: tamaño, salsa y todos los toppings que quieras. El total se calcula al
            instante y te lo dejamos listo para enviar por WhatsApp.
          </p>
          <Button
            size="hero"
            onClick={onOpenArmador}
            className="bg-white text-coral-700 hover:bg-white"
          >
            Arma tu pedido <IconArrow />
          </Button>
          <p className="mt-3.5 text-[.9rem] font-bold text-white/80">
            Sin cuentas, sin pagos online. Pides en 30 segundos.
          </p>
        </div>

        <div className="relative grid place-items-center h-[320px] min-[940px]:h-[400px]" data-reveal>
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-white/12 shadow-[0_0_0_22px_rgb(255_255_255/0.07)]"
            aria-hidden="true"
          />
          <img
            className="relative z-2 w-[clamp(210px,58vw,290px)] drop-shadow-[0_20px_26px_rgb(0_0_0/0.22)] animate-floaty"
            src="/assets/cup-fresas-con-crema.webp"
            alt="Fresas con crema personalizadas"
          />
          {[
            { label: "Oreo", pos: "top-[8%] left-[6%]", dur: "4s", delay: "0s" },
            { label: "Masmelos", pos: "top-[8%] right-[6%]", dur: "4.3s", delay: ".2s" },
            { label: "Arequipe", pos: "top-[44%] left-[0%]", dur: "4.6s", delay: ".6s" },
            { label: "Durazno", pos: "top-[44%] right-[0%]", dur: "4.9s", delay: ".8s" },
            { label: "Gansito", pos: "bottom-[10%] left-[10%]", dur: "5.2s", delay: "1s" },
            { label: "Queso", pos: "bottom-[10%] right-[10%]", dur: "5.5s", delay: "1.2s" },
          ].map((c) => (
            <span
              key={c.label}
              className={`absolute z-4 font-round font-extrabold text-[.92rem] text-coral-700 bg-white px-3.5 py-2 rounded-full shadow-fm-md animate-floaty ${c.pos}`}
              style={{ animationDuration: c.dur, animationDelay: c.delay }}
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 -bottom-px">
        <Drip color="var(--color-crema)" />
      </div>
    </section>
  );
}
