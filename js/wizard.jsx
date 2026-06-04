/* 207 HouseKeeping — owner wizard (medium depth: services → property → frequency → contact → summary) */
const { useState: useStateW } = React;
const DW = window.DATA;
const IconW = window.Icon;
const useRevealW = window.useReveal;

const WIZ_STEPS = ["Services", "Property", "Frequency", "Your info", "Summary"];

function recommendTier(services) {
  const mgmt = ["guest", "marketing"].filter((s) => services.includes(s)).length;
  const onsite = ["lawn", "wash", "dock", "repairs"].filter((s) => services.includes(s)).length;
  if (mgmt >= 1 && (onsite >= 1 || services.length >= 4)) {
    return { name: "Full Service", fee: "35%", why: "You want us managing guests and handling the property end-to-end." };
  }
  if (mgmt >= 1 || services.length >= 3) {
    return { name: "Half Service", fee: "25%", why: "You'd like to share the load — we take some tasks, you keep others." };
  }
  return { name: "Self-Service", fee: "10%", why: "You mostly run things yourself and just want a reliable hand on-site." };
}

function Wizard() {
  const ref = useRevealW();
  const [step, setStep] = useStateW(0);
  const [services, setServices] = useStateW([]);
  const [propType, setPropType] = useStateW("");
  const [beds, setBeds] = useStateW("");
  const [baths, setBaths] = useStateW("");
  const [freq, setFreq] = useStateW("");
  const [info, setInfo] = useStateW({ name: "", phone: "", email: "", town: "" });
  const [done, setDone] = useStateW(false);

  const toggleService = (id) =>
    setServices((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const setI = (k) => (e) => setInfo((v) => ({ ...v, [k]: e.target.value }));

  const canNext = [
    services.length > 0,
    !!propType,
    !!freq,
    info.name.trim() && (info.phone.trim() || info.email.trim()),
    true,
  ][step];

  const rec = recommendTier(services);
  const pct = done ? 100 : ((step + 1) / WIZ_STEPS.length) * 100;

  const next = () => (step < WIZ_STEPS.length - 1 ? setStep(step + 1) : setDone(true));
  const back = () => setStep(Math.max(0, step - 1));
  const restart = () => { setStep(0); setServices([]); setPropType(""); setBeds(""); setBaths(""); setFreq(""); setInfo({ name: "", phone: "", email: "", town: "" }); setDone(false); };

  const serviceLabels = services.map((id) => (DW.WIZARD_SERVICES.find((s) => s.id === id) || {}).title).filter(Boolean);

  return (
    <section className="section" id="wizard" style={{ background: "var(--bg-2)" }} ref={ref}>
      <div className="wrap">
        <div className="reveal-up" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 36px" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Tell us what you need</span>
          <h2 className="h2" style={{ marginTop: 12 }}>What would you like done?</h2>
          <p className="lead" style={{ marginTop: 12 }}>
            Answer a few quick questions and we'll put together the right plan — and recommend a package.
          </p>
        </div>

        <div className="wizard-shell reveal-up">
          {/* Aside */}
          <div className="wizard-aside">
            <span className="eyebrow">Your project</span>
            <h3>Let's build your plan</h3>
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
                <p className="lead" style={{ marginTop: 10, maxWidth: 440, marginInline: "auto" }}>
                  We've got your request. Based on your answers we'd suggest our{" "}
                  <strong style={{ color: "var(--teal-700)" }}>{rec.name}</strong> package — we'll
                  reach out to {info.phone || info.email} to confirm the details.
                </p>
                <button className="btn btn-outline" style={{ marginTop: 22 }} onClick={restart}>Start over</button>
              </div>
            ) : (
              <>
                {/* STEP 0 — services */}
                {step === 0 && (
                  <div className="wizard-body">
                    <div className="step-head">
                      <h3>What can we help with?</h3>
                      <p>Choose everything you're interested in — pick as many as you like.</p>
                    </div>
                    <div className="choice-grid">
                      {DW.WIZARD_SERVICES.map((s) => {
                        const sel = services.includes(s.id);
                        return (
                          <button type="button" key={s.id} className={"choice" + (sel ? " sel" : "")} onClick={() => toggleService(s.id)}>
                            <span className="choice-check"><IconW name="check" size={13} /></span>
                            <span><span className="c-title">{s.title}</span><span className="c-sub">{s.sub}</span></span>
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
                      <p>This helps us size the job and quote accurately.</p>
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

                {/* STEP 2 — frequency */}
                {step === 2 && (
                  <div className="wizard-body">
                    <div className="step-head">
                      <h3>How often?</h3>
                      <p>Pick the cadence that fits your season.</p>
                    </div>
                    <div className="seg" style={{ marginBottom: 26 }}>
                      {DW.FREQUENCIES.map((f) => (
                        <button key={f} type="button" className={freq === f ? "on" : ""} onClick={() => setFreq(f)}>{f}</button>
                      ))}
                    </div>
                    <div className="choice" style={{ cursor: "default", borderStyle: "dashed" }}>
                      <span className="indiv-bubble" style={{ width: 34, height: 34 }}><IconW name="sparkle" size={17} /></span>
                      <span><span className="c-title">Not sure yet?</span><span className="c-sub">No problem — choose your best guess and we'll fine-tune it together.</span></span>
                    </div>
                  </div>
                )}

                {/* STEP 3 — contact */}
                {step === 3 && (
                  <div className="wizard-body">
                    <div className="step-head">
                      <h3>Where should we reach you?</h3>
                      <p>We'll send your custom plan and a quote — usually the same day.</p>
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

                {/* STEP 4 — summary */}
                {step === 4 && (
                  <div className="wizard-body">
                    <div className="step-head">
                      <h3>Here's your plan</h3>
                      <p>Look good? Send it over and we'll take it from here.</p>
                    </div>
                    <div className="rec-card">
                      <div className="rl">Our recommendation</div>
                      <div className="rn">{rec.name} <span style={{ color: "var(--teal-600)" }}>· {rec.fee}</span></div>
                      <div style={{ fontSize: 14, color: "var(--fg2)" }}>{rec.why}</div>
                    </div>
                    <div className="summary-list">
                      <div className="summary-row"><span className="k">Services</span><span className="v">{serviceLabels.join(", ") || "—"}</span></div>
                      <div className="summary-row"><span className="k">Property</span><span className="v">{[propType, beds && beds + " bd", baths && baths + " ba"].filter(Boolean).join(" · ") || "—"}</span></div>
                      <div className="summary-row"><span className="k">Frequency</span><span className="v">{freq || "—"}</span></div>
                      <div className="summary-row"><span className="k">Contact</span><span className="v">{info.name}{info.town ? " · " + info.town : ""}</span></div>
                    </div>
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
