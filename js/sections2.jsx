/* 207 HouseKeeping — sections part 2: before/after, reviews, facebook, booking, footer */
const { useState: useState2, useEffect: useEffect2 } = React;
const useState = useState2, useEffect = useEffect2;
const D2 = window.DATA;
const Icon2 = window.Icon;
const useReveal2 = window.useReveal;
const Bubble = window.Bubble;

/* ---------- Before / After ---------- */
function BeforeAfter() {
  const ref = useReveal2();
  return (
    <section className="section" id="work" style={{ background: "var(--bg-2)" }} ref={ref}>
      <div className="wrap">
        <div className="reveal-up" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 40px" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Real Maine jobs</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Before &amp; after</h2>
          <p className="lead" style={{ marginTop: 12 }}>
            A few openings, turnovers and deep cleans from around the lakes. Same homes — just guest-ready.
          </p>
        </div>
        <div className="ba-grid">
          {D2.BEFORE_AFTER.map((b, i) => (
            <figure key={i} className="ba-card reveal-up" style={{ margin: 0, transitionDelay: i * 70 + "ms" }}>
              <img src={b.img} alt={b.label + " before and after"} loading="lazy" />
              <figcaption className="ba-cap">
                <span className="pill">Before / After</span>
                <span className="t">{b.label} · {b.where}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews + Facebook ---------- */
function ReviewsFB() {
  const ref = useReveal2();
  return (
    <section className="section" id="reviews" ref={ref}>
      <div className="wrap">
        <div className="reveal-up" style={{ marginBottom: 36, maxWidth: 640 }}>
          <span className="eyebrow">Loved by locals</span>
          <h2 className="h2" style={{ marginTop: 12 }}>What Maine homeowners say</h2>
        </div>
        <div className="review-grid">
          {D2.REVIEWS.map((r, i) => (
            <article key={i} className="review-card reveal-up" style={{ transitionDelay: (i % 2) * 60 + "ms" }}>
              <div className="review-stars">{"★".repeat(r.stars)}</div>
              <p className="review-text">“{r.text}”</p>
              <div className="review-who">
                <span className="review-av" style={{ background: r.color }}>{r.name[0]}</span>
                <span>
                  <span className="nm" style={{ display: "block" }}>{r.name}</span>
                  <span className="mt">{r.meta}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Booking / Contact form ---------- */
function Booking({ formRef }) {
  const ref = useReveal2();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", town: "", interest: "A management package", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section className="section" id="book" ref={ref}>
      <div className="wrap">
        <div className="book-layout reveal-up" ref={formRef}>
          <div className="book-info">
            <span className="eyebrow">Book a clean</span>
            <h2 className="h2">Let's get your place guest-ready</h2>
            <p>Tell us a little about your property and we'll follow up with a quote — usually the same day.</p>
            <div className="contact-lines">
              <a className="contact-line" href={"tel:" + D2.PHONE_TEL}>
                <span className="ci"><Icon2 name="phone" /></span>
                <span><span className="cl">Call</span><br /><span className="cv">{D2.PHONE_DISPLAY}</span></span>
              </a>
              <a className="contact-line" href={"sms:" + D2.PHONE_TEL}>
                <span className="ci"><Icon2 name="message" /></span>
                <span><span className="cl">Text</span><br /><span className="cv">{D2.PHONE_DISPLAY}</span></span>
              </a>
              <a className="contact-line" href={"mailto:" + D2.EMAIL}>
                <span className="ci"><Icon2 name="mail" /></span>
                <span><span className="cl">Email</span><br /><span className="cv">{D2.EMAIL}</span></span>
              </a>
              <div className="contact-line">
                <span className="ci"><Icon2 name="pin" /></span>
                <span><span className="cl">Service area</span><br /><span className="cv">Central, Midcoast, Western &amp; Northern Maine</span></span>
              </div>
            </div>
            <Bubble size={120} style={{ position: "absolute", right: -30, bottom: -34, opacity: 0.16 }} />
          </div>

          <div className="book-form">
            {sent ? (
              <div className="wizard-success" style={{ padding: "40px 10px" }}>
                <div className="success-ring"><Icon2 name="check" size={38} /></div>
                <h3 className="h3">Thanks, {form.name || "neighbor"}!</h3>
                <p className="lead" style={{ marginTop: 10 }}>
                  Your request is in. We'll reach out at {form.phone || form.email || "your contact"} shortly to talk through the details.
                </p>
                <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => { setSent(false); }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="row2">
                  <div className="field"><label>Your name</label><input className="input" required value={form.name} onChange={set("name")} placeholder="Jane Smith" /></div>
                  <div className="field"><label>Town</label><input className="input" value={form.town} onChange={set("town")} placeholder="Rangeley" /></div>
                </div>
                <div className="row2">
                  <div className="field"><label>Email</label><input className="input" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" /></div>
                  <div className="field"><label>Phone</label><input className="input" type="tel" value={form.phone} onChange={set("phone")} placeholder="(207) 555-0123" /></div>
                </div>
                <div className="field">
                  <label>I'm interested in</label>
                  <select className="select" value={form.interest} onChange={set("interest")}>
                    <option>A management package</option>
                    <option>A one-time clean</option>
                    <option>Turnover cleaning</option>
                    <option>Lawn / dock / power washing</option>
                    <option>Not sure yet — help me decide</option>
                  </select>
                </div>
                <div className="field"><label>Anything else?</label><textarea className="textarea" value={form.message} onChange={set("message")} placeholder="Tell us about your property, beds/baths, and what you need." /></div>
                <button className="btn btn-primary btn-block btn-lg" type="submit">Request my quote</button>
                <p className="muted" style={{ fontSize: 12.5, marginTop: 12, textAlign: "center" }}>We'll never share your info. Expect a reply the same day.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <img className="mark" src="assets/logo-mark-white.svg" alt="" />
              <span className="fn">207 HouseKeeping</span>
            </div>
            <p className="footer-about">
              A local, family-run cleaning &amp; property-management team serving Maine.
              Custom-built by an Airbnb host, for hosts — sweep up the savings.
            </p>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <a href="#services">Management packages</a>
            <a href="#alacarte">Individual services</a>
            <a href="#wizard">Start the wizard</a>
            <a href="#reviews">Reviews</a>
          </div>
          <div className="footer-col">
            <h5>Get in touch</h5>
            <a href={"tel:" + D2.PHONE_TEL}>{D2.PHONE_DISPLAY}</a>
            <a href={"mailto:" + D2.EMAIL}>{D2.EMAIL}</a>
            <a href={D2.FB_URL} target="_blank" rel="noopener">Facebook</a>
            <p>Owner: Rebekka Hinkley</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} 207 HouseKeeping · Property Management. All rights reserved.</span>
          <span>Sweep up the savings!</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { BeforeAfter, ReviewsFB, Booking, Footer });
