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
    targets.forEach((n) => {if (n.getBoundingClientRect().top < near()) show(n);});

    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {if (e.isIntersecting) {show(e.target);io.unobserve(e.target);}}),
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
      );
      targets.forEach((n) => {if (!n.classList.contains("in")) io.observe(n);});
    } else {
      targets.forEach(show);
    }
    const t = setTimeout(() => targets.forEach(show), 1800);
    return () => {io && io.disconnect();clearTimeout(t);};
  }, []);
  return ref;
}

/* Brand soap-bubble shape. Style/gradient lives in .bubble (CSS).
   Size comes in via a prop and binds inline (data-driven).
   Pass a className for positioning (e.g. .hero-deco-bubble--lg). */
function Bubble({ size, className }) {
  const cls = "bubble" + (className ? " " + className : "");
  return (
    <span className={cls} style={{ width: size, height: size }} />);

}

window.useReveal = useReveal;
window.Bubble = Bubble;

/* ---------- Download full service list button ----------
   Reusable lime CTA that downloads the services cheat sheet PDF.
   Used in the header, after each service section, inside the
   savings popup, and in the footer. */
function DownloadServices({ size, className }) {
  const sizeCls = size === "sm" ? " btn-sm" : size === "lg" ? " btn-lg" : "";
  const extra = className ? " " + className : "";
  return (
    <a
      className={"btn btn-lime" + sizeCls + extra}
      href="assets/207-services-cheat-sheet.pdf"
      download="207-HouseKeeping-Services.pdf">
      Download full service list
    </a>);
}
window.DownloadServices = DownloadServices;

/* ---------- Page-wide floating soap bubbles (brand motif) ----------
   Sits behind all content (z-index:-1): shows through the lighter
   sections, naturally masked by the deeper --bg-2 / dark sections.
   Honors the "bubbles" tweak (via body.bubbles-off) + reduced motion. */
const BG_BUBBLES = [
{ size: 140, top: "6%", left: "4%", op: 0.5, dur: 30, delay: 0 },
{ size: 64, top: "12%", left: "88%", op: 0.55, dur: 24, delay: 3 },
{ size: 34, top: "24%", left: "14%", op: 0.6, dur: 19, delay: 1 },
{ size: 96, top: "20%", left: "50%", op: 0.4, dur: 28, delay: 5 },
{ size: 22, top: "34%", left: "32%", op: 0.65, dur: 16, delay: 2 },
{ size: 120, top: "40%", left: "82%", op: 0.4, dur: 32, delay: 4 },
{ size: 48, top: "44%", left: "6%", op: 0.55, dur: 22, delay: 0 },
{ size: 28, top: "52%", left: "60%", op: 0.6, dur: 18, delay: 6 },
{ size: 80, top: "58%", left: "24%", op: 0.45, dur: 27, delay: 2 },
{ size: 40, top: "62%", left: "92%", op: 0.55, dur: 21, delay: 4 },
{ size: 110, top: "70%", left: "10%", op: 0.4, dur: 31, delay: 1 },
{ size: 30, top: "74%", left: "48%", op: 0.6, dur: 17, delay: 5 },
{ size: 60, top: "80%", left: "74%", op: 0.5, dur: 25, delay: 3 },
{ size: 24, top: "86%", left: "30%", op: 0.65, dur: 15, delay: 0 },
{ size: 88, top: "90%", left: "58%", op: 0.42, dur: 29, delay: 4 },
{ size: 44, top: "94%", left: "86%", op: 0.55, dur: 20, delay: 2 }];

function BackgroundBubbles() {
  return (
    <div className="bg-bubbles" aria-hidden="true">
      {BG_BUBBLES.map((b, i) =>
      <span key={i} className="bg-bubble" style={{
        width: b.size, height: b.size, top: b.top, left: b.left, opacity: b.op,
        "--bdur": b.dur + "s", "--bdelay": b.delay + "s"
      }} />
      )}
    </div>);

}
window.BackgroundBubbles = BackgroundBubbles;

const fmt = (n) => "$" + n.toLocaleString("en-US");
window.fmt = fmt;

function jump(anchor) {
  const el = document.querySelector(anchor);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}
window.jump = jump;

/* ---------- Header ----------
   At >=1200px: nav links are inline. Below: nav collapses into
   a drawer toggled by the hamburger. The "Text us" CTA stays
   visible at every width \u2014 it never goes into the drawer. */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", f);return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
  { href: "#housekeeping", label: "Housekeeping", theme: "teal" },
  { href: "#tuning", label: "Staging & reno", theme: "lagoon" },
  { href: "#marketing", label: "Marketing", theme: "neon" },
  { href: "#alacarte", label: "Single Services", theme: "lemon" }];

  const closeMenu = () => setOpen(false);
  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "") + (open ? " is-open" : "")}>
      <div className="wrap header-inner">
        <a className="brand-lockup" href="#top" onClick={closeMenu}>
          <img className="mark" src="assets/logo-mark-darkteal.svg" alt="207 HouseKeeping" />
          <span>
            <span className="brand-name">207 HouseKeeping</span>
            <span className="brand-sub">Property Management</span>
          </span>
        </a>
        <nav className="nav" id="primary-nav">
          {links.map((l) => <a key={l.href} href={l.href} className={l.theme ? "theme-" + l.theme : null} onClick={closeMenu}>{l.label}</a>)}
        </nav>
        <div className="header-cta">
          <a className="btn btn-lime header-download" href="assets/207-services-cheat-sheet.pdf" download="207-HouseKeeping-Services.pdf">Download full service list</a>
          <a className="btn btn-primary header-text" href={"sms:" + D.PHONE_TEL}>Text us</a>
          <button
            className="menu-toggle"
            type="button"
            aria-controls="primary-nav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}>
            
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>);

}

/* ---------- Hero (minimal) ---------- */
function Hero({ headline, onStart, onContact }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal-up in">
          <h1 className="h-display" style={{ color: "rgb(0, 92, 88)", lineHeight: "1.1" }}>{headline}</h1>
          <p className="hero-sub">We specialize in Central Maine locations.</p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-xl" onClick={onStart}>Build your plan</button>
            <button className="btn btn-outline btn-xl" onClick={onContact}>Contact us</button>
          </div>
        </div>
        <div className="hero-media reveal-up in">
          <div className="map-frame">
            <img className="hero-map" src="photos/map-207.jpg"
            alt="Our Central Maine service area — Portland, Windham, Auburn, Lewiston, Augusta, Gardiner and Farmington" />
          </div>
        </div>
      </div>
    </section>);

}

/* ---------- Gallery strip ----------
   Slim horizontal marquee of real cleans. Duplicates the photo
   list so the CSS marquee can loop seamlessly. Same height for
   every image, variable width, pause-on-hover. */
function GalleryStrip() {
  const photos = D.GALLERY || [];
  const items = photos.concat(photos);
  return (
    <section className="gallery-strip" aria-label="Recent cleans across Central Maine" style={{ borderWidth: "0px" }}>
      <div className="gallery-track">
        {items.map((src, i) =>
        <img key={i} className="gallery-img" src={src} alt="" loading="lazy" />
        )}
      </div>
    </section>);

}
window.GalleryStrip = GalleryStrip;

/* ---------- Services overview (the four pillars) ---------- */
function ServicesOverview() {
  const ref = useReveal();
  return (
    <section className="section" id="services" ref={ref}>
      <div className="wrap">
        <div className="svc-grid">
          {D.SERVICES.map((s, i) =>
          <a key={s.id} className={"svc-card reveal-up theme-" + (s.theme || "teal")} href={s.anchor} style={{ transitionDelay: i * 60 + "ms" }}>
              <div className="svc-top">
                <span className="svc-icon" style={{ fontFamily: "\"Plus Jakarta Sans\"" }}><Icon name={s.icon} size={22} /></span>
                <span className="svc-tag">{s.tag}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <div className="svc-foot">
                <span className="svc-price">{s.price}</span>
                <span className="svc-go">Explore <Icon name="arrow" size={15} /></span>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- Engagement methods (CTAs) ---------- */
function Engagement({ onStart, onContact }) {
  const ref = useReveal();
  const cards = [
  { icon: "wand", title: "Use the wizard", desc: "Tell us about your place and we'll point you to the right service.", action: onStart, featured: true, cta: "Start now", color: "var(--accent)" },
  { icon: "phone", title: "Call us", desc: D.PHONE_DISPLAY + " — talk to a real person, no phone trees.", href: "tel:" + D.PHONE_TEL, cta: "Call", color: "var(--teal-600)" },
  { icon: "message", title: "Text us", desc: "Quick question? Send a text and we'll get right back to you.", href: "sms:" + D.PHONE_TEL, cta: "Text", color: "var(--teal-500)" },
  { icon: "mail", title: "Contact form", desc: "Prefer email? Send the details and we'll follow up the same day.", action: onContact, cta: "Send a message", color: "var(--teal-700)" }];

  return (
    <section className="section-tight" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal-up">
          <span className="eyebrow">Four easy ways to start</span>
          <h2 className="h2">How would you like to reach us?</h2>
        </div>
        <div className="engage-grid">
          {cards.map((c, i) => {
            const inner =
            <>
                <div className="engage-icon" style={{ "--engage-icon-bg": c.color }}>
                  <Icon name={c.icon} />
                </div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
                <span className="go">{c.cta} <Icon name="arrow" size={15} /></span>
              </>;

            return c.href ?
            <a key={i} className={"engage-card reveal-up" + (c.featured ? " featured" : "")} href={c.href} style={{ transitionDelay: i * 50 + "ms" }}>{inner}</a> :

            <button key={i} className={"engage-card reveal-up" + (c.featured ? " featured" : "")} onClick={c.action} style={{ transitionDelay: i * 50 + "ms" }}>{inner}</button>;

          })}
        </div>
      </div>
    </section>);

}

Object.assign(window, { Header, Hero, ServicesOverview, Engagement });