# 207 HouseKeeping — Design System

> A clean, friendly brand system for a Maine-based home cleaning & house-management service.

## Company / Product context

**207 HouseKeeping** (Property Management) is a residential cleaning and home-management
company serving Maine. The badge features **"207"** (Maine's area code) and the
tagline **"SWEEP UP THE SAVINGS!"**. The logo is a circular badge depicting a house with a
window, a sweeping broom, and soap-bubble circles — warm, approachable, and trustworthy.

This design system supports a **marketing website** for the business: a place where homeowners
and short-term-rental hosts can learn about services (weekly upkeep, deep cleans, turnovers),
see pricing, build trust, and request a booking/quote.

### Source material provided
The brand was built from these supplied files (originals preserved in `assets/`):
- Primary circular badge — full color (the color stylesheet was missing, so we regenerated colored
  vector variants: `assets/logo-mark-gradient.svg`, `logo-badge-round.svg`, etc.).
- Black-and-white badge with the circular "SWEEP UP THE SAVINGS!" text.
- Inverse badge for dark backgrounds.
- The brand color palette (teal → green ramp), preserved at `assets/brand-palette-source.jpg`.
- A set of real-home & on-the-job photos, organized in `assets/photos/`.

No codebase, Figma file, website, or slide deck was provided. The visual system below is built
**from the logo + the supplied palette**, extended into a complete, clean, simple system suitable
for a friendly home-services brand. Treat type, components, and tone as a well-reasoned proposal
to confirm — not as recovered facts.

---

## Index / manifest

| File | What it is |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography, index |
| `colors_and_type.css` | All design tokens: color scale, neutrals, semantic, type, radii, shadows, spacing, motion |
| `styles.css` | Component layer: buttons, fields, cards, badges, chips, eyebrow |
| `SKILL.md` | Agent Skill manifest (for use in Claude Code) |
| `assets/` | Logos (color / inverse / mono marks), round badge, palette source |
| `assets/photos/` | Real-home & on-the-job brand photography (`p01`–`p22`) |
| `preview/` | Design-System-tab cards (colors, type, spacing, components, brand) |

---

## CONTENT FUNDAMENTALS

**Voice:** warm, plain-spoken, and dependable — like a trusted neighbor who happens to be great
at cleaning. Confident without being salesy. Local and human, never corporate.

- **Person:** Speak to the customer as **"you"**; refer to the company as **"we / our team."**
  e.g. *"We book around your schedule and show up when we say we will."*
- **Casing:** Sentence case for headings and buttons (*"Book a clean"*, not *"Book A Clean"*).
  The badge tagline **"SWEEP UP THE SAVINGS!"** is the one all-caps lockup — reserve all-caps for
  the tagline and small eyebrow labels only.
- **Tone words:** spotless, effortless, reliable, friendly, local, fair, guest-ready.
- **Length:** short and concrete. Lead with the benefit, then the detail. Prefer
  *"A spotless home, made simple"* over feature lists.
- **Numbers & savings:** the brand leans on value ("savings"). Be specific and honest with prices
  (*"From $89"*), never inflate with fake urgency.
- **Emoji:** **not used.** Personality comes from the bubble motif and warm color, not emoji.
- **Punctuation:** the tagline keeps its exclamation point; elsewhere use exclamation marks
  sparingly (at most one per screen).
- **CTAs:** verb-first and friendly — *"Book a clean," "Get a quote," "See pricing," "Meet the team."*

**Example copy**
- Hero: *"A spotless home, made simple."* / *"Trusted home cleaning across Maine — booked in minutes, done right."*
- Service blurb: *"From weekly upkeep to deep cleans and turnover days, our team keeps every room guest-ready."*
- Trust line: *"Background-checked cleaners. Flat, fair pricing. Happiness guaranteed."*

---

## VISUAL FOUNDATIONS

**Overall feel:** clean, airy, and friendly. Lots of white/off-white space, one confident
spring-teal as the hero color, deep teal for grounding, and soft rounded geometry that echoes the
circular badge. Minimal, modern, trustworthy — not clinical, not childish.

- **Color:** A single analogous **teal → green** family (see `colors_and_type.css`).
  - **Primary** `--brand #00D4A3` (spring teal) for actions, key accents, and brand fills.
  - **Ink** `--teal-900 #00312D` for text and dark surfaces (footers, CTAs).
  - Mid-teals (`#005C58`, `#007F7A`, `#07A3A2`) for secondary UI, icons, illustration shading.
  - **Accents** `--lime #D6FF82` (soft highlights/badges) and `--green #00FF00`
    (rare high-energy pop) — used sparingly, never for text.
  - Backgrounds are warm-neutral with a faint teal tint (`#F4F8F6`), not pure gray.
- **Type:** **Bricolage Grotesque** (display/headings, 700–800, tight tracking) paired with
  **Plus Jakarta Sans** (body/UI, 400–700). Friendly geometric letterforms, generous line-height
  on body (1.55–1.7). See Caveats — these are Google-Fonts substitutions, no brand font was supplied.
- **Spacing & layout:** 4-pt base grid. Generous section padding (64–128px on desktop), roomy
  cards, wide gutters. Content max-width ~1200px, centered. Fixed sticky header; the rest scrolls.
- **Backgrounds:** mostly solid paper/off-white. Accent sections use a flat **solid teal** or
  **deep-teal** band. **No gradients**, no photographic hero washes by default. Optional
  **soap-bubble motif** (outlined circles from the badge) as a light, sparse overlay on solid bands.
  Real photography (bright, natural-light interiors) is welcome in image slots but isn't required.
- **Imagery vibe:** if photos are used, favor **bright, warm, natural-light** home interiors —
  clean, lived-in, not stock-sterile. Keep them airy to match the palette.
- **Corner radii:** soft and consistent — cards `--r-xl 28px`, inputs `--r-md 12px`,
  buttons & chips fully **pill** (`--r-pill`). The roundness echoes the circular badge.
- **Cards:** white surface, 1px hairline `--line` border, soft shadow `--shadow-sm`; "elevated"
  variant drops the border for `--shadow-md`. No colored left-border accents.
- **Shadows:** soft, **teal-tinted** (`rgba(0,49,45,…)`), low-opacity, large blur — never harsh
  black drop shadows. Primary CTAs get a colored `--shadow-brand` glow.
- **Borders:** thin hairlines (`#E1EAE6`); inputs use a slightly stronger `#CFDED9` that turns
  `--brand` on focus with a 4px soft ring.
- **Animation:** gentle and quick. Hover ≈ 140–220ms ease. Entrances are short fades/rises
  (`--ease-out`). **No bounces, no infinite loops** on content.
- **Hover states:** primary button darkens (`--brand` → `--brand-strong`) and goes white-text;
  outline/ghost fill with a faint teal tint; cards lift one shadow step.
- **Press states:** subtle `translateY(1px) scale(0.985)` — a small physical "push," no color flip.
- **Transparency / blur:** used lightly — the sticky header can sit on a translucent paper
  background with a small backdrop blur when over content. Otherwise surfaces are opaque.

---

## ICONOGRAPHY

No icon set was provided in the source files. The brand's own iconography is the **badge mark**
and its **soap-bubble circles**, which we ship as ready-to-use SVGs in `assets/`:

- `logo-mark-gradient.svg` — **the color logo** (teal→lime gradient mark, transparent). Works on
  light *and* dark surfaces — the primary mark.
- `logo-badge-round.svg` — color mark on a round dark ground, with padding (for round badge lockups).
- `logo-badge-color.svg` — color mark on a rounded-square dark ground.
- `logo-mark-ink.svg` / `logo-mark-teal.svg` / `logo-mark-white.svg` — one-color fallbacks (stamps,
  favicons, embroidery, single-color print).
- `logo-badge-color.jpg` — the original colored logo you supplied (raster reference).
- `logo-badge.svg` / `logo-badge-inverse.svg` / `logo-badge-bw.svg` — your raw uploads (render black
  standalone — their fill stylesheet was missing; prefer the generated colored versions above).

Instead of a line-icon set, this brand uses its own **bright gradient soap-bubbles** (the motif from
the badge) in place of icons — as feature bullets, step markers, list ticks and decorative overlays.
They are simple gradient circles (teal → lime), never line/stroke icons, which the team felt looked
generic. Usage rules:

- Bubbles are filled gradient circles; pair them with a short text label rather than relying on a glyph.
- Gradients: `#00D4A3 → #D6FF82`, `#07A3A2 → #00D4A3`, `#3FE08C → #D6FF82`. A soft inner highlight sells the “bubble.”
- **No line/stroke icons. No emoji. No unicode glyphs as icons.** Star ratings (★) are the one allowed glyph.
- The badge mark is for branding (header, footer, favicons) — not as a generic UI icon.

---

## Caveats (please confirm)

1. **Brand name** — confirmed as **207 HouseKeeping** (Property Management), tagline *"Sweep up the savings!"*.
2. **Fonts** — no brand font files were supplied. We substituted **Bricolage Grotesque** + **Plus
   Jakarta Sans** (Google Fonts). If you have specific brand fonts, send the files and we'll swap them in.
3. **Iconography** — the brand uses bright gradient bubbles in place of line icons (per your direction).
4. **Logo fills** — the source `logo.svg` relies on an external stylesheet that wasn't included, so it
   renders black standalone; we generated correctly-colored variants in `assets/`.
