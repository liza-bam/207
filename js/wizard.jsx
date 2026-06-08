/* 207 HouseKeeping — service-routing wizard: needs → property → contact → recommendation */
const { useState: useStateW } = React;
const DW = window.DATA;
const IconW = window.Icon;
const useRevealW = window.useReveal;

const WIZ_STEPS = ["What you need", "Property", "Your info", "Your match"];

function Wizard() {
  const ref = useRevealW();
  const [step, setStep] = useStateW(0);
  const [needs, setNeeds] = useStateW([]);
  const [propType, setPropType] = useStateW("");
  const [beds, setBeds] = useStateW("");
  const [baths, setBaths] = useStateW("");
  const [info, setInfo] = useStateW({ name: "", phone: "", email: "", town: "" });
  const [done, setDone] = useStateW(false);

  const toggleNeed = (id) =>
    setNeeds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const setI = (k) => (e) => setInfo((v) => ({ ...v, [k]: e.target.value }));

  const canNext = [
    needs.length > 0,
    !!propType,
    info.name.trim() && (info.phone.trim() || info.email.trim()),
    true,
  ][step];

  const pct = done ? 100 : ((step + 1) / WIZ_STEPS.length) * 100;
  const next = () => (step < WIZ_STEPS.length - 1 ? setStep(step + 1) : setDone(true));
  const back = () => setStep(Math.max(0, step - 1));
  const restart = () => { setStep(0); setNeeds([]); setPropType(""); setBeds(""); setBaths(""); setInfo({ name: "", phone: "", email: "", town: "" }); setDone(false); };

  // map selected needs -> recommended services (preserve SERVICES order)
  const recIds = DW.WIZARD_NEEDS.filter((n) => needs.includes(n.id)).map((n) => n.serviceId);
  const recServices = DW.SERVICES.filter((s) => recIds.includes(s.id));
  const needLabels = DW.WIZARD_NEEDS.filter((n) => needs.includes(n.id)).map((n) => n.title);

  return (
    <section className="section" id="wizard" style={{ background: "var(--bg)" }} ref={ref}>
      <div className="wrap">
        <div className="reveal-up" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 36px" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Not sure where to start?</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Build your plan in a minute</h2>
          <p className="lead" style={{ marginTop: 12 }}>
            Tell us what's on your plate and we'll point you to the right mix of services &mdash; no pressure.
          </p>
        </div>

        <div className="wizard-shell reveal-up">
          {/* Aside */}
          <div className="wizard-aside">
            <span className="eyebrow">Your plan</span>
            <h3>Let's find your fit</h3>
            <ol className="steps">
              {WIZ_STEPS.map((s, i) => (
                <li key={s} className={"step-item" + (i === step && !done ? " active" : "") + (i < step || done ? " done" : "")}>
                  <span className="step-num">{i < step || done ? <IconW name="check" size={14} /> : i + 1}</span>
                  <span className="step-label">{s}</span>
                </li>
              ))}
            </ol>
            <div className="aside-foot">
              Prefer to talk it through?<br />
              Call or text <strong style={{ color: "#fff" }}>{DW.PHONE_DISPLAY}</strong>
            </div>
          </div>

          {/* Main */}
          <div className="wizard-main">
            <div className="wizard-progress"><span style={{ width: pct + "%" }} /></div>

            {done ? (
              <div className="wizard-success">
                <div className="success-ring"><IconW name="check" size={38} /></div>
                <h3 className="h3">You're all set, {info.name.split(" ")[0] || "neighbor"}!</h3>
                <p className="lead" style={{ marginTop: 10, maxWidth: 480, marginInline: "auto" }}>
                  Your request is in &mdash; we'll reach out to {info.phone || info.email} to walk through
                  {recServices.length === 1 ? " this service" : " these services"} and get you a clear quote.
                </p>
                <button className="btn btn-outline" style={{ marginTop: 22 }} onClick={restart}>Start over</button>
              </div>
            ) : (
              <>
                {/* STEP 0 — needs */}
                {step === 0 && (
                  <div className="wizard-body">
                    <div className="step-head">
                      <h3>What would you like help with?</h3>
                      <p>Pick everything that's on your plate &mdash; we'll match it to the right services.</p>
                    </div>
                    <div className="choice-grid">
                      {DW.WIZARD_NEEDS.map((s) => {
                        const sel = needs.includes(s.id);
                        return (
                          <button type="button" key={s.id} className={"choice icon" + (sel ? " sel" : "")} onClick={() => toggleNeed(s.id)}>
                            <span className="choice-ic"><IconW name={s.icon} size={18} /></span>
                            <span className="c-body"><span className="c-title">{s.title}</span><span className="c-sub">{s.sub}</span></span>
                            <span className="choice-check"><IconW name="check" size={13} /></span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 1 — property */}
                {step === 1 && (
                  <div className="wizard-body">
                    <div className="step-head">
                      <h3>Tell us about the property</h3>
                      <p>A few details so we can scope it right.</p>
                    </div>
                    <div className="field" style={{ marginBottom: 22 }}>
                      <label style={{ marginBottom: 10 }}>Property type</label>
                      <div className="choice-grid">
                        {DW.PROPERTY_TYPES.map((p) => (
                          <button type="button" key={p} className={"choice radio" + (propType === p ? " sel" : "")} onClick={() => setPropType(p)}>
                            <span className="choice-check"><IconW name="check" size={13} /></span>
                            <span className="c-title">{p}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="field-grid">
                      <div className="field"><label>Bedrooms</label>
                        <select className="select" value={beds} onChange={(e) => setBeds(e.target.value)}>
                          <option value="">Select…</option>{["1", "2", "3", "4", "5+"].map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                      <div className="field"><label>Bathrooms</label>
                        <select className="select" value={baths} onChange={(e) => setBaths(e.target.value)}>
                          <option value="">Select…</option>{["1", "2", "3", "4+"].map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 — contact */}
                {step === 2 && (
                  <div className="wizard-body">
                    <div className="step-head">
                      <h3>Where should we reach you?</h3>
                      <p>We'll send your matched services and answer any questions &mdash; usually the same day.</p>
                    </div>
                    <div className="field-grid">
                      <div className="field"><label>Name</label><input className="input" value={info.name} onChange={setI("name")} placeholder="Jane Smith" /></div>
                      <div className="field"><label>Town</label><input className="input" value={info.town} onChange={setI("town")} placeholder="Rangeley" /></div>
                      <div className="field"><label>Phone</label><input className="input" type="tel" value={info.phone} onChange={setI("phone")} placeholder="(207) 555-0123" /></div>
                      <div className="field"><label>Email</label><input className="input" type="email" value={info.email} onChange={setI("email")} placeholder="you@email.com" /></div>
                    </div>
                    <p className="muted" style={{ fontSize: 13, marginTop: 14 }}>Add a phone or an email so we can get back to you.</p>
                  </div>
                )}

                {/* STEP 3 — recommendation */}
                {step === 3 && (
                  <div className="wizard-body">
                    <div className="step-head">
                      <h3>Here's your match</h3>
                      <p>Based on what you picked, these are the services we'd line up for you.</p>
                    </div>
                    <div className="rec-services">
                      {recServices.map((s) => (
                        <a key={s.id} className="rec-service" href={s.anchor}>
                          <span className="rec-service-ic"><IconW name={s.icon} size={20} /></span>
                          <span className="rec-service-body">
                            <span className="rec-service-name">{s.name}</span>
                            <span className="rec-service-blurb">{s.blurb}</span>
                          </span>
                          <span className="rec-service-price">{s.price}</span>
                        </a>
                      ))}
                    </div>
                    <div className="summary-list">
                      <div className="summary-row"><span className="k">You need</span><span className="v">{needLabels.join(", ") || "—"}</span></div>
                      <div className="summary-row"><span className="k">Property</span><span className="v">{[propType, beds && beds + " bd", baths && baths + " ba"].filter(Boolean).join(" · ") || "—"}</span></div>
                      <div className="summary-row"><span className="k">Contact</span><span className="v">{info.name}{info.town ? " · " + info.town : ""}</span></div>
                    </div>
                    {recServices.length > 1 && (
                      <p className="muted" style={{ fontSize: 13, marginTop: 14, display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <IconW name="tag" size={16} style={{ color: "var(--accent)", flex: "none", marginTop: 1 }} />
                        Run them together for full coverage &mdash; or start with one and add more anytime.
                      </p>
                    )}
                  </div>
                )}

                {/* footer nav */}
                <div className="wizard-foot">
                  {step > 0 && <button className="btn btn-ghost" onClick={back}>← Back</button>}
                  <span className="spacer" />
                  <button className="btn btn-primary" disabled={!canNext} onClick={next} style={!canNext ? { opacity: 0.45, cursor: "not-allowed" } : null}>
                    {step === WIZ_STEPS.length - 1 ? "Send my request" : "Continue →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Wizard = Wizard;
