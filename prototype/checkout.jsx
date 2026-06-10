/* ============================================================
   D'FRUTA MADRE — CHECKOUT
   A) Resumen del carrito · B) Datos de entrega · C) Mensaje WhatsApp
   ============================================================ */

/* ---------- Cálculo de un ítem armado ---------- */
function computeItem(it) {
  const M = window.MENU;
  const sizeObj = M.SIZES.find((s) => s.id === it.size);
  const salsaName = it.salsa === 'none' ? 'Sin salsa' : (M.SALSAS.find((s) => s.id === it.salsa)?.name || '—');
  const clasNames = it.clas.map((id) => M.TOPPINGS_CLASICOS.find((t) => t.id === id)?.name).filter(Boolean);
  const premNames = it.prem.map((id) => M.TOPPINGS_PREMIUM.find((t) => t.id === id)?.name).filter(Boolean);
  const clasExtras = Math.max(0, it.clas.length - 2);
  const premExtras = Math.max(0, it.prem.length - 1);
  const clasCost = clasExtras * 3000;
  const premCost = premExtras * 3500;
  const subtotal = sizeObj.price + clasCost + premCost;
  return { sizeObj, salsaName, clasNames, premNames, clasExtras, premExtras, clasCost, premCost, subtotal };
}
const cartTotal = (cart) => cart.reduce((a, it) => a + computeItem(it).subtotal, 0);

/* ---------- Mensaje de WhatsApp ---------- */
function buildOrderMessage(cart, delivery) {
  const fmt = window.fmt;
  const L = [];
  L.push("¡Hola D'Fruta Madre! 🍓 Quiero hacer este pedido:");
  L.push('');
  cart.forEach((it, i) => {
    const c = computeItem(it);
    L.push(`🍓 Fresas #${i + 1} — ${c.sizeObj.name} (${c.sizeObj.oz})`);
    L.push(`   Salsa: ${c.salsaName}`);
    if (c.clasNames.length) L.push(`   Clásicos: ${c.clasNames.join(', ')}${c.clasExtras ? `  (${c.clasExtras} extra +${fmt(c.clasCost)})` : ''}`);
    if (c.premNames.length) L.push(`   Premium: ${c.premNames.join(', ')}${c.premExtras ? `  (${c.premExtras} extra +${fmt(c.premCost)})` : ''}`);
    L.push(`   Subtotal: ${fmt(c.subtotal)}`);
    L.push('');
  });
  L.push(`💰 TOTAL: ${fmt(cartTotal(cart))}`);
  L.push('');
  L.push(`📍 Dirección: ${delivery.address || '—'}`);
  if (delivery.reference && delivery.reference.trim()) L.push(`🗺️ Referencia: ${delivery.reference.trim()}`);
  const pago = delivery.payment === 'transferencia' ? 'Transferencia' : 'Efectivo';
  let pagoLine = `💵 Pago: ${pago}`;
  if (delivery.payment === 'efectivo' && delivery.cashWith && String(delivery.cashWith).trim()) {
    pagoLine += ` (pago con ${fmt(Number(String(delivery.cashWith).replace(/\D/g, '')) || 0)})`;
  }
  L.push(pagoLine);
  L.push('');
  L.push('¿Me confirmas disponibilidad y domicilio? 🛵');
  return L.join('\n');
}
function waUrlFor(cart, delivery) {
  return `https://wa.me/${window.MENU.BRAND.phoneIntl}?text=${encodeURIComponent(buildOrderMessage(cart, delivery))}`;
}

/* ============================================================
   A) RESUMEN DEL CARRITO
   ============================================================ */
function CartView({ cart, onEdit, onRemove, onAddAnother, onCheckout, onBack }) {
  const fmt = window.fmt;
  const total = cartTotal(cart);

  return (
    <div className="co">
      <header className="co-top">
        <div className="co-top__in">
          <button className="co-back" onClick={onBack} aria-label="Volver"><I.back /> <span>Volver</span></button>
          <span className="co-top__title">Tu pedido</span>
          <Logo size={0.72} />
        </div>
      </header>

      <main className="co-body">
        <div className="container co-body__in">
          {cart.length === 0 ? (
            <div className="co-empty">
              <img src="assets/mascot-fresa.png" alt="" className="co-empty__img" />
              <h2 className="co-empty__title">Tu pedido está vacío</h2>
              <p className="co-empty__sub">Arma tu primera fresa con crema y aparecerá aquí.</p>
              <button className="btn btn--primary" onClick={onAddAnother}>Arma tus fresas <I.arrow /></button>
            </div>
          ) : (
            <React.Fragment>
              <div className="co-head">
                <span className="badge badge--green"><I.cart /> {cart.length} {cart.length === 1 ? 'fresa armada' : 'fresas armadas'}</span>
              </div>

              <div className="cart-list">
                {cart.map((it, i) => {
                  const c = computeItem(it);
                  return (
                    <article className="cart-card" key={it.id}>
                      <div className="cart-card__media">
                        <img src="assets/cup-fresa-helado.png" alt="" style={{ transform: `scale(${0.7 + it ? c.sizeObj.scale * 0.26 : 1})` }} />
                      </div>
                      <div className="cart-card__body">
                        <div className="cart-card__top">
                          <h3 className="cart-card__name">Fresas #{i + 1}</h3>
                          <span className="cart-card__sub">{fmt(c.subtotal)}</span>
                        </div>
                        <p className="cart-card__size">{c.sizeObj.name} · {c.sizeObj.oz}</p>

                        <dl className="cart-card__specs">
                          <div><dt>Salsa</dt><dd>{c.salsaName}</dd></div>
                          <div>
                            <dt>Clásicos</dt>
                            <dd>{c.clasNames.length ? c.clasNames.join(', ') : '—'}
                              {c.clasExtras > 0 && <em className="cart-card__extra"> +{fmt(c.clasCost)}</em>}</dd>
                          </div>
                          <div>
                            <dt>Premium</dt>
                            <dd>{c.premNames.length ? c.premNames.join(', ') : '—'}
                              {c.premExtras > 0 && <em className="cart-card__extra"> +{fmt(c.premCost)}</em>}</dd>
                          </div>
                        </dl>

                        <div className="cart-card__actions">
                          <button className="cart-act" onClick={() => onEdit(it.id)}><I.edit /> Editar</button>
                          <button className="cart-act cart-act--del" onClick={() => onRemove(it.id)}><I.trash /> Eliminar</button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="cart-total">
                <span className="cart-total__label">Total del pedido</span>
                <span className="cart-total__num">{fmt(total)}</span>
              </div>

              <button className="btn btn--secondary btn--block cart-another" onClick={onAddAnother}>
                <I.pencilPlus style={{ fontSize: '1.1em' }} /> Realizar otro pedido
              </button>
            </React.Fragment>
          )}
        </div>
      </main>

      {cart.length > 0 && (
        <footer className="co-bar">
          <div className="co-bar__in container">
            <div className="co-bar__total">
              <span className="co-bar__label">Total</span>
              <span className="co-bar__num">{fmt(total)}</span>
            </div>
            <button className="btn btn--primary co-bar__cta" onClick={onCheckout}>Agregar dirección <I.arrow /></button>
          </div>
        </footer>
      )}
    </div>
  );
}

/* ============================================================
   B) DATOS DE ENTREGA
   ============================================================ */
function DeliveryView({ cart, delivery, setDelivery, onBack, onSubmit }) {
  const fmt = window.fmt;
  const total = cartTotal(cart);
  const [touched, setTouched] = React.useState(false);
  const addrError = touched && !delivery.address.trim();

  const set = (k, v) => setDelivery((d) => ({ ...d, [k]: v }));

  const submit = () => {
    if (!delivery.address.trim()) { setTouched(true); document.querySelector('.dl-addr')?.focus(); return; }
    onSubmit();
  };

  return (
    <div className="co">
      <header className="co-top">
        <div className="co-top__in">
          <button className="co-back" onClick={onBack} aria-label="Volver"><I.back /> <span>Volver</span></button>
          <span className="co-top__title">Datos de entrega</span>
          <Logo size={0.72} />
        </div>
      </header>

      <main className="co-body">
        <div className="container co-body__in dl">
          <p className="dl-intro">Solo nos falta dónde llevarlas. <b>No pedimos tu teléfono</b> — WhatsApp ya lo lleva. 🛵</p>

          <label className="field dl-field">
            <span className="field__label">Dirección <em className="req">obligatorio</em></span>
            <textarea className={'textarea dl-addr' + (addrError ? ' is-error' : '')}
              value={delivery.address} onChange={(e) => set('address', e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Calle / carrera, número, barrio, casa o apto…" />
            {addrError && <span className="dl-err">Necesitamos la dirección para el domicilio.</span>}
          </label>

          <label className="field dl-field">
            <span className="field__label">Punto de referencia</span>
            <input className="input" value={delivery.reference} onChange={(e) => set('reference', e.target.value)}
              placeholder="Ej: portón verde, frente a la tienda…" />
          </label>

          <div className="field dl-field">
            <span className="field__label">Método de pago</span>
            <div className="dl-pay">
              {[
                { id: 'efectivo', name: 'Efectivo', ic: '💵' },
                { id: 'transferencia', name: 'Transferencia', ic: '📲' },
              ].map((p) => (
                <button key={p.id} type="button"
                  className={'dl-pay__opt' + (delivery.payment === p.id ? ' is-on' : '')}
                  aria-pressed={delivery.payment === p.id}
                  onClick={() => set('payment', p.id)}>
                  <span className="dl-pay__ic" aria-hidden="true">{p.ic}</span>
                  <span className="dl-pay__name">{p.name}</span>
                  <span className="dl-pay__radio" aria-hidden="true"></span>
                </button>
              ))}
            </div>
          </div>

          {delivery.payment === 'efectivo' && (
            <label className="field dl-field dl-cash">
              <span className="field__label">¿Con cuánto pagas? <em className="opt">opcional</em></span>
              <input className="input" inputMode="numeric" value={delivery.cashWith}
                onChange={(e) => set('cashWith', e.target.value)}
                placeholder="Ej: 50.000 — para llevar el cambio" />
            </label>
          )}

          <div className="dl-reminder">
            <span className="dl-reminder__label">Total a pagar</span>
            <span className="dl-reminder__num">{fmt(total)}</span>
          </div>
        </div>
      </main>

      <footer className="co-bar">
        <div className="co-bar__in container">
          <div className="co-bar__total">
            <span className="co-bar__label">Total</span>
            <span className="co-bar__num">{fmt(total)}</span>
          </div>
          <button className="btn btn--primary co-bar__cta" onClick={submit}>Finalizar pedido <I.arrow /></button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   C) MENSAJE DE WHATSAPP (vista previa)
   ============================================================ */
function WhatsAppView({ cart, delivery, onBack }) {
  const M = window.MENU;
  const msg = buildOrderMessage(cart, delivery);
  const url = waUrlFor(cart, delivery);
  const lines = msg.split('\n');
  const now = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="co wa-view">
      <header className="co-top co-top--wa">
        <div className="co-top__in">
          <button className="co-back co-back--wa" onClick={onBack} aria-label="Volver"><I.back /> <span>Volver</span></button>
          <span className="co-top__title co-top__title--wa">Vista previa</span>
          <span style={{ width: 64 }}></span>
        </div>
      </header>

      <main className="co-body">
        <div className="container wa-wrap">
          <p className="wa-explain">
            <b>Así llega tu pedido por WhatsApp.</b> El mensaje va <u>pre-escrito</u> — solo tienes que presionar <b>enviar</b>. ✅
          </p>

          <div className="wa-phone">
            <div className="wa-phone__bar">
              <span className="wa-phone__avatar"><img src="assets/mascot-fresa.png" alt="" /></span>
              <span className="wa-phone__id">
                <b>D'Fruta Madre</b>
                <em>en línea</em>
              </span>
              <span className="wa-phone__ic"><I.phone /></span>
            </div>

            <div className="wa-phone__chat">
              <div className="wa-day">HOY</div>
              <div className="wa-bubble">
                {lines.map((ln, i) => (
                  <span className="wa-line" key={i}>{ln === '' ? '\u00A0' : ln}</span>
                ))}
                <span className="wa-bubble__meta">{now} <span className="wa-ticks">✓✓</span></span>
              </div>
              <div className="wa-compose">
                <span className="wa-compose__box">Mensaje pre-escrito…</span>
                <span className="wa-compose__send"><I.send /></span>
              </div>
            </div>
          </div>

          <a className="btn btn--wa btn--block wa-open" href={url} target="_blank" rel="noopener">
            <I.wa /> Abrir WhatsApp y enviar
          </a>
          <p className="wa-fine">Se abre el chat con +57 300 841 53 68 y el mensaje ya escrito.</p>
          <button className="btn btn--ghost btn--block" onClick={onBack}>Volver a editar</button>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { computeItem, cartTotal, buildOrderMessage, waUrlFor, CartView, DeliveryView, WhatsAppView });
