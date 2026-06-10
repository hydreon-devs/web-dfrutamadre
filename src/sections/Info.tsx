import { BRAND } from "../domain/menu";
import { IconClock, IconPhone, IconPin } from "../shared/ui";

export function Info() {
  return (
    <section className="relative gingham py-[clamp(48px,9vw,96px)]" id="info">
      <div className="container-fm">
        <div className="grid grid-cols-1 gap-3.5 min-[720px]:grid-cols-3">
          <div className="bg-white rounded-card shadow-fm-sm px-6 py-6.5 text-center" data-reveal>
            <span className="inline-grid place-items-center w-[58px] h-[58px] rounded-full bg-coral-tint text-coral text-2xl mb-3">
              <IconClock />
            </span>
            <h3 className="font-round font-extrabold text-coral-700 text-[1.2rem] mb-1.5">
              Horario
            </h3>
            <p className="text-cacao-soft leading-normal">
              Martes a Domingo
              <br />
              <b className="text-cacao">2:00 – 8:00 PM</b>
            </p>
          </div>

          <div className="bg-white rounded-card shadow-fm-sm px-6 py-6.5 text-center" data-reveal>
            <span className="inline-grid place-items-center w-[58px] h-[58px] rounded-full bg-coral-tint text-coral text-2xl mb-3">
              <IconPin />
            </span>
            <h3 className="font-round font-extrabold text-coral-700 text-[1.2rem] mb-1.5">
              Cobertura
            </h3>
            <p className="text-cacao-soft leading-normal">
              Domicilios <b className="text-cacao">solo en Girardota</b>
              <br />
              Punto físico: <b className="text-cacao">{BRAND.direccion}</b>
            </p>
          </div>

          <a
            className="block bg-white rounded-card shadow-fm-sm px-6 py-6.5 text-center transition-all hover:-translate-y-1 hover:shadow-fm-md"
            href={`tel:+${BRAND.telefonoIntl}`}
            data-reveal
          >
            <span className="inline-grid place-items-center w-[58px] h-[58px] rounded-full bg-coral-tint text-coral text-2xl mb-3">
              <IconPhone />
            </span>
            <h3 className="font-round font-extrabold text-coral-700 text-[1.2rem] mb-1.5">
              Teléfono
            </h3>
            <p className="text-cacao-soft leading-normal">
              <b className="text-cacao">{BRAND.telefonoDisplay}</b>
              <br />
              Pedidos por WhatsApp
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
