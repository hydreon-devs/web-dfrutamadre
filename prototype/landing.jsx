/* ============================================================
   D'FRUTA MADRE — LANDING
   ============================================================ */
function waLink(text) {
  const M = window.MENU;
  return `https://wa.me/${M.BRAND.phoneIntl}?text=${encodeURIComponent(text || '¡Hola D\'Fruta Madre! 🍓 Quiero pedir fresas con crema a domicilio.')}`;
}

/* ---------- Header fijo ---------- */
function Header({ onOpenArmador }) {
  const M = window.MENU;
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const f = () => setSolid(window.scrollY > 24);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className={'site-head' + (solid ? ' is-solid' : '')}>
      <div className="container site-head__in">
        <a href="#top" aria-label="D'Fruta Madre"><Logo size={0.96} /></a>
        <nav className="site-head__nav">
          <a className="site-head__link" href="#menu">Menú</a>
          <a className="site-head__link" href="#como">Cómo pedir</a>
          <a className="ig-pill" href={M.BRAND.instagramUrl} target="_blank" rel="noopener">
            <I.ig /> <span className="ig-pill__txt">@{M.BRAND.instagram}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero({ onOpenArmador }) {
  const M = window.MENU;
  return (
    <section className="hero" id="top">
      <div className="hero__bg gingham" aria-hidden="true"></div>
      <div className="hero__glow" aria-hidden="true"></div>
      <div className="container hero__in">
        <div className="hero__copy">
          <span className="badge badge--green">🍓 Hechas en casa, a tu gusto</span>
          <h1 className="display hero__title">Ármalas<br/>a tu gusto</h1>
          <p className="hero__sub">{M.BRAND.tagline}.</p>
          <div className="hero__cta">
            <button className="btn btn--primary btn--hero" onClick={onOpenArmador}>
              Arma tus fresas <I.arrow />
            </button>
            <a className="btn btn--secondary" href={waLink()} target="_blank" rel="noopener">
              <I.wa /> Pedir por WhatsApp
            </a>
          </div>
          <div className="hero__trust">
            <span><I.clock /> Mar–Dom · 2–8 PM</span>
            <span className="dot">·</span>
            <span><I.pin /> Solo Girardota</span>
          </div>
        </div>

        <div className="hero__art">
          <div className="hero__cup-glow" aria-hidden="true"></div>
          <img className="hero__cup" src="assets/cup-fresa-helado.png" alt="Vaso de fresas con crema" />
          <img className="hero__mascot" src="assets/mascot-fresa.png" alt="" />
          <img className="hero__float hero__float--1" src="assets/cup-chocolate.png" alt="" />
          <img className="hero__float hero__float--2" src="assets/oblea.png" alt="" />
        </div>
      </div>
      <Drip color="var(--crema)" />
    </section>
  );
}

/* ---------- Cream drip divider ---------- */
function Drip({ color = 'var(--crema)', flip = false }) {
  return (
    <svg className="drip" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true"
      style={{ transform: flip ? 'scaleY(-1)' : 'none', '--drip': color }}>
      <path d="M0,0 L1200,0 L1200,30 C1150,55 1120,40 1090,46 C1050,54 1040,30 1000,34
        C960,38 950,62 905,58 C865,54 860,30 820,36 C780,42 778,64 735,60
        C695,56 690,32 650,38 C612,44 610,66 568,60 C530,55 528,32 488,38
        C450,44 448,64 405,60 C368,56 362,34 322,38 C285,42 282,64 240,60
        C205,56 198,34 160,40 C122,46 118,62 78,56 C45,51 38,34 0,40 Z"
        fill="var(--drip)" />
    </svg>
  );
}

/* ---------- Menú ---------- */
function Menu() {
  const M = window.MENU, fmt = window.fmt;
  return (
    <section className="section menu" id="menu">
      <div className="container">
        <div className="sec-head center" data-reveal>
          <p className="eyebrow">La carta completa</p>
          <h2 className="section-title sec-head__h">Nuestro menú</h2>
          <p className="lead">Fresas con crema recién hechas, más antojos de la casa.</p>
        </div>

        {/* Tamaños */}
        <div className="menu-block" data-reveal>
          <h3 className="menu-block__title">Fresas con crema</h3>
          <p className="menu-block__sub">Elige tamaño y ármalas como quieras.</p>
          <div className="sizes-grid">
            {M.SIZES.map((s) => (
              <article className="size-card" key={s.id}>
                <div className="size-card__media">
                  <img src="assets/cup-fresa-helado.png" alt="" style={{ transform: `scale(${0.7 + s.scale * 0.28})` }} />
                </div>
                <h4 className="size-card__name">{s.name}</h4>
                <p className="size-card__oz">{s.oz}</p>
                <p className="size-card__price">{fmt(s.price)}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Salsas + toppings */}
        <div className="menu-cols">
          <div className="menu-block card menu-card" data-reveal>
            <h3 className="menu-block__title">Salsas</h3>
            <p className="menu-block__sub">Incluida · elige una</p>
            <div className="chips">
              {M.SALSAS.map((s) => (<span className="chip chip--static" key={s.id}>{s.name}</span>))}
            </div>
          </div>

          <div className="menu-block card menu-card" data-reveal>
            <div className="menu-card__head">
              <h3 className="menu-block__title">Toppings clásicos</h3>
              <span className="badge">+{fmt(3000)} c/u</span>
            </div>
            <div className="chips">
              {M.TOPPINGS_CLASICOS.map((t) => (<span className="chip chip--static" key={t.id}>{t.name}</span>))}
            </div>
          </div>

          <div className="menu-block card menu-card menu-card--prem" data-reveal>
            <div className="menu-card__head">
              <h3 className="menu-block__title">Toppings premium</h3>
              <span className="badge">+{fmt(3500)} c/u</span>
            </div>
            <div className="chips">
              {M.TOPPINGS_PREMIUM.map((t) => (<span className="chip chip--static chip--prem" key={t.id}>{t.name}</span>))}
            </div>
          </div>
        </div>

        {/* Especiales */}
        <div className="menu-block" data-reveal style={{ marginTop: 44 }}>
          <h3 className="menu-block__title">Otros antojos</h3>
          <p className="menu-block__sub">De la casa, para variar.</p>
          <div className="esp-grid">
            {M.ESPECIALES.map((p) => (
              <article className="pcard esp-card" key={p.id}>
                {p.tag && <span className="esp-card__tag badge badge--green">{p.tag}</span>}
                <div className="pcard__media"><img src={p.img} alt={p.name} /></div>
                <h4 className="pcard__name">{p.name}</h4>
                <p className="pcard__desc">{p.desc}</p>
                <div className="esp-card__prices">
                  {p.sizes.map((s, i) => (
                    <span className="esp-price" key={i}>
                      <span className="esp-price__label">{s.label}</span>
                      <span className="esp-price__num">{fmt(s.price)}</span>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Otros simples */}
        <div className="menu-block card otros-card" data-reveal>
          <h3 className="menu-block__title">Para acompañar</h3>
          <ul className="otros-list">
            {M.OTROS.map((o, i) => (
              <li key={i}><span className="otros-list__name">{o.name}</span><span className="otros-list__dots" /><span className="otros-list__price">{fmt(o.price)}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Armador destacado ---------- */
function ArmadorCTA({ onOpenArmador }) {
  return (
    <section className="section arm-feature">
      <Drip color="var(--coral)" />
      <div className="container arm-feature__in">
        <div className="arm-feature__copy" data-reveal>
          <span className="badge" style={{ background: 'rgba(255,255,255,.22)', color: '#fff' }}>★ Lo más pedido</span>
          <h2 className="display arm-feature__h">Arma tus<br/>fresas</h2>
          <p className="arm-feature__sub">
            Tú mandas: tamaño, salsa y todos los toppings que quieras.
            El total se calcula al instante y te lo dejamos listo para enviar por WhatsApp.
          </p>
          <button className="btn btn--hero arm-feature__btn" onClick={onOpenArmador}>
            Arma tus fresas <I.arrow />
          </button>
          <p className="arm-feature__fine">Sin cuentas, sin pagos online. Pides en 30 segundos.</p>
        </div>
        <div className="arm-feature__art" data-reveal>
          <div className="arm-feature__ring" aria-hidden="true"></div>
          <img className="arm-feature__cup" src="assets/cup-chocolate.png" alt="Fresas con crema personalizadas" />
          <img className="arm-feature__mascot" src="assets/mascot-fresa.png" alt="" />
          <span className="arm-feature__chip arm-feature__chip--1">Oreo</span>
          <span className="arm-feature__chip arm-feature__chip--2">Arequipe</span>
          <span className="arm-feature__chip arm-feature__chip--3">Gansito</span>
        </div>
      </div>
      <Drip color="var(--crema)" />
    </section>
  );
}

/* ---------- Cómo pedir ---------- */
function Como() {
  const M = window.MENU;
  return (
    <section className="section como" id="como">
      <div className="container">
        <div className="sec-head center" data-reveal>
          <p className="eyebrow">Fácil y rapidito</p>
          <h2 className="section-title">Cómo pedir</h2>
        </div>
        <div className="pasos">
          {M.PASOS.map((p, i) => (
            <div className="paso" key={p.n} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="paso__num">{p.n}</div>
              <h3 className="paso__title">{p.title}</h3>
              <p className="paso__desc">{p.desc}</p>
              {i < M.PASOS.length - 1 && <I.arrow className="paso__arrow" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Prueba social ---------- */
function Social() {
  const M = window.MENU;
  return (
    <section className="section social">
      <div className="container">
        <div className="sec-head center" data-reveal>
          <p className="eyebrow">Lo que dicen</p>
          <h2 className="section-title">Clientes consentidos</h2>
        </div>

        <div className="reviews">
          {M.RESENAS.map((r, i) => (
            <article className="review" key={i} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <Stars n={r.stars} />
              <p className="review__text">"{r.text}"</p>
              <div className="review__who">
                <span className="review__avatar" aria-hidden="true">{r.name[0]}</span>
                <div>
                  <p className="review__name">{r.name}</p>
                  <p className="review__meta">{r.meta}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Feed Instagram (placeholders) */}
        <div className="ig" data-reveal>
          <div className="ig__head">
            <div className="ig__id"><I.ig /> <b>@{M.BRAND.instagram}</b></div>
            <a className="btn btn--secondary btn--sm" href={M.BRAND.instagramUrl} target="_blank" rel="noopener">Seguir</a>
          </div>
          <div className="ig__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <a className="ig__cell photo-ph" key={i} href={M.BRAND.instagramUrl} target="_blank" rel="noopener">
                <span>foto real<br/>aquí</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Info práctica ---------- */
function Info() {
  const M = window.MENU;
  return (
    <section className="section info gingham" id="info">
      <div className="container">
        <div className="info-grid">
          <div className="info-card card" data-reveal>
            <span className="info-card__ic"><I.clock /></span>
            <h3 className="info-card__t">Horario</h3>
            <p className="info-card__d">Martes a Domingo<br/><b>2:00 – 8:00 PM</b></p>
          </div>
          <div className="info-card card" data-reveal>
            <span className="info-card__ic"><I.pin /></span>
            <h3 className="info-card__t">Cobertura</h3>
            <p className="info-card__d">Domicilios <b>solo en Girardota</b><br/>Antioquia</p>
          </div>
          <a className="info-card card info-card--link" href={`tel:+${M.BRAND.phoneIntl}`} data-reveal>
            <span className="info-card__ic"><I.phone /></span>
            <h3 className="info-card__t">Teléfono</h3>
            <p className="info-card__d"><b>{M.BRAND.phoneDisplay}</b><br/>Pedidos por WhatsApp</p>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer({ onOpenArmador }) {
  const M = window.MENU;
  return (
    <footer className="foot">
      <Drip color="var(--coral)" />
      <div className="container foot__in">
        <div className="foot__cta" data-reveal>
          <h2 className="display foot__h">¿Se te antojó?</h2>
          <p className="foot__sub">Ármalas a tu gusto y te las llevamos a la puerta.</p>
          <div className="foot__btns">
            <button className="btn btn--hero foot__btn-main" onClick={onOpenArmador}>Arma tus fresas <I.arrow /></button>
            <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener"><I.wa /> WhatsApp</a>
          </div>
        </div>

        <div className="foot__bottom">
          <Logo size={1.05} light />
          <div className="foot__socials">
            <a className="foot__social" href={M.BRAND.instagramUrl} target="_blank" rel="noopener" aria-label="Instagram"><I.ig /></a>
            <a className="foot__social" href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp"><I.wa /></a>
            <a className="foot__social" href={`tel:+${M.BRAND.phoneIntl}`} aria-label="Llamar"><I.phone /></a>
          </div>
          <p className="foot__thanks"><I.heart style={{ color: 'var(--rosa)' }} /> Gracias por apoyar mi negocio</p>
          <p className="foot__legal">@{M.BRAND.instagram} · {M.BRAND.phoneDisplay} · Girardota, Antioquia</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Landing root ---------- */
function Landing({ onOpenArmador }) {
  const reveal = useReveal();
  return (
    <div className="landing" ref={reveal}>
      <Header onOpenArmador={onOpenArmador} />
      <Hero onOpenArmador={onOpenArmador} />
      <Menu />
      <ArmadorCTA onOpenArmador={onOpenArmador} />
      <Como />
      <Social />
      <Info />
      <Footer onOpenArmador={onOpenArmador} />

      {/* FAB WhatsApp */}
      <a className="wa-fab" href={waLink()} target="_blank" rel="noopener" aria-label="Pedir por WhatsApp">
        <I.wa />
        <span className="wa-fab__txt">Pedir</span>
      </a>
    </div>
  );
}

window.Landing = Landing;
window.waLink = waLink;
