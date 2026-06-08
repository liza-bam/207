# Handoff: 207 HouseKeeping — Marketing Website

## Overview
A single-page marketing website for **207 HouseKeeping** (Property Management), a Maine-based
short-term-rental care company. The page presents the company's **four services** up front and
lets owners explore each, see social proof, and request a quote. The defining message: **flat,
predictable pricing — never a percentage of the owner's earnings.**

The four services:
1. **Housekeeping** — a flat-rate monthly subscription ($1,200/mo; $1,000 founding rate).
2. **Tuning** — project work to make a property "booked solid" (consult-first, flat-quoted).
3. **Booking & Marketing** — three flat monthly tiers ($99 / $199 / $299).
4. **À la carte** — pay-per-job menu, no commitment.

---

## About the Design Files
The files in `design_files/` are **design references created in HTML/CSS/React (via in-browser
Babel)** — a working prototype that shows the intended look, content, and behavior. **They are not
meant to be shipped as-is.** The task is to **recreate this design in the target codebase's
environment** (e.g. Next.js/React, Astro, plain HTML, a CMS theme, etc.) using its established
patterns, component library, and build tooling. If no codebase exists yet, pick the most
appropriate stack for a marketing site (a static framework like **Astro** or **Next.js** is a
natural fit) and implement there.

The prototype splits content (`js/data.js`) from presentation (React components in `js/*.jsx`),
which maps cleanly onto a real component architecture — porting each section to a real component
and feeding it the same data is the intended path.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all
specified. Recreate the UI faithfully. All design tokens are real values pulled from the
"Sweep 207" brand system and are listed in **Design Tokens** below (and live in
`design_files/css/colors_and_type.css`).

---

## Tech in the prototype (and how to treat it)
- **React 18 + in-browser Babel** — prototype only. Replace with the codebase's normal build.
- **Content/data layer:** `js/data.js` assigns a single `window.DATA` object holding every piece
  of copy and pricing. Treat this as the content model (port to a CMS, JSON, or typed constants).
- **Sections:** split across `js/sections1.jsx` … `js/sections4.jsx` and `js/wizard.jsx`. Each
  exported function is one page section/component.
- **Icons:** `js/icons.jsx` — a small inline-SVG set keyed by name (`<Icon name="phone" />`).
  Reuse your codebase's icon system; the names map to common line icons.
- **Tweaks panel** (`tweaks-panel.jsx`) is a prototype-only authoring tool (live accent/headline
  switching). **Do not port it.** It only sets `--accent` and the hero headline.
- **No backend.** The contact form and wizard only set local state and show a success message.
  Wire these to the real form/CRM/email endpoint on implementation.

---

## Page structure (top → bottom)
The page is one vertical scroll. Section order is defined in `js/app.jsx`:

1. **Header** (sticky)
2. **Hero**
3. **Services overview** (`#services`)
4. **Housekeeping** (`#housekeeping`) → What's included (`#included`) → Add-ons (`#extras`) → Value table (`#value`)
5. **Tuning** (`#tuning`)
6. **Booking & Marketing** (`#marketing`)
7. **À la carte** (`#alacarte`)
8. **Before & after** (`#work`)
9. **Wizard** (`#wizard`)
10. **Reviews + Follow card** (`#reviews`)
11. **Engagement** (four "ways to reach us" cards)
12. **Contact form** (`#book`)
13. **Footer**

Content max-width is **~1200px**, centered, with generous section padding. Two background colors
alternate between sections: `--bg` (#F4F8F6) and `--bg-2` (#EAF2EF).

---

## Screens / Views (sections)

### 1. Header (sticky)
- **Layout:** full-width sticky bar, translucent paper background; gains `--shadow-sm` after 8px scroll.
  Inner row: brand lockup (left) · nav links (center) · phone link + "Get started" button (right).
- **Brand lockup:** gradient logo mark (`assets/logo-mark-gradient.svg`) + "207 HouseKeeping" (display, 700) with "Property Management" sub-label.
- **Nav links:** Services, Housekeeping, Tuning, Marketing, À la carte — anchor jumps. Hidden < 720px.
- **CTA:** phone link `(207) 749-8348` (hidden < 720px) + primary pill button "Get started" → scrolls to wizard.

### 2. Hero
- **Layout:** two-column grid (~1.05fr text / 1fr media), gap ~clamp. Stacks < 1000px with media on top.
- **Text column:**
  - Eyebrow (uppercase, teal-600, tracked): "Full-service vacation-rental care · Maine"
  - H1 display headline (default "Your home, handled.") — Bricolage Grotesque 800, clamp ~48–64px, tight tracking.
  - Lead paragraph (max ~32ch).
  - **CTAs:** primary "Build your plan" (→ wizard) + outline "Call now" (tel:). Both `btn-xl`.
  - **Trust row:** 3 items with a small gradient dot: "Flat, predictable pricing", "Never a percentage", "Maine-based & local".
- **Media column:** rounded photo (`photos/ba-kitchen-after.jpg`), 2 decorative gradient "bubble" circles (toggleable), and a floating "5.0 ★★★★★ — Loved by Maine homeowners & hosts" badge card.

### 3. Services overview (`#services`)
- **Centered intro:** eyebrow "One team, four ways to help", H2 "Everything your rental needs — under one roof", lead.
- **Grid:** 4 equal cards (→ 2-col < 1000px, 1-col < 720px), gap 18px.
- **Card (`.svc-card`, anchor link):** white, hairline border, radius `--r-lg` (24px), `--shadow-xs`; hover lifts 5px to `--shadow-md`, border → transparent.
  - Top row: 48px gradient circle icon (teal→lime) + uppercase tag pill (`--teal-100` bg, teal-700 text).
  - H3 name (display 800, 22px), blurb (14px, `--fg2`).
  - Foot row (top hairline): price (display 700, 15px) + "Explore →" link (teal-600); arrow nudges right on hover.
  - Data: `DATA.SERVICES[]` — `{ id, icon, name, tag, price, blurb, anchor }`.

### 4. Housekeeping (`#housekeeping`, bg `--bg-2`)
- **Service label:** small stacked label — "SERVICE 1 / 4" (teal-600) over a lime name pill "Housekeeping". Component `SvcLabel`.
- **Centered intro:** H2 "Your whole month, handled", lead.
- **Plan card (`.plan-card`):** dark ink surface (`--ink-surface` #00312D), radius `--r-lg`, `--shadow-lg`, 2-col grid (main / founding panel), decorative radial "bubble-motif" top-right.
  - Main: plan name; price `$1,200` (display 800, clamp 56–84px, white) + "/ month" (lime); note paragraph; CTAs: primary "Build your plan" + ghost-light "Call now".
  - Founding panel (translucent white): lime "Founding offer" chip; `$1,000`/mo (display 800, 48px); "The next 5 owners lock in this rate for a full year."
  - Data: `DATA.PLAN` — `{ name, price, founding, foundingSpots, note }`.

### 4a. What's included (`#included`)
- Left-aligned intro: eyebrow, H2 "The whole rhythm, covered", lead "Six things that never stop…".
- **Grid** 3-col (→2 < 1000px, →1 < 720px). Six `.incl-card`s + one dark `.incl-cta` card.
  - Card: 46px gradient bubble icon + title (display 700, 19px) + short line (teal-700, 700) + desc (14px).
  - CTA card (dark): "Included & flat" (lime), "All of it, for $1,200 a month", supporting line referencing total value.
  - Data: `DATA.INCLUDED[]` — `{ id, icon, name, short, desc }`.

### 4b. Add-ons (`#extras`, bg `--bg-2`)
- Intro: eyebrow "Scale it to your place", H2 "Simple add-ons", lead.
- **Grid** 3-col (→1 < 1000px). `.extra-card`s; one `featured` card gets a 2px accent ring + lime "Best value" flag.
  - 48px gradient circle icon; name (display 700, 21px); price "+$75" (display 800, 34px, teal-700) + unit; desc.
  - Foot note about flat monthly billing.
  - Data: `DATA.EXTRAS[]` — `{ icon, name, unit, price, desc, featured? }`.

### 4c. Value table (`#value`)
- Centered intro: eyebrow "Do the math", H2 "Piece by piece vs. your plan".
- **Comparison table** (max 980px): header row (deep teal `--teal-900` bg, white) with columns **Service · Pay as you go · With your plan · Monthly value**.
  - Body rows zebra-striped (`--bg-2` on odd). "With your plan" cell shows a small gradient check tick. Value cell is display 800.
  - "Total value" row: struck-through `$1,700`. "You pay" row: gradient teal tint bg, big teal `$1,200`.
  - **Responsive < 720px:** header hidden; each row becomes a stacked card using `data-k` labels via CSS `::before`.
  - Data: `DATA.VALUE_ROWS[]` `{ service, payg, plan, value }`, plus `DATA.VALUE_TOTAL`, `DATA.VALUE_PAY`.

### 5. Tuning (`#tuning`)
- Service label "SERVICE 2 / 4 · Tuning"; H2 "From livable to booked solid"; lead.
- **How it works:** 2 `.tune-step` cards, each a 44px gradient number badge + title + desc. Data `DATA.TUNING.steps[]`.
- **Two ways to tune:** mini-eyebrow "Two ways to tune"; 2 dark `.tune-path` cards (ink surface), 50px rounded icon (lime), title (display 800, 22px, white), desc. Data `DATA.TUNING.paths[]`.
- **Foot:** 2-col — dashed `.tune-viz` panel ("Optional · $250" flag, "Visualization", desc) + gradient `.tune-cta-card` ("$250", "Book your consult — credited toward your project", primary button + phone link).
- Data: `DATA.TUNING` — `{ consult, visualization, steps[], paths[], viz }`.

### 6. Booking & Marketing (`#marketing`, bg `--bg-2`)
- Service label "SERVICE 3 / 4 · Booking & Marketing"; H2 "Pick how much you want handled"; lead.
- **Tiers:** 3 `.mkt-card`s (→1-col < 1000px). The `popular` card (Standard) gets a 2px accent ring + centered lime "Most popular" flag.
  - Name (display 800, 22px); price "$99" (display 800, 44px, teal-700) + "/ month"; pitch line; feature list with gradient check ticks; full-width button (primary on popular, outline otherwise).
  - Data: `DATA.MARKETING_TIERS[]` — `{ name, price, popular?, pitch, features[] }`.
- **Why-flat band (`.whyflat`):** dark ink surface, 2-col. Left: 50px gradient icon + H3 "Why flat, not a percentage" + body. Right (left-divider): lime mini-eyebrow "Pairs with housekeeping" + body. Data `DATA.WHY_FLAT`.

### 7. À la carte (`#alacarte`)
- Service label "SERVICE 4 / 4 · À la carte"; H2 "Pay per job — no plan, no commitment"; lead.
- **Grid** 2-col (→1 < 1000px) of `.alc-group` cards. Each group: header (38px teal-100 icon tile + group name, bottom hairline) then a list of items.
  - Item: top row name (700, 15px) + price (display 800, teal-700, right) ; desc below (13.5px).
  - Data: `DATA.ALACARTE[]` — `{ group, icon, items: [{ name, price, desc }] }`.
- **Foot (`.alc-foot`):** "Good to know" notes list (`DATA.ALACARTE_NOTES[]`) + primary "Request a job →" button. Stacks < 720px.

### 8. Before & after (`#work`, bg `--bg-2`)
- Centered intro: eyebrow "Real Maine jobs", H2 "Before & after", lead.
- **List** (max 940px) of `.ba-pair` figures (→1-col < 1000px). Each pair: 2-col grid — a 2-up square image strip (before/after, 4px gap) on the left + caption on the right.
  - Each square image: `aspect-ratio: 1/1; object-fit: cover`, with a corner tag — "Before" (dark translucent) / "After" (accent).
  - Caption: label (display 800, 22px) + description.
  - Data: `DATA.BEFORE_AFTER[]` — `{ before, after, label, desc }`. **Images must be square** (see Assets).

### 9. Wizard (`#wizard`) — service-routing quiz
- Centered intro: eyebrow "Not sure where to start?", H2 "Build your plan in a minute", lead.
- **Shell (`.wizard-shell`):** 2-col — dark aside (step list) + main panel. Aside hidden < 1000px.
- **Steps:** `["What you need", "Property", "Your info", "Your match"]` with a top progress bar (% = (step+1)/4).
  - **Step 0 — needs (multi-select):** 2-col grid of `.choice.icon` toggle buttons (icon tile + title + sub + checkbox). Data `DATA.WIZARD_NEEDS[]` — `{ id, icon, title, sub, serviceId }`. Each maps to a service via `serviceId`.
  - **Step 1 — property:** radio grid of `DATA.PROPERTY_TYPES`, plus Bedrooms/Bathrooms selects.
  - **Step 2 — contact:** name / town / phone / email. Requires name + (phone OR email).
  - **Step 3 — your match:** computes recommended services = unique `serviceId`s from selected needs, mapped to `DATA.SERVICES` (preserving order). Renders `.rec-service` link cards (icon + name + blurb + price) + a summary list. If >1 service, shows a "run them together" note.
  - **Submit:** sets a local "done" success state (`.wizard-success` with check ring). **No real submission — wire to backend.**
- Validation gates the "Continue/Send" button per step (`canNext`).

### 10. Reviews + Follow card (`#reviews`)
- Left-aligned intro: eyebrow "Loved by locals", H2 "What Maine homeowners say".
- **Layout (`.reviews-layout`):** 2-col (1.6fr reviews / 1fr aside; →1-col < 1000px).
  - **Reviews:** 2-col grid of `.review-card`s — gold ★ row, quote, avatar (colored initial circle) + name + meta. Data `DATA.REVIEWS[]` — `{ name, meta, stars, text, color }`.
  - **Follow card (`.fb-card.follow-only`):** Facebook header (blue logo tile, page name, @handle) + body ("See our latest…" line + full-width primary "Follow us" button → `DATA.FB_URL`). **Note: the live FB feed embed was intentionally removed — keep just the follow button.**

### 11. Engagement (four ways to reach us)
- Intro: eyebrow "Four easy ways to start", H2 "How would you like to reach us?".
- **Grid** 4-col (→2 < 1000px). Cards (`.engage-card`): icon tile (featured = gradient, others = solid teal shade) + title + desc + "go" link. Actions: wizard / tel: / sms: / contact form. First card is `featured`.

### 12. Contact form (`#book`)
- **Layout (`.book-layout`):** 2-col — info panel (heading, intro, contact lines: Call/Text/Email/Service area, decorative bubble) + form card.
- **Form fields:** name* / town / email / phone / "I'm interested in" select (Housekeeping subscription · Tuning · Booking & marketing · À la carte · Not sure) / message. Submit → local success state. **Wire to backend.**

### 13. Footer
- Dark ink surface. Columns: brand + about · Services links · Get-in-touch (phone, email, Facebook, service area). Bottom row: copyright + "Sweep up the savings!" tagline.

---

## Interactions & Behavior
- **Anchor navigation:** nav links, hero chips, service cards, and recommendation cards smooth-scroll to section anchors with a ~72px sticky-header offset (`window.scrollTo`, `behavior: smooth`).
- **Sticky header:** adds shadow after 8px scroll.
- **Scroll reveal:** elements with `.reveal-up` fade/rise in via IntersectionObserver (threshold 0.08), with a `riseIn` keyframe (0.55s `--ease-out`). Honor `prefers-reduced-motion` (disable transforms). A 1.8s fallback timer forces-show in case the observer misses.
- **Hover:** cards lift one shadow step; buttons darken (`--brand` → `--brand-strong`); chips/links nudge.
- **Press:** subtle `translateY(1px) scale(0.985)`.
- **Wizard:** multi-select toggles, per-step validation, progress bar, computed recommendation, success state, "start over" reset.
- **Forms:** client-side only in the prototype — both the contact form and wizard show a success message on submit. **Implement real submission.**
- **Responsive breakpoints:** **1000px** (most grids collapse to 1–2 col; wizard aside + hero media reflow) and **720px** (nav/phone hide, remaining grids → 1-col, value table → stacked cards).

## State Management
Mostly presentational. Local component state needed:
- **Header:** `scrolled` boolean (scroll listener).
- **Wizard:** `step` (0–3), `needs` (string[]), `propType`, `beds`, `baths`, `info{name,phone,email,town}`, `done` boolean. Derived: `canNext`, `recServices` (from needs→serviceId→SERVICES), progress %.
- **Contact form:** `sent` boolean + `form{…}` field values.
- **Tweaks (prototype only — drop):** `accent`, `headline`, `bubbles`.

No data fetching in the prototype. On implementation, wire form/wizard submissions to your backend (email, CRM, or form service) and optionally move `DATA` into a CMS.

---

## Design Tokens
Full token file: `design_files/css/colors_and_type.css`. Key values:

**Brand / teal scale**
- `--teal-900 #00312D` (ink / primary text / dark surfaces)
- `--teal-800 #004B45` · `--teal-700 #005C58` · `--teal-600 #007F7A` · `--teal-500 #07A3A2`
- `--teal-400 / --brand #00D4A3` (PRIMARY spring teal) · `--brand-strong #00B589` (hover)
- `--teal-300 #4FE3C0` · `--teal-200 #9FF0DC` · `--teal-100 #D6F8EF`

**Accents (sparing):** `--lime #D6FF82` (highlights/badges) · `--green #00FF00` (micro-use only)

**Neutrals:** `--paper #FFFFFF` · `--bg #F4F8F6` · `--bg-2 #EAF2EF` · `--bg-3 #E0EBE7` · `--line #E1EAE6` · `--line-2 #CFDED9`

**Text:** `--fg1 #00312D` · `--fg2 #3F5C57` · `--fg3 #6E8A85` · `--fg-on-dark #EAF7F2`

**Dark surfaces:** `--ink-surface #00312D` · `--ink-surface-2 #00413A`

**The "accent" gradient** used on icons/ticks/bubbles: `linear-gradient(140deg, var(--accent), var(--lime))` where `--accent` defaults to `#00D4A3`.

**Typography**
- Display/headings: **Bricolage Grotesque** (500–800), tight tracking. `--font-display`.
- Body/UI: **Plus Jakarta Sans** (400–700), line-height 1.55–1.7. `--font-sans`.
- Both via Google Fonts (`@import` at top of `colors_and_type.css`).
- Scale: display 64 / h1 48 / h2 36 / h3 28 / h4 22 / body-lg 19 / body 17 / small 15 / caption 13 (px). Many headings use `clamp()` for fluid sizing — see `css/page.css`.

**Radii:** `--r-sm 10px` (inputs/chips) · `--r-md 16px` · `--r-lg 24px` (cards; `--r-xl`/`--r-2xl` alias to it) · `--r-pill 999px` (buttons/badges).

**Shadows (teal-tinted):** `--shadow-xs/sm/md/lg` + `--shadow-brand 0 14px 30px -10px rgba(0,212,163,0.45)`.

**Spacing (4pt):** `--sp-1`…`--sp-32` (4 → 128px). Section padding ~64–128px desktop.

**Motion:** `--ease-out cubic-bezier(0.22,1,0.36,1)` · `--dur 220ms` (`--dur-fast 140ms`, `--dur-slow 420ms`).

---

## Assets
All in `design_files/assets/` and `design_files/photos/`:
- **Logos:** `logo-mark-gradient.svg` (primary, works on light/dark), `logo-mark-white.svg` (footer), `logo-mark-ink.svg`, `logo-badge-round.svg`. From the Sweep 207 brand system.
- **Before/after photos:** `photos/ba-kitchen-{before,after}.jpg`, `ba-tile-{before,after}.jpg`, `ba-bedroom-{before,after}.jpg` — **all cropped to 1:1 squares**, 1000px. Pairs must stay square; center-crop new uploads the same way.
- **Hero photo:** `photos/ba-kitchen-after.jpg`. Other interior photos in `photos/` are unused extras.
- **Icons:** inline SVG via `js/icons.jsx` (names: phone, message, mail, wand, arrow, check, sparkle, leaf, spray, key, megaphone, facebook, star, clock, shield, pin, home, box, tag, calendar, wrench). Swap for your icon library; these are standard line icons.
- **Fonts:** Bricolage Grotesque + Plus Jakarta Sans (Google Fonts).

> Note: the before/after photos and several interior shots are AI-generated placeholders / sample
> jobs. Replace with the client's real, rights-cleared photography before launch. Confirm the
> Facebook page URL (`https://www.facebook.com/housekeeping207/`) and phone/email are current.

---

## Files (in `design_files/`)
- `index.html` — document shell, font/CSS links, script load order.
- `css/colors_and_type.css` — **design tokens** (colors, type, radii, shadows, spacing, motion).
- `css/ds-components.css` — base component styles (buttons, inputs, fields, badges).
- `css/page.css` — **all page/section layout & component CSS** (the bulk of the styling).
- `js/data.js` — **all content & pricing** (`window.DATA`). The content model.
- `js/icons.jsx` — inline SVG icon set.
- `js/sections1.jsx` — helpers (reveal, bubble, smooth-jump), Header, Hero, ServicesOverview, Engagement.
- `js/sections2.jsx` — Housekeeping plan, Included, Extras, ValueTable, `SvcLabel`.
- `js/sections3.jsx` — Tuning, Marketing (tiers + why-flat), À la carte.
- `js/sections4.jsx` — BeforeAfter, ReviewsFB (reviews + follow card), Booking (contact form), Footer.
- `js/wizard.jsx` — the service-routing wizard.
- `js/app.jsx` — composition/order of all sections + (prototype-only) tweaks wiring.
- `tweaks-panel.jsx` — prototype authoring tool. **Do not port.**

To preview the prototype as-is, serve the `design_files/` folder over any static server and open
`index.html` (it needs HTTP, not `file://`, because of the module/script loading).
