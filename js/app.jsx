/* 207 HouseKeeping — main app + Tweaks */
const { useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#00D4A3",
  "headline": "Hi, I'm Becky.",
  "bubbles": true
}/*EDITMODE-END*/;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent-strong", t.accent);
    document.body.classList.toggle("bubbles-off", !t.bubbles);
  }, [t.accent, t.bubbles]);

  const onStart = () => scrollToId("wizard");
  const onContact = () => scrollToId("book");

  return (
    <>
      <BackgroundBubbles />
      <Header onStart={onStart} />
      <main>
        <Hero headline={t.headline} onStart={onStart} bubbles={t.bubbles} />
        <GalleryStrip />
        <Wizard />
        <ServicesOverview />
        <Housekeeping onStart={onStart} />
        <Included />
        <Extras />
        <ValueTable />
        <Tuning onContact={onContact} />
        <Marketing onContact={onContact} />
        <Alacarte onContact={onContact} />
        <BeforeAfter />
        <ReviewsFB />
        <Engagement onStart={onStart} onContact={onContact} />
        <Booking />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Accent color" value={t.accent}
          options={["#00D4A3", "#07A3A2", "#00B589", "#005C58"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakToggle label="Soap-bubble motif" value={t.bubbles}
          onChange={(v) => setTweak("bubbles", v)} />
        <TweakSection label="Hero" />
        <TweakText label="Headline" value={t.headline}
          onChange={(v) => setTweak("headline", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
