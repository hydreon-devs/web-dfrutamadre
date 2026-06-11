import { BRAND, RESENAS } from "../domain/menu";
import { Button, IconInstagram, Stars } from "../shared/ui";

const INSTAGRAM_FOTOS = Array.from(
  { length: 5 },
  (_, i) => `/assets/img-instagram/img-instagram-fresas${i + 1}.jpeg`,
);

export function Social() {
  return (
    <section className="relative bg-blush py-[clamp(48px,9vw,96px)]">
      <div className="container-fm">
        <div className="max-w-[640px] mx-auto mb-10 text-center" data-reveal>
          <p className="font-round font-bold text-[.82rem] tracking-[.14em] uppercase text-verde-700">
            Lo que dicen
          </p>
          <h2 className="font-round font-extrabold text-coral-700 text-[clamp(1.9rem,5.5vw,2.8rem)] leading-tight mt-1">
            Clientes consentidos
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3.5 mb-8.5 min-[720px]:grid-cols-3">
          {RESENAS.map((r, i) => (
            <article
              key={i}
              className="bg-white rounded-card shadow-fm-sm p-5.5"
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <Stars n={r.estrellas} />
              <p className="text-[1.05rem] leading-normal text-cacao mt-2.5 mb-4">"{r.texto}"</p>
              <div className="flex items-center gap-3">
                <span
                  className="grid place-items-center w-11 h-11 rounded-full font-round font-extrabold text-white bg-verde flex-none"
                  aria-hidden="true"
                >
                  {r.nombre[0]}
                </span>
                <div>
                  <p className="font-round font-extrabold text-cacao">{r.nombre}</p>
                  <p className="text-[.85rem] text-cacao-soft">{r.meta}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Feed Instagram */}
        <div className="bg-white rounded-card shadow-fm-sm p-5" data-reveal>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2 font-round text-coral-700 text-[1.05rem]">
              <IconInstagram /> <b>@{BRAND.instagram}</b>
            </div>
            <Button variant="secondary" size="sm" href={BRAND.instagramUrl} target="_blank" rel="noopener">
              Seguir
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 min-[720px]:grid-cols-6">
            {INSTAGRAM_FOTOS.map((src, i) => (
              <a
                key={src}
                className="block aspect-square rounded-[14px] overflow-hidden"
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener"
              >
                <img
                  src={src}
                  alt={`Fresas con crema de @${BRAND.instagram} ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </a>
            ))}
            <a
              className="grid place-items-center aspect-square rounded-[14px] bg-blush text-coral-700 text-[.8rem] font-bold text-center p-2.5"
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener"
            >
              <span>
                Ver más
                <br />
                <IconInstagram />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
