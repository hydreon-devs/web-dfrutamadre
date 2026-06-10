/* ============================================================
   D'FRUTA MADRE — ARMADOR (Arma tus fresas)
   ============================================================ */
const { useMemo: useMemoAr } = React;

function Armador({ onBack, onAdd }) {
  const M = window.MENU, fmt = window.fmt;
  const [size, setSize] = React.useState('m');
  const [salsa, setSalsa] = React.useState('lecherita');
  const [tops, setTops] = React.useState([]); // ids
  const [note, setNote] = React.useState('');
  const [pop, setPop] = React.useState(false);

  const allTops = useMemoAr(() => [...M.TOPPINGS_CLASICOS, ...M.TOPPINGS_PREMIUM], []);
  const sizeObj = M.SIZES.find((s) => s.id === size);
  const salsaObj = M.SALSAS.find((s) => s.id === salsa);
  const chosen = allTops.filter((t) => tops.includes(t.id));
  const topsTotal = chosen.reduce((a, t) => a + t.price, 0);
  const total = sizeObj.price + topsTotal;

  // pequeño "pop" cuando cambia tamaño
  React.useEffect(() => { setPop(true); const t = setTimeout(() => setPop(false), 280); return () => clearTimeout(t); }, [size]);

  const toggleTop = (id) => setTops((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const buildMessage = () => {
    const L = [];
    L.push("¡Hola D'Fruta Madre! 🍓 Quiero armar mis fresas con crema:");
    L.push('');
    L.push(`• Tamaño: ${sizeObj.name} (${sizeObj.oz}) — ${fmt(sizeObj.price)}`);
    L.push(`• Salsa: ${salsaObj.name}`);
    if (chosen.length) {
      L.push('• Toppings:');
      chosen.forEach((t) => L.push(`   – ${t.name} (+${fmt(t.price)})`));
    } else {
      L.push('• Toppings: sin toppings extra');
    }
    if (note.trim()) { L.push(''); L.push(`• Nota: ${note.trim()}`); }
    L.push('');
    L.push(`TOTAL: ${fmt(total)}`);
    L.push('');
    L.push('¿Me confirmas disponibilidad y domicilio? 🛵');
    return L.join('\n');
  };

  const sendWA = () => {
    const url = `https://wa.me/${M.BRAND.phoneIntl}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank');
  };

  const addToCart = () => {
    const clas = tops.filter((id) => id[0] === 'c');
    const prem = tops.filter((id) => id[0] === 'p');
    if (onAdd) onAdd({ size, salsa, clas, prem });
    else sendWA();
  };

  const Section = ({ step, title, hint, children }) => (
    <section className="arm-step" data-reveal>
      <div className="arm-step__head">
        <span className="arm-step__num">{step}</span>
        <div>
          <h3 className="arm-step__title">{title}</h3>
          {hint && <p className="arm-step__hint">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );

  const reveal = useReveal();

  return (
    <div className="armador" ref={reveal}>
      {/* Top bar */}
      <header className="arm-top">
        <div className="container arm-top__in">
          <button className="arm-back" onClick={onBack} aria-label="Volver">
            <I.back /> <span>Volver</span>
          </button>
          <Logo size={0.82} />
          <span className="arm-top__tag badge">Arma tus fresas</span>
        </div>
      </header>

      <div className="container arm-grid">
        {/* ---- Controles ---- */}
        <div className="arm-controls">
          <div className="arm-intro" data-reveal>
            <p className="eyebrow">Hazlas tuyas</p>
            <h2 className="display arm-intro__h">Ármalas<br/>a tu gusto</h2>
            <p className="lead">Elige el tamaño, tu salsa y todos los toppings que se te antojen. El total se calcula solito. 🍓</p>
          </div>

          <Section step="1" title="Elige tu tamaño">
            <div className="arm-sizes">
              {M.SIZES.map((s) => (
                <button key={s.id}
                  className={'arm-size' + (size === s.id ? ' is-on' : '')}
                  onClick={() => setSize(s.id)} aria-pressed={size === s.id}>
                  <span className="arm-size__oz">{s.oz}</span>
                  <span className="arm-size__name">{s.name}</span>
                  <span className="arm-size__price">{fmt(s.price)}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section step="2" title="Elige tu salsa" hint="Incluida · elige una">
            <div className="chips">
              {M.SALSAS.map((s) => (
                <button key={s.id}
                  className={'chip' + (salsa === s.id ? ' chip--on' : '')}
                  aria-pressed={salsa === s.id}
                  onClick={() => setSalsa(s.id)}>
                  <I.check className="chip__check" /> {s.name}
                </button>
              ))}
            </div>
          </Section>

          <Section step="3" title="Toppings clásicos" hint={`Cada extra +${fmt(3000)}`}>
            <div className="chips">
              {M.TOPPINGS_CLASICOS.map((t) => (
                <button key={t.id}
                  className={'chip' + (tops.includes(t.id) ? ' chip--on' : '')}
                  aria-pressed={tops.includes(t.id)}
                  onClick={() => toggleTop(t.id)}>
                  <I.check className="chip__check" /> {t.name}
                  <span className="chip__price">+{fmt(t.price)}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section step="4" title="Toppings premium" hint={`Cada extra +${fmt(3500)}`}>
            <div className="chips">
              {M.TOPPINGS_PREMIUM.map((t) => (
                <button key={t.id}
                  className={'chip chip--prem' + (tops.includes(t.id) ? ' chip--on' : '')}
                  aria-pressed={tops.includes(t.id)}
                  onClick={() => toggleTop(t.id)}>
                  <I.check className="chip__check" /> {t.name}
                  <span className="chip__price">+{fmt(t.price)}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section step="5" title="¿Alguna nota?" hint="Opcional">
            <textarea className="textarea" value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="Ej: poquita lecherita, partir las fresas, sin maní..." maxLength={200} />
          </Section>
        </div>

        {/* ---- Resumen sticky ---- */}
        <aside className="arm-summary">
          <div className="arm-summary__card card">
            <div className={'arm-cup' + (pop ? ' is-pop' : '')}>
              <img src="assets/cup-fresa-helado.png" alt="Vaso de fresas con crema"
                style={{ transform: `scale(${sizeObj.scale})` }} />
            </div>
            <div className="arm-summary__body">
              <p className="eyebrow center">Tu pedido</p>
              <h3 className="arm-summary__title center">{sizeObj.name} · {sizeObj.oz}</h3>

              <ul className="arm-lines">
                <li><span>Base ({sizeObj.oz})</span><b>{fmt(sizeObj.price)}</b></li>
                <li><span>Salsa · {salsaObj.name}</span><b className="free">incluida</b></li>
                {chosen.length === 0 && (
                  <li className="muted"><span>Sin toppings extra</span><b>—</b></li>
                )}
                {chosen.map((t) => (
                  <li key={t.id}>
                    <span>{t.name}</span><b>+{fmt(t.price)}</b>
                  </li>
                ))}
              </ul>

              <div className="arm-total">
                <span>Total</span>
                <span className="arm-total__num">{fmt(total)}</span>
              </div>

              <button className="btn btn--primary btn--block" onClick={addToCart}>
                Agregar al pedido <I.arrow />
              </button>
              <p className="arm-summary__fine center">Te abrimos WhatsApp con el pedido listo para enviar.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* ---- Barra fija móvil ---- */}
      <div className="arm-bar">
        <div className="arm-bar__info">
          <span className="arm-bar__label">{sizeObj.name} · {chosen.length} topping{chosen.length === 1 ? '' : 's'}</span>
          <span className="arm-bar__total">{fmt(total)}</span>
        </div>
        <button className="btn btn--primary" onClick={addToCart}>Agregar <I.arrow /></button>
      </div>
    </div>
  );
}

window.Armador = Armador;
