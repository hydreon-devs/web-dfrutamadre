import { PASOS_COMO_PEDIR } from "../domain/menu";
import { IconArrow } from "../shared/ui";

export function ComoPedir() {
  return (
    <section className="relative bg-crema py-[clamp(48px,9vw,96px)]" id="como">
      <div className="container-fm">
        <div className="max-w-[640px] mx-auto mb-10 text-center" data-reveal>
          <p className="font-round font-bold text-[.82rem] tracking-[.14em] uppercase text-verde-700">
            Fácil y rapidito
          </p>
          <h2 className="font-round font-extrabold text-coral-700 text-[clamp(1.9rem,5.5vw,2.8rem)] leading-tight mt-1">
            Cómo pedir
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-[720px] mx-auto min-[720px]:grid-cols-4 min-[720px]:max-w-none">
          {PASOS_COMO_PEDIR.map((p, i) => (
            <div
              key={p.n}
              className="relative bg-white rounded-card shadow-fm-sm px-5.5 py-6 text-center"
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="grid place-items-center w-14 h-14 mx-auto mb-3 rounded-full font-display text-[1.7rem] text-white shadow-fm-sm bg-gradient-to-br from-[#f36a85] to-coral">
                {p.n}
              </div>
              <h3 className="font-round font-extrabold text-coral-700 text-[1.25rem] mb-1">
                {p.titulo}
              </h3>
              <p className="text-cacao-soft text-[.96rem]">{p.desc}</p>
              {i < PASOS_COMO_PEDIR.length - 1 && (
                <IconArrow className="hidden min-[720px]:block absolute -right-5.5 top-10.5 text-rosa text-[1.6rem] z-3" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
