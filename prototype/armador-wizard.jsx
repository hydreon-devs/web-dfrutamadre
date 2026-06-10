/* ============================================================
   D'FRUTA MADRE — ARMADOR WIZARD
   Una pregunta por pantalla · mobile-first
   Pasos: 1 Tamaño · 2 Salsa(opc) · 3 Clásicos(2 incl) · 4 Premium(1 incl)
   ============================================================ */

function ArmadorWizard({ onBack, onAdd, initial, editMode }) {
  const M = window.MENU, fmt = window.fmt;
  const INCL_CLAS = 2, EXTRA_CLAS = 3000;
  const INCL_PREM = 1, EXTRA_PREM = 3500;

  const [step, setStep] = React.useState(0);      // 0..3
  const [dir, setDir] = React.useState(1);        // dirección de transición
  const [size, setSize] = React.useState(initial?.size || 'm');
  const [salsa, setSalsa] = React.useState(initial?.salsa || 'lecherita'); // o 'none'
  const [clas, setClas] = React.useState(initial?.clas || []);     // ids en orden de selección
  const [prem, setPrem] = React.useState(initial?.prem || []);

  const sizeObj = M.SIZES.find((s) => s.id === size);
  const salsaName = salsa === 'none' ? 'Sin salsa' : M.SALSAS.find((s) => s.id === salsa)?.name;

  const clasExtras = Math.max(0, clas.length - INCL_CLAS);
  const premExtras = Math.max(0, prem.length - INCL_PREM);
  const clasCost = clasExtras * EXTRA_CLAS;
  const premCost = premExtras * EXTRA_PREM;
  const total = sizeObj.price + clasCost + premCost;

  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n); window.scrollTo(0, 0); };
  const addToCart = () => onAdd({ size, salsa, clas, prem });
  const next = () => { if (step < 3) go(step + 1); else addToCart(); };
  const prev = () => { if (step === 0) onBack(); else go(step - 1); };

  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  // índice de selección -> incluido o extra
  const tierOf = (list, id, incl) => {
    const i = list.indexOf(id);
    if (i < 0) return null;
    return i < incl ? 'incl' : 'extra';
  };

  const STEPS = [
    { kind: 'one', label: 'Tamaño' },
    { kind: 'one', label: 'Salsa' },
    { kind: 'many', label: 'Clásicos' },
    { kind: 'many', label: 'Premium' },
  ];

  /* ---------- Render de cada paso ---------- */
  const renderStep = () => {
    if (step === 0) return (
      <StepShell kind="one" n={1} title="¿Qué tamaño?" sub="Elige uno · define el precio base">
        <div className="wz-list">
          {M.SIZES.map((s) => {
            const on = size === s.id;
            return (
              <button key={s.id} className={'wz-row' + (on ? ' is-on' : '')} onClick={() => setSize(s.id)} aria-pressed={on}>
                <span className="wz-row__radio" aria-hidden="true"></span>
                <span className="wz-row__main">
                  <span className="wz-row__name">{s.name}</span>
                  <span className="wz-row__meta">{s.oz}</span>
                </span>
                <span className="wz-row__price">{fmt(s.price)}</span>
              </button>
            );
          })}
        </div>
      </StepShell>
    );

    if (step === 1) return (
      <StepShell kind="one" n={2} title="¿Con qué salsa?"
        sub="Opcional · sin costo" pill="Opcional">
        <p className="wz-note">Tu elección queda anotada en el resumen, sin costo extra. Si prefieres, elige <b>"Sin salsa"</b>.</p>
        <div className="wz-list">
          {[...M.SALSAS, { id: 'none', name: 'Sin salsa' }].map((s) => {
            const on = salsa === s.id;
            return (
              <button key={s.id} className={'wz-row' + (on ? ' is-on' : '') + (s.id === 'none' ? ' wz-row--none' : '')} onClick={() => setSalsa(s.id)} aria-pressed={on}>
                <span className="wz-row__radio" aria-hidden="true"></span>
                <span className="wz-row__main">
                  <span className="wz-row__name">{s.name}</span>
                  {s.id !== 'none' && <span className="wz-row__meta">Incluida</span>}
                </span>
                <span className="wz-row__price wz-row__price--free">{s.id === 'none' ? '—' : 'sin costo'}</span>
              </button>
            );
          })}
        </div>
      </StepShell>
    );

    if (step === 2) return (
      <StepShell kind="many" n={3} title="Toppings clásicos"
        sub={`2 incluidos · cada extra +${fmt(EXTRA_CLAS)}`} pill="Elige varios"
        counter={<Counter total={clas.length} incl={INCL_CLAS} extras={clasExtras} extraPrice={EXTRA_CLAS} />}>
        <div className="wz-chips">
          {M.TOPPINGS_CLASICOS.map((t) => (
            <ChipTop key={t.id} t={t} list={clas}
              tier={tierOf(clas, t.id, INCL_CLAS)} extraPrice={EXTRA_CLAS}
              onClick={() => toggle(clas, setClas, t.id)} />
          ))}
        </div>
      </StepShell>
    );

    if (step === 3) return (
      <StepShell kind="many" n={4} title="Toppings premium"
        sub={`1 incluido · cada extra +${fmt(EXTRA_PREM)}`} pill="Elige varios"
        counter={<Counter total={prem.length} incl={INCL_PREM} extras={premExtras} extraPrice={EXTRA_PREM} />}>
        <div className="wz-chips">
          {M.TOPPINGS_PREMIUM.map((t) => (
            <ChipTop key={t.id} t={t} list={prem}
              tier={tierOf(prem, t.id, INCL_PREM)} extraPrice={EXTRA_PREM}
              onClick={() => toggle(prem, setPrem, t.id)} />
          ))}
        </div>
      </StepShell>
    );
  };

  /* ---------- Subcomponentes ---------- */
  function StepShell({ kind, n, title, sub, pill, counter, children }) {
    return (
      <div className={'wz-step wz-step--' + kind} key={n} style={{ '--dir': dir }}>
        <div className="wz-step__head">
          <div className="wz-step__titles">
            {pill && <span className={'wz-pill' + (pill === 'Opcional' ? ' wz-pill--opt' : '')}>{pill}</span>}
            <h2 className="wz-step__title">{title}</h2>
            <p className="wz-step__sub">{sub}</p>
          </div>
          <span className={'wz-kind ' + (kind === 'one' ? 'wz-kind--one' : 'wz-kind--many')}>
            {kind === 'one' ? 'Elige 1' : 'Elige varios'}
          </span>
        </div>
        {counter}
        {children}
      </div>
    );
  }

  function Counter({ total, incl, extras, extraPrice }) {
    return (
      <div className="wz-counter">
        <span className="wz-counter__seg">
          <b>{total}</b> elegido{total === 1 ? '' : 's'}
        </span>
        <span className="wz-counter__sep" aria-hidden="true"></span>
        <span className={'wz-counter__seg' + (extras ? ' is-extra' : '')}>
          <b>{extras}</b> extra{extras === 1 ? '' : 's'}
          {extras > 0 && <em> · +{fmt(extras * extraPrice)}</em>}
        </span>
        <span className="wz-counter__incl">{incl} incluido{incl === 1 ? '' : 's'}</span>
      </div>
    );
  }

  function ChipTop({ t, list, tier, extraPrice, onClick }) {
    const on = list.includes(t.id);
    return (
      <button className={'wz-chip' + (on ? ' is-on' : '') + (tier === 'extra' ? ' is-extra' : '')}
        onClick={onClick} aria-pressed={on}>
        <span className="wz-chip__tick" aria-hidden="true"><I.check /></span>
        <span className="wz-chip__name">{t.name}</span>
        {on && (
          tier === 'incl'
            ? <span className="wz-chip__tag wz-chip__tag--incl">incluido</span>
            : <span className="wz-chip__tag wz-chip__tag--extra">+{fmt(extraPrice)}</span>
        )}
      </button>
    );
  }

  function Confirm() { return null; }

  /* ---------- Chrome (progreso + barra inferior) ---------- */
  const stepNum = step + 1;
  const ctaLabel = step === 3 ? (editMode ? 'Guardar cambios' : 'Agregar al pedido') : 'Siguiente';

  return (
    <div className="wz">
      {/* Top: progreso + volver */}
      <header className="wz-top">
        <div className="wz-top__in">
          <button className="wz-back" onClick={prev} aria-label="Volver">
            <I.back /> <span>{step === 0 ? (editMode ? 'Cancelar' : 'Volver') : 'Volver'}</span>
          </button>
          <span className="wz-progress__label">{editMode ? 'Editando' : 'Paso'} {stepNum} <span>/ 4</span></span>
          <Logo size={0.72} />
        </div>
        <div className="wz-progress" role="progressbar" aria-valuenow={stepNum} aria-valuemin={1} aria-valuemax={4}>
          {STEPS.map((s, i) => (
            <span key={i} className={'wz-progress__seg' + (i < stepNum ? ' is-done' : '') + (i === step ? ' is-active' : '')}></span>
          ))}
        </div>
      </header>

      {/* Cuerpo: una pregunta por pantalla */}
      <main className="wz-body">
        <div className="container wz-body__in">
          {renderStep()}
        </div>
      </main>

      {/* Barra inferior: total + acción */}
      <footer className="wz-bar">
        <div className="wz-bar__in container">
          <div className="wz-bar__total">
            <span className="wz-bar__label">{step === 3 ? 'Subtotal' : 'Total'}</span>
            <span className="wz-bar__num">{fmt(total)}</span>
          </div>
          <button className="btn btn--primary wz-bar__cta" onClick={next}>
            {ctaLabel} <I.arrow />
          </button>
        </div>
      </footer>
    </div>
  );
}

window.ArmadorWizard = ArmadorWizard;
