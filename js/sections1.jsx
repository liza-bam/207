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

/* Brand soap-bubble shape. Style/gradient lives in .bubble (CSS).
   Size comes in via a prop and binds inline (data-driven).
   Pass a className for positioning (e.g. .hero-deco-bubble--lg). */
function Bubble({ size, className }) {
  const cls = "bubble" + (className ? " " + className : "");
  return (
    <span className={cls} style={{ width: size, height: size }} />
  );
}

window.useReveal = useReveal;
window.Bubble = Bubble;

/* ---------- Page-wide floating soap bubbles (brand motif) ----------
   Sits behind all content (z-index:-1): shows through the lighter
   sections, naturally masked by the deeper --bg-2 / dark sections.
   Honors the "bubbles" tweak (via body.bubbles-off) + reduced motion. */
const BG_BUBBLES = [
  { size: 140, top: "6%",  left: "4%",  op: 0.13, dur: 30, delay: 0 },
  { size: 64,  top: "18%", left: "88%", op: 0.18, dur: 24, delay: 3 },
  { size: 34,  top: "30%", left: "14%", op: 0.20, dur: 19, delay: 1 },
  { size: 96,  top: "44%", left: "78%", op: 0.12, dur: 28, delay: 5 },
  { size: 22,  top: "52%", left: "32%", op: 0.22, dur: 16, delay: 2 },
  { size: 120, top: "62%", left: "8%",  op: 0.11, dur: 32, delay: 4 },
  { size: 48,  top: "70%", left: "90%", op: 0.17, dur: 22, delay: 0 },
  { size: 28,  top: "80%", left: "20%", op: 0.20, dur: 18, delay: 6 },
  { size: 80,  top: "86%", left: "66%", op: 0.13, dur: 27, delay: 2 },
  { size: 40,  top: "92%", left: "44%", op: 0.18, dur: 21, delay: 4 },
];
function BackgroundBubbles() {
  return (
    <div className="bg-bubbles" aria-hidden="true">
      {BG_BUBBLES.map((b, i) => (
        <span key={i} className="bg-bubble" style={{
          width: b.size, height: b.size, top: b.top, left: b.left, opacity: b.op,
          "--bdur": b.dur + "s", "--bdelay": b.delay + "s",
        }} />
      ))}
    </div>
  );
}
window.BackgroundBubbles = BackgroundBubbles;

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
          <h1 className="h-display">{headline}</h1>
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
            <Bubble size={70} className="hero-deco-bubble--lg" />
            <Bubble size={34} className="hero-deco-bubble--sm" />
          </>}
          <div className="hero-badge-card">
            <div>
              <div className="stars">★★★★★</div>
              <div className="big">5.0</div>
            </div>
            <div className="meta">
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
        <div className="section-head section-head--center reveal-up">
          <span className="eyebrow">One team, four ways to help</span>
          <h2 className="h2">Everything your rental needs &mdash; under one roof</h2>
          <p className="lead">
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
        <div className="section-head reveal-up">
          <span className="eyebrow">Four easy ways to start</span>
          <h2 className="h2">How would you like to reach us?</h2>
        </div>
        <div className="engage-grid">
          {cards.map((c, i) => {
            const inner = (
              <>
                <div className="engage-icon" style={{ "--engage-icon-bg": c.color }}>
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
