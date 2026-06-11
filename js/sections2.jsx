/* 207 HouseKeeping — sections part 2: HOUSEKEEPING (header, included flip cards + savings popup, extras) */
const D2 = window.DATA;
const Icon2 = window.Icon;
const useReveal2 = window.useReveal;
const fmt2 = window.fmt;
const { useState: useState2 } = React;

/* ---------- Section label chip (used by sections3) ---------- */
function SvcLabel({ n, of, name }) {
  return (
    <span className="svc-label">
      <span className="svc-label-n">Service {n}<span className="of"> / {of}</span></span>
      <span className="svc-label-name">{name}</span>
    </span>);

}
window.SvcLabel = SvcLabel;

/* ---------- Housekeeping: tight header ---------- */
function Housekeeping() {
  const ref = useReveal2();
  return (
    <section className="section section--alt theme-teal" id="housekeeping" ref={ref} style={{ backgroundColor: "rgb(204, 255, 228)" }}>
      <div className="wrap">
        <div className="hk-head reveal-up">
          <span className="hk-eyebrow" style={{ borderWidth: "1px", borderStyle: "solid" }}>Central Maine special</span>
          <h2 className="hk-title">Housekeeping subscription</h2>
        </div>
      </div>
    </section>);

}

/* ---------- Savings table popup ---------- */
function SavingsModal({ open, onClose }) {
  if (!open) return null;
  const mailBody =
  "Housekeeping Subscription Savings%0D%0A%0D%0A" +
  D2.VALUE_ROWS.map((r) => r.service + " \u2014 Qty " + r.qty + " \u2014 " + r.amount).join("%0D%0A") +
  "%0D%0A%0D%0ATotal value: " + D2.VALUE_TOTAL +
  "%0D%0AYou pay (flat, every month): " + D2.VALUE_PAY +
  "%0D%0AYou save: " + D2.VALUE_SAVINGS + " every month.";
  const mailto = "mailto:?subject=Housekeeping%20Subscription%20Savings&body=" + mailBody;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal savings-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <h3 className="modal-title">Housekeeping subscription savings</h3>
        <div className="value-table">
          <div className="vt-head">
            <span>Service</span>
            <span className="num">Qty</span>
            <span className="num">Amount</span>
          </div>
          {D2.VALUE_ROWS.map((r, i) =>
          <div key={i} className="vt-row">
              <span className="vt-svc">{r.service}</span>
              <span className="num">{r.qty}</span>
              <span className="num">{r.amount}</span>
            </div>
          )}
          <div className="vt-total">
            <span className="vt-svc">Total</span>
            <span className="num" />
            <span className="num big">{D2.VALUE_TOTAL}</span>
          </div>
          <div className="vt-save">
            <span className="vt-svc">Savings with Central Maine Plan</span>
            <span className="num" />
            <span className="num big">{D2.VALUE_SAVINGS}</span>
          </div>
          <div className="vt-pay">
            <span className="vt-svc">You pay only</span>
            <span className="num" />
            <span className="num big">{D2.VALUE_PAY}</span>
          </div>
        </div>
        <div className="modal-actions">
          <a className="btn btn-primary" href={mailto}>Email me this table</a>
          <button className="btn btn-outline" onClick={() => window.print()}>Print / Save PDF</button>
          <a className="btn btn-lime" href="assets/207-services-cheat-sheet.pdf" download="207-HouseKeeping-Services.pdf">Download full service list</a>
        </div>
      </div>
    </div>);

}

/* ---------- Included in the plan (flip cards + savings card) ---------- */
function Included() {
  const ref = useReveal2();
  const [modal, setModal] = useState2(false);
  return (
    <section className="section theme-teal" id="included" ref={ref} style={{ backgroundColor: "rgb(204, 255, 228)" }}>
      <div className="wrap">
        <p className="incl-sub reveal-up">Included in the plan</p>
        <div className="incl-grid">
          {D2.INCLUDED.map((s, i) =>
          <div key={s.id} className="incl-card flip-card reveal-up" style={{ transitionDelay: i % 3 * 60 + "ms" }}>
              <div className="flip-inner">
                <div className="flip-face flip-front">
                  <span className="incl-bubble"><Icon2 name={s.icon} size={28} /></span>
                  <div className="flip-front-text">
                    <h4>{s.name}</h4>
                    {s.short ? <div className="incl-short">{s.short}</div> : null}
                    {s.value ? <div className="incl-value">{s.value}</div> : null}
                  </div>
                </div>
                <div className="flip-face flip-back">
                  <span className="flip-back-label">{s.name}</span>
                  <p>{s.desc}</p>
                </div>
              </div>
            </div>
          )}
          <div className="incl-savings reveal-up">
            <span className="incl-savings-text"><strong>{D2.VALUE_TOTAL} value</strong> &mdash; now only <strong>{D2.VALUE_PAY} per month!</strong></span>
            <button className="btn btn-primary" onClick={() => setModal(true)}>Savings explained</button>
          </div>
        </div>
      </div>
      <SavingsModal open={modal} onClose={() => setModal(false)} />
    </section>);

}

/* ---------- Extras (monthly add-ons) ---------- */
function Extras() {
  const ref = useReveal2();
  return (
    <section className="section section--alt theme-teal" id="extras" ref={ref} style={{ borderWidth: "0px 0px 2px", borderStyle: "solid", backgroundColor: "rgb(204, 255, 228)" }}>
      <div className="wrap">
        <p className="incl-sub reveal-up">Add-ons. Add exactly what you need, at a discount rate.</p>
        <div className="extra-grid">
          {D2.EXTRAS.map((e, i) =>
          <div key={i} className="extra-card reveal-up" style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="extra-icon"><Icon2 name={e.icon} size={22} /></span>
              <h4>{e.name}</h4>
              <div className="extra-price">
                {e.was ? <span className="was">{fmt2(e.was)}</span> : null}
                <span className="amt">{fmt2(e.price)}</span>
                <span className="unit">{e.unit}</span>
              </div>
              {e.desc ? <p>{e.desc}</p> : null}
            </div>
          )}
        </div>
        <p className="extra-foot reveal-up">Add-ons are billed flat each month alongside your plan.


        </p>
        <div className="incl-savings extra-cta reveal-up" style={{ backgroundColor: "rgb(158, 255, 203)" }}>
          <span className="incl-savings-text">Explore the full list of our services</span>
          <a className="btn btn-primary" href="#alacarte">All Services</a>
        </div>
        <div className="download-strip reveal-up">
          <a className="btn btn-lime btn-lg" href="assets/207-services-cheat-sheet.pdf" download="207-HouseKeeping-Services.pdf">Download full service list</a>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Housekeeping, Included, Extras });