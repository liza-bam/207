/* 207 HouseKeeping — sections part 3: TUNING, BOOKING & MARKETING, À LA CARTE */
const D3 = window.DATA;
const Icon3 = window.Icon;
const useReveal3 = window.useReveal;
const fmt3 = window.fmt;
const SvcLabel3 = window.SvcLabel;

/* ---------- 2) Tuning ---------- */
function Tuning({ onContact }) {
  const ref = useReveal3();
  const T = D3.TUNING;
  return (
    <section className="section" id="tuning" ref={ref}>
      <div className="wrap">
        <div className="section-head section-head--center reveal-up">
          <SvcLabel3 n="2" of="4" name="Tuning" />
          <h2 className="h2">From livable to booked solid</h2>
          <p className="lead">
            Turn a plain house into a place guests fight to book &mdash; or flip a tired property fast on a
            budget. We scope it, quote it flat, and make it happen.
          </p>
        </div>

        {/* How it works */}
        <div className="tune-steps reveal-up">
          {T.steps.map((s, i) => (
            <div key={i} className="tune-step">
              <span className="tune-n">{s.n}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two ways to tune */}
        <div className="section-head section-head--center section-head--sm reveal-up">
          <span className="mini-eyebrow">Two ways to tune</span>
        </div>
        <div className="tune-paths">
          {T.paths.map((p, i) => (
            <div key={i} className="tune-path reveal-up" style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="tune-path-icon"><Icon3 name={p.icon} size={22} /></span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Visualization + CTA */}
        <div className="tune-foot reveal-up">
          <div className="tune-viz">
            <span className="tune-viz-flag">Optional · ${T.visualization}</span>
            <h4>Visualization</h4>
            <p>{T.viz}</p>
          </div>
          <div className="tune-cta-card">
            <div className="tune-cta-price">${T.consult}</div>
            <p>Book your consult &mdash; credited toward your project.</p>
            <button className="btn btn-primary btn-lg btn-block" onClick={onContact}>
              <Icon3 name="wand" size={17} /> Book your consult
            </button>
            <a className="tune-cta-call" href={"tel:" + D3.PHONE_TEL}>
              <Icon3 name="phone" size={15} /> {D3.PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3) Booking & Marketing ---------- */
function Marketing({ onContact }) {
  const ref = useReveal3();
  const W = D3.WHY_FLAT;
  return (
    <section className="section section--alt" id="marketing" ref={ref}>
      <div className="wrap">
        <div className="section-head section-head--center reveal-up">
          <SvcLabel3 n="3" of="4" name="Booking & Marketing" />
          <h2 className="h2">Pick how much you want handled</h2>
          <p className="lead">
            Keep your listing sharp and your guests happy &mdash; without the percentage cut. Flat monthly
            pricing, three levels. Start where you like and move up anytime.
          </p>
        </div>

        <div className="mkt-grid">
          {D3.MARKETING_TIERS.map((t, i) => (
            <div key={i} className={"mkt-card reveal-up" + (t.popular ? " popular" : "")} style={{ transitionDelay: i * 70 + "ms" }}>
              {t.popular && <span className="mkt-flag">Most popular</span>}
              <div className="mkt-name">{t.name}</div>
              <div className="mkt-price"><span className="amt">{fmt3(t.price)}</span><span className="per">/ month</span></div>
              {t.setup && <div className="mkt-setup">+ {fmt3(t.setup)} one-time setup</div>}
              <div className="mkt-pitch">{t.pitch}</div>
              <ul className="mkt-features">
                {t.features.map((f, j) => (
                  <li key={j}><span className="mkt-tick"><Icon3 name="check" size={12} /></span>{f}</li>
                ))}
              </ul>
              <button className={"btn btn-block " + (t.popular ? "btn-primary" : "btn-outline")} onClick={onContact}>
                Choose {t.name}
              </button>
            </div>
          ))}
        </div>

        {/* Why flat — Them vs us comparison */}
        <div className="whyflat reveal-up">
          <div className="whyflat-head">
            <span className="whyflat-icon"><Icon3 name="tag" size={22} /></span>
            <h3>{W.title}</h3>
          </div>
          <div className="whyflat-compare">
            <div className="wf-col wf-col--them">
              <div className="wf-col-label">Most managers</div>
              <div className="wf-col-stat">20%+</div>
              <p>of everything you earn — every booking, every season.</p>
            </div>
            <div className="wf-col wf-col--us">
              <div className="wf-col-label">207 HouseKeeping</div>
              <div className="wf-col-stat">$0</div>
              <p>we never take a cut. One flat price; you keep the rest.</p>
            </div>
          </div>
          <p className="whyflat-foot">Pairs with housekeeping for full coverage.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4) À la carte ---------- */
function Alacarte({ onContact }) {
  const ref = useReveal3();
  return (
    <section className="section" id="alacarte" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal-up">
          <SvcLabel3 n="4" of="4" name="À la carte" />
          <h2 className="h2">Pay per job &mdash; no plan, no commitment</h2>
          <p className="lead">
            Book any single service on its own, whenever you need it. Flat rates where the job is
            predictable, a quick quote where it isn't &mdash; always clear before we start.
          </p>
        </div>

        <div className="alc-grid">
          {D3.ALACARTE.map((g, i) => (
            <div key={i} className="alc-group reveal-up" style={{ transitionDelay: (i % 2) * 60 + "ms" }}>
              <div className="alc-group-head">
                <span className="alc-group-icon"><Icon3 name={g.icon} size={18} /></span>
                <h4>{g.group}</h4>
              </div>
              <div className="alc-items">
                {g.items.map((it, j) => (
                  <div key={j} className="alc-item">
                    <div className="alc-item-top">
                      <span className="alc-name">{it.name}</span>
                      <span className="alc-price">{it.price}</span>
                    </div>
                    <p className="alc-desc">{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
    </section>
  );
}

Object.assign(window, { Tuning, Marketing, Alacarte });
