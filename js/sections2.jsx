/* 207 HouseKeeping — sections part 2: HOUSEKEEPING subscription (plan, included, extras, value) */
const D2 = window.DATA;
const Icon2 = window.Icon;
const useReveal2 = window.useReveal;
const fmt2 = window.fmt;

/* ---------- Section label chip ---------- */
function SvcLabel({ n, of, name }) {
  return (
    <span className="svc-label">
      <span className="svc-label-n">Service {n}<span className="of"> / {of}</span></span>
      <span className="svc-label-name">{name}</span>
    </span>
  );
}
window.SvcLabel = SvcLabel;

/* ---------- Housekeeping: the plan ---------- */
function Housekeeping({ onStart }) {
  const ref = useReveal2();
  const P = D2.PLAN;
  return (
    <section className="section section--alt" id="housekeeping" ref={ref}>
      <div className="wrap">
        <div className="section-head section-head--center reveal-up">
          <SvcLabel n="1" of="4" name="Housekeeping" />
          <h2 className="h2">Your whole month, handled</h2>
          <p className="lead">
            A flat-rate subscription that covers the everyday rhythm of your rental &mdash; no percentage
            of your bookings, no surprise invoices.
          </p>
        </div>

        <div className="plan-card reveal-up">
          <span className="bubble-motif" aria-hidden="true" />
          <div className="plan-main">
            <div className="plan-name">{P.name}</div>
            <div className="plan-price">
              <span className="amt">{fmt2(P.price)}</span>
              <span className="per">/ month</span>
            </div>
            <p className="plan-note">{P.note}</p>
            <div className="plan-cta">
              <button className="btn btn-primary btn-xl" onClick={onStart}>
                <Icon2 name="wand" size={18} /> Build your plan
              </button>
              <a className="btn btn-ghost-light btn-xl" href={"tel:" + D2.PHONE_TEL}>
                <Icon2 name="phone" size={18} /> Call now
              </a>
            </div>
          </div>
          <div className="plan-founding">
            <span className="fchip">Founding offer</span>
            <div className="famt">{fmt2(P.founding)}<span>/ mo</span></div>
            <p>The next <strong>{P.foundingSpots} owners</strong> lock in this rate for a full year.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- What's included ---------- */
function Included() {
  const ref = useReveal2();
  return (
    <section className="section" id="included" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal-up">
          <span className="eyebrow">Every month, we take care of</span>
          <h2 className="h2">The whole rhythm, covered</h2>
          <p className="lead">
            Six things that never stop &mdash; all rolled into your flat monthly price.
          </p>
        </div>
        <div className="incl-grid">
          {D2.INCLUDED.map((s, i) => (
            <div key={s.id} className="incl-card reveal-up" style={{ transitionDelay: (i % 3) * 60 + "ms" }}>
              <span className="incl-bubble"><Icon2 name={s.icon} size={22} /></span>
              <div className="incl-body">
                <h4>{s.name}</h4>
                <div className="incl-short">{s.short}</div>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
          <div className="incl-card incl-cta reveal-up">
            <div className="incl-body">
              <div className="incl-short t-lime">Included &amp; flat</div>
              <h4 className="t-paper">All of it, for {fmt2(D2.PLAN.price)} a month</h4>
              <p className="t-on-dark-soft">
                That's roughly {D2.VALUE_TOTAL} of everyday upkeep handled &mdash; without you
                lifting a finger or watching the invoice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Extras (monthly add-ons) ---------- */
function Extras() {
  const ref = useReveal2();
  return (
    <section className="section section--alt" id="extras" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal-up">
          <span className="eyebrow">Scale it to your place</span>
          <h2 className="h2">Simple add-ons</h2>
          <p className="lead">
            Bigger lot or a larger home? Add exactly what you need at a clear flat monthly rate &mdash;
            no surprises, ever.
          </p>
        </div>
        <div className="extra-grid">
          {D2.EXTRAS.map((e, i) => (
            <div key={i} className={"extra-card reveal-up" + (e.featured ? " featured" : "")} style={{ transitionDelay: i * 70 + "ms" }}>
              {e.featured && <span className="extra-flag">Best value</span>}
              <span className="extra-icon"><Icon2 name={e.icon} size={22} /></span>
              <h4>{e.name}</h4>
              <div className="extra-price">
                <span className="amt">+{fmt2(e.price)}</span>
                <span className="unit">{e.unit}</span>
              </div>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
        <p className="extra-foot reveal-up">
          Add-ons are billed flat each month alongside your plan. One-off bigger projects are always
          quoted up front &mdash; just ask.
        </p>
      </div>
    </section>
  );
}

/* ---------- Value comparison ---------- */
function ValueTable() {
  const ref = useReveal2();
  return (
    <section className="section" id="value" ref={ref}>
      <div className="wrap">
        <div className="section-head section-head--center reveal-up">
          <span className="eyebrow">Do the math</span>
          <h2 className="h2">Piece by piece vs. your plan</h2>
          <p className="lead">
            Here's what the same care would cost if you booked it one job at a time.
          </p>
        </div>

        <div className="value-table reveal-up">
          <div className="vt-head">
            <span>Service</span>
            <span>Pay as you go</span>
            <span>With your plan</span>
            <span className="num">Monthly value</span>
          </div>
          {D2.VALUE_ROWS.map((r, i) => (
            <div key={i} className="vt-row">
              <span className="vt-svc" data-k="Service">{r.service}</span>
              <span data-k="Pay as you go">{r.payg}</span>
              <span data-k="With your plan"><span className="vt-tick"><Icon2 name="check" size={11} /></span>{r.plan}</span>
              <span className="num" data-k="Monthly value">{r.value}</span>
            </div>
          ))}
          <div className="vt-total">
            <span className="vt-svc">Total value</span>
            <span className="vt-spacer" />
            <span className="vt-totlabel">if booked separately</span>
            <span className="num strike">{D2.VALUE_TOTAL}</span>
          </div>
          <div className="vt-pay">
            <span className="vt-svc">You pay</span>
            <span className="vt-spacer" />
            <span className="vt-totlabel">flat, every month</span>
            <span className="num big">{D2.VALUE_PAY}</span>
          </div>
        </div>

        <p className="value-foot reveal-up">
          That's <strong>{D2.VALUE_TOTAL}</strong> of care for <strong>{D2.VALUE_PAY}</strong> &mdash;
          and just <strong>{fmt2(D2.PLAN.founding)}</strong> if you're one of our first {D2.PLAN.foundingSpots} owners.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { Housekeeping, Included, Extras, ValueTable });
