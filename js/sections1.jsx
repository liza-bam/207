/* 207 HouseKeeping — sections part 1: helpers, header, hero, services overview, engagement */
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

window.useReveal = useReveal;
window.Bubble = Bubble;

const fmt = (n) => "$" + n.toLocaleString("en-US");
window.fmt = fmt;

function jump(anchor) {
  const el = document.querySelector(anchor);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}
window.jump = jump;

/* ---------- Header ---------- */
function Header({ onStart }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#housekeeping", label: "Housekeeping" },
    { href: "#tuning", label: "Tuning" },
    { href: "#marketing", label: "Marketing" },
    { href: "#alacarte", label: "\u00c0 la carte" },
  ];
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
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="header-cta">
          <a className="header-phone" href={"tel:" + D.PHONE_TEL}>
            <Icon name="phone" /> {D.PHONE_DISPLAY}
          </a>
          <button className="btn btn-primary" onClick={onStart}>Get started</button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero (company-level) ---------- */
function Hero({ headline, onStart, bubbles }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal-up in">
          <span className="eyebrow">Full-service vacation-rental care &middot; Maine</span>
          <h1 className="h-display" style={{ marginTop: 16 }}>{headline}</h1>
          <p className="lead">
            Cleaning, tuning, booking &amp; marketing, and any one-off job &mdash; one local Maine team
            for everything your short-term rental needs. Flat, fair pricing and never a cut of what you earn.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-xl" onClick={onStart}>
              <Icon name="wand" size={18} /> Build your plan
            </button>
            <a className="btn btn-outline btn-xl" href={"tel:" + D.PHONE_TEL}>
              <Icon name="phone" size={18} /> Call now
            </a>
          </div>
          <div className="hero-trust">
            <span className="trust-item"><span className="dot" /> Flat, predictable pricing</span>
            <span className="trust-item"><span className="dot" /> Never a percentage</span>
            <span className="trust-item"><span className="dot" /> Maine-based &amp; local</span>
          </div>
        </div>
        <div className="hero-media reveal-up in">
          <img className="hero-photo" src="photos/ba-kitchen-after.jpg" alt="A spotless, guest-ready kitchen kept by 207 HouseKeeping" />
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
              Loved by Maine<br />homeowners &amp; hosts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services overview (the four pillars) ---------- */
function ServicesOverview() {
  const ref = useReveal();
  return (
    <section className="section" id="services" ref={ref}>
      <div className="wrap">
        <div className="reveal-up" style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 40px" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>One team, four ways to help</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Everything your rental needs &mdash; under one roof</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Run them together for full coverage, or take any one on its own. Pick what you need below.
          </p>
        </div>
        <div className="svc-grid">
          {D.SERVICES.map((s, i) => (
            <a key={s.id} className="svc-card reveal-up" href={s.anchor} style={{ transitionDelay: i * 60 + "ms" }}>
              <div className="svc-top">
                <span className="svc-icon"><Icon name={s.icon} size={22} /></span>
                <span className="svc-tag">{s.tag}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <div className="svc-foot">
                <span className="svc-price">{s.price}</span>
                <span className="svc-go">Explore <Icon name="arrow" size={15} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Engagement methods (CTAs) ---------- */
function Engagement({ onStart, onContact }) {
  const ref = useReveal();
  const cards = [
    { icon: "wand", title: "Use the wizard", desc: "Tell us about your place and we'll point you to the right service.", action: onStart, featured: true, cta: "Start now", color: "var(--accent)" },
    { icon: "phone", title: "Call us", desc: D.PHONE_DISPLAY + " — talk to a real person, no phone trees.", href: "tel:" + D.PHONE_TEL, cta: "Call", color: "var(--teal-600)" },
    { icon: "message", title: "Text us", desc: "Quick question? Send a text and we'll get right back to you.", href: "sms:" + D.PHONE_TEL, cta: "Text", color: "var(--teal-500)" },
    { icon: "mail", title: "Contact form", desc: "Prefer email? Send the details and we'll follow up the same day.", action: onContact, cta: "Send a message", color: "var(--teal-700)" },
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

Object.assign(window, { Header, Hero, ServicesOverview, Engagement });
