/* 207 HouseKeeping — sections part 1: helpers, header, hero, engagement, tiers, individual */
const { useState, useEffect, useRef } = React;
const D = window.DATA;
const Icon = window.Icon;

/* ---------- shared helpers ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = [];
    if (el.classList.contains("reveal-up")) targets.push(el);
    el.querySelectorAll(".reveal-up").forEach((n) => targets.push(n));

    const show = (n) => n.classList.add("in");
    const near = () => window.innerHeight * 1.1;
    // reveal anything already on/near screen at mount
    targets.forEach((n) => { if (n.getBoundingClientRect().top < near()) show(n); });

    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }),
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
      );
      targets.forEach((n) => { if (!n.classList.contains("in")) io.observe(n); });
    } else {
      targets.forEach(show);
    }
    // safety net: never leave content hidden
    const t = setTimeout(() => targets.forEach(show), 1800);
    return () => { io && io.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

function Bubble({ size, style }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: "50%", display: "inline-block",
      background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.7), transparent 42%), linear-gradient(140deg, var(--accent), var(--lime))",
      ...style,
    }} />
  );
}

function GoLink({ children, onClick, href }) {
  return (
    <a className="go" href={href || "#"} onClick={onClick}>
      {children} <Icon name="arrow" size={15} />
    </a>
  );
}

window.useReveal = useReveal;
window.Bubble = Bubble;

/* ---------- Header ---------- */
function Header({ onStart }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className="site-header" style={scrolled ? { boxShadow: "var(--shadow-sm)" } : null}>
      <div className="wrap header-inner">
        <a className="brand-lockup" href="#top">
          <img className="mark" src="assets/logo-mark-gradient.svg" alt="207 HouseKeeping" />
          <span>
            <span className="brand-name">207 HouseKeeping</span>
            <span className="brand-sub">Property Management</span>
          </span>
        </a>
        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#wizard">Get started</a>
          <a href="#reviews">Reviews</a>
          <a href="#book">Contact</a>
        </nav>
        <div className="header-cta">
          <a className="header-phone" href={"tel:" + D.PHONE_TEL}>
            <Icon name="phone" /> {D.PHONE_DISPLAY}
          </a>
          <button className="btn btn-primary" onClick={onStart}>Get a quote</button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero({ headline, onStart, bubbles }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal-up in">
          <span className="eyebrow">Trusted home care across Maine</span>
          <h1 className="h-display" style={{ marginTop: 16 }}>{headline}</h1>
          <p className="lead">
            From weekly upkeep to deep cleans and guest turnovers, our local team keeps
            every room guest-ready — booked in minutes, done right.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-xl" onClick={onStart}>
              <Icon name="wand" size={18} /> Start your project
            </button>
            <a className="btn btn-outline btn-xl" href={"tel:" + D.PHONE_TEL}>
              <Icon name="phone" size={18} /> Call now
            </a>
          </div>
          <div className="hero-trust">
            <span className="trust-item"><span className="dot" /> Background-checked team</span>
            <span className="trust-item"><span className="dot" /> Flat, fair pricing</span>
            <span className="trust-item"><span className="dot" /> Happiness guaranteed</span>
          </div>
        </div>
        <div className="hero-media reveal-up in">
          <img className="hero-photo" src="photos/team-cleaning.jpg" alt="A 207 HouseKeeping team member cleaning a guest-ready kitchen" />
          {bubbles && <>
            <Bubble size={70} style={{ position: "absolute", top: -22, right: 30, opacity: 0.85 }} />
            <Bubble size={34} style={{ position: "absolute", top: 40, right: -12, opacity: 0.7 }} />
          </>}
          <div className="hero-badge-card">
            <div>
              <div className="stars">★★★★★</div>
              <div className="big">5.0</div>
            </div>
            <div style={{ fontSize: 13, color: "var(--fg2)", lineHeight: 1.4 }}>
              Loved by Maine<br />homeowners & hosts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Engagement methods ---------- */
function Engagement({ onStart, onContact }) {
  const ref = useReveal();
  const cards = [
    { icon: "wand", title: "Use the wizard", desc: "Tell us what you want done and we'll build a custom plan.", action: onStart, featured: true, cta: "Start now", color: "var(--accent)" },
    { icon: "phone", title: "Call us", desc: D.PHONE_DISPLAY + " — talk to a real person, no phone trees.", href: "tel:" + D.PHONE_TEL, cta: "Call", color: "var(--teal-600)" },
    { icon: "message", title: "Text us", desc: "Quick question? Send a text and we'll get right back to you.", href: "sms:" + D.PHONE_TEL, cta: "Text", color: "var(--teal-500)" },
    { icon: "mail", title: "Contact form", desc: "Prefer email? Send the details and we'll follow up with a quote.", action: onContact, cta: "Send a message", color: "var(--teal-700)" },
  ];
  return (
    <section className="section-tight" ref={ref}>
      <div className="wrap">
        <div className="reveal-up" style={{ marginBottom: 30 }}>
          <span className="eyebrow">Four easy ways to start</span>
          <h2 className="h2" style={{ marginTop: 12 }}>How would you like to reach us?</h2>
        </div>
        <div className="engage-grid">
          {cards.map((c, i) => {
            const inner = (
              <>
                <div className="engage-icon" style={{ background: c.featured ? "linear-gradient(140deg, var(--accent), var(--lime))" : c.color, color: c.featured ? "var(--teal-900)" : "#fff" }}>
                  <Icon name={c.icon} />
                </div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
                <span className="go">{c.cta} <Icon name="arrow" size={15} /></span>
              </>
            );
            return c.href ? (
              <a key={i} className={"engage-card reveal-up" + (c.featured ? " featured" : "")} href={c.href} style={{ transitionDelay: i * 50 + "ms" }}>{inner}</a>
            ) : (
              <button key={i} className={"engage-card reveal-up" + (c.featured ? " featured" : "")} onClick={c.action} style={{ transitionDelay: i * 50 + "ms" }}>{inner}</button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Service tiers ---------- */
function Tiers({ onStart }) {
  const ref = useReveal();
  return (
    <section className="section" id="services" style={{ background: "var(--bg-2)" }} ref={ref}>
      <div className="wrap">
        <div className="reveal-up" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 44px" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Management packages</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Pick how much you want us to handle</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Three simple percentage-based packages — from a light helping hand to fully
            hands-off. Not sure which fits? The wizard will recommend one.
          </p>
        </div>
        <div className="tiers">
          {D.TIERS.map((t, i) => (
            <div key={t.id} className={"tier reveal-up" + (t.popular ? " popular" : "")} style={{ transitionDelay: i * 70 + "ms" }}>
              {t.popular && <span className="tier-flag">Most popular</span>}
              <div className="tier-name">{t.name}</div>
              <div className="tier-fee">
                <span className="pct">{t.fee}%</span>
                <span className="of">of booking revenue</span>
              </div>
              <div className="tier-tag">{t.tag}</div>
              <p className="tier-desc">{t.desc}</p>
              <ul className="tier-list">
                {t.features.map((f, j) => (
                  <li key={j}><span className="tick"><Icon name="check" size={11} /></span>{f}</li>
                ))}
              </ul>
              <button className={"btn " + (t.popular ? "btn-primary" : "btn-outline") + " btn-block"} onClick={onStart}>
                Choose {t.name}
              </button>
            </div>
          ))}
        </div>
        <p className="muted reveal-up" style={{ textAlign: "center", marginTop: 24, fontSize: 13.5 }}>
          Turnover cleans on managed properties are billed through your STR host and paid by the guest, added with the package fee.
        </p>
      </div>
    </section>
  );
}

/* ---------- Individual services ---------- */
function Individual() {
  const ref = useReveal();
  return (
    <section className="section" id="alacarte" ref={ref}>
      <div className="wrap">
        <div className="reveal-up" style={{ marginBottom: 34, maxWidth: 620 }}>
          <span className="eyebrow">À la carte</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Individual services, flat & hourly rates</h2>
          <p className="lead" style={{ marginTop: 12 }}>
            Don't need a full package? Book any service on its own — by flat rate or by the hour.
          </p>
        </div>
        <div className="indiv-grid">
          {D.INDIVIDUAL.map((s, i) => (
            <div key={s.id} className="indiv-row reveal-up" style={{ transitionDelay: (i % 2) * 60 + "ms" }}>
              <span className="indiv-bubble"><Icon name={s.icon} size={20} /></span>
              <div>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </div>
              <div className="indiv-price">
                <div className="amt">{s.price}</div>
                <div className="unit">{s.unit}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="indiv-note reveal-up">
          <Icon name="clock" size={18} style={{ color: "var(--accent)", flex: "none", marginTop: 1 }} />
          <span>{D.SAME_DAY_NOTE}</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Header, Hero, Engagement, Tiers, Individual, GoLink });
