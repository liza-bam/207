/* 207 HouseKeeping — sections part 3: TUNING, BOOKING & MARKETING, À LA CARTE */
const D3 = window.DATA;
const Icon3 = window.Icon;
const useReveal3 = window.useReveal;
const fmt3 = window.fmt;
const SvcLabel3 = window.SvcLabel;

/* ---------- 2) Staging & renovation ---------- */
function Tuning({ onContact }) {
  const ref = useReveal3();
  const T = D3.TUNING;
  return (
    <section className="section theme-lagoon" id="tuning" ref={ref} style={{ borderWidth: "0px 0px 2px", borderStyle: "solid", backgroundColor: "rgb(195, 246, 254)" }}>
      <div className="wrap">
        <div className="sr-head reveal-up">
          <span className="sr-eyebrow">Project based</span>
          <h2 className="sr-title">Staging and renovation</h2>
          <p className="sr-sub">Turn a plain house into a place guests fight to book &mdash; or flip a tired property fast on a budget.</p>
        </div>

        {/* Two paths, with images */}
        <div className="sr-paths">
          {T.paths.map((p) =>
          <div key={p.id} className="sr-info reveal-up">
              <img className="sr-info-img" src={"photos/sr-" + p.id + ".jpg"} alt={p.title} />
              <div className="sr-info-body">
                <span className="sr-info-tag">{p.sub}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="sr-timeline reveal-up">
          {T.timeline.map((s, i) =>
          <React.Fragment key={i}>
              <div className={"sr-step" + (s.book ? " sr-step--book" : "")}>
                <span className="sr-num">{s.n}</span>
                <h4>{s.title}{s.price ? <span className="sr-step-price"> &mdash; {s.price}</span> : null}</h4>
                <p>{s.desc}</p>
                {s.book ?
              <div className="sr-book">
                    <button className="btn btn-primary btn-block" onClick={onContact}>Book your consultation</button>
                    <a className="sr-book-call" href={"tel:" + D3.PHONE_TEL}>{D3.PHONE_DISPLAY}</a>
                  </div> : null}
              </div>
              {i < T.timeline.length - 1 ? <span className="sr-arrow" aria-hidden="true">&rarr;</span> : null}
            </React.Fragment>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- 3) Booking & Marketing ---------- */
function Marketing({ onContact }) {
  const ref = useReveal3();
  const W = D3.WHY_FLAT;
  return (
    <section className="section section--alt theme-neon" id="marketing" ref={ref} style={{ borderWidth: "0px 0px 2px", borderStyle: "solid", backgroundColor: "rgb(236, 254, 207)" }}>
      <div className="wrap">
        <div className="section-head section-head--center reveal-up">
          <span className="sr-eyebrow">Digital services</span>
          <h2 className="h2">Booking &amp; Marketing</h2>
          <p className="lead">Keep your listing sharp and your guests happy. Flat monthly pricing.</p>
        </div>

        <div className="mkt-grid">
          {D3.MARKETING_TIERS.map((t, i) =>
          <div key={i} className={"mkt-card reveal-up" + (t.popular ? " popular" : "")} style={{ transitionDelay: i * 70 + "ms" }}>
              {t.popular && <span className="mkt-flag" style={{ backgroundColor: "rgb(209, 252, 0)" }}>Most popular</span>}
              <div className="mkt-name">{t.name}</div>
              <div className="mkt-price"><span className="amt">{fmt3(t.price)}</span><span className="per">/ month</span></div>
              {t.setup && <div className="mkt-setup">+ {fmt3(t.setup)} one-time setup</div>}
              <div className="mkt-pitch">{t.pitch}</div>
              <ul className="mkt-features">
                {t.features.map((f, j) =>
              <li key={j}><span className="mkt-tick"><Icon3 name="check" size={12} /></span>{f}</li>
              )}
              </ul>
              <button className={"btn btn-block " + (t.popular ? "btn-primary" : "btn-outline")} onClick={onContact}>
                Choose {t.name}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- 4) À la carte ---------- */
function Alacarte({ onContact }) {
  const ref = useReveal3();
  return (
    <section className="section theme-lemon" id="alacarte" ref={ref} style={{ backgroundColor: "rgb(246, 252, 180)" }}>
      <div className="wrap">
        <div className="section-head section-head--center reveal-up">
          <span className="sr-eyebrow">À la carte</span>
          <h2 className="h2">Single Services</h2>
          <p className="lead">Flat rate where the job is predictable, a transparent quote where it isn't.</p>
        </div>

        <div className="alc-grid">
          {D3.ALACARTE.map((g, i) =>
          <div key={i} className="alc-group reveal-up" style={{ transitionDelay: i % 2 * 60 + "ms" }}>
              <div className="alc-group-head">
                <span className="alc-group-icon"><Icon3 name={g.icon} size={18} /></span>
                <h4>{g.group}</h4>
              </div>
              <div className="alc-items">
                {g.items.map((it, j) =>
              <div key={j} className="alc-item">
                    <div className="alc-item-top">
                      <span className="alc-name">{it.name}</span>
                      <span className="alc-price">{it.price}</span>
                    </div>
                    <p className="alc-desc">{it.desc}</p>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>

        <div className="alc-foot reveal-up">
          <div className="alc-notes">
            <span className="alc-notes-label"><Icon3 name="clock" size={16} /> Good to know</span>
            <ul>
              {D3.ALACARTE_NOTES.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
          <button className="btn btn-primary btn-lg alc-cta" onClick={onContact}>
            Request a job <Icon3 name="arrow" size={16} />
          </button>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Tuning, Marketing, Alacarte });