# 207 HouseKeeping — Project Notes

Living handoff so anyone (or any future Claude session) can pick up this
project without re-discovering everything. Append new sections at the
bottom; don't rewrite history.

---

## Where it lives

- **Local path:** `/Users/sandy/Documents/207`
- **Repo:** https://github.com/liza-bam/207
- **Live site:** https://207housekeeping.com (custom domain on GitHub Pages)
- **Backup URL:** https://liza-bam.github.io/207/

## Stack

- Plain HTML + React (UMD) + Babel-standalone in the browser. No build step.
- Three CSS layers in `css/`:
  - `colors_and_type.css` — design tokens (colors, type scale, spacing, radii, shadows, motion)
  - `ds-components.css` — reusable components (buttons, fields, cards, badges, chips, section-head, color utilities)
  - `page.css` — page-level layout, header, hero, sections
- JSX components in `js/sections1.jsx` → `sections4.jsx`, plus `wizard.jsx`, `app.jsx`, `data.js`, `icons.jsx`.
- Brand: design system in `/Users/sandy/.claude/skills/207-housekeeping-design/`
  (invoke `/207-housekeeping-design` to load brand tokens, logos, photos).

## How to start a session

1. `cd /Users/sandy/Documents/207`
2. `git pull` (ask Liza first per the project rule)
3. Start local server: `python3 -m http.server 8208`
4. Open http://localhost:8208/index.html
5. **Hard-refresh** (Cmd+Shift+R) after every JSX edit — Babel-standalone caches compiled output and won't pick up changes otherwise.
6. Open Playwright (it's auto-loaded by the project-start skill).

## Git workflow (per Liza's rules)

- Work on `main` directly. No branches unless Liza asks.
- Ask before every git step: "Pull first?" → "Shall I commit?" → "Shall I push?"
- Never `--force`, `--no-verify`, or `reset --hard`.
- One change per commit when possible.

## DNS / Email infrastructure

- **Registrar:** Hover.com
- **DNS records:** 4 A records → GitHub Pages IPs (`185.199.108-111.153`),
  CNAME `www` → `liza-bam.github.io`, MX record kept (Hover email).
- **Site email displayed:** `info@207housekeeping.com` (set in `js/data.js`).
- **Actual mailbox:** NOT yet set up — see Open Threads below.

## Third-party

- **Elfsight chatbot** — embedded in `index.html` (script in head, div at end of body).
- **Elfsight popup** ($200-off coupon) — created in Elfsight dashboard, NOT yet embedded on the site (waiting for Liza to paste the widget div).
- **Auto-reply email** — template lives at `emails/coupon-autoreply.html`. Edit there, then re-paste into Elfsight's auto-reply HTML editor.

## CSS conventions in this project

- No inline styles in JSX except for **runtime-computed values**
  (`transitionDelay = i * 60 + "ms"`, data-driven colors via CSS custom
  properties like `--engage-icon-bg`).
- No hardcoded px/hex values — always use tokens from `colors_and_type.css`.
- No `!important`.
- Reusable classes live in `ds-components.css`; page-specific layout in `page.css`.
- Every new class block carries a short comment explaining what it is.

## Files Liza should know about

- `PLAN_inline_style_sweep.md` — the plan I followed to refactor inline styles.
- `emails/coupon-autoreply.html` — the popup auto-reply HTML.
- `CNAME` — the custom-domain marker GitHub Pages reads.
- `DESIGN_HANDOFF.md` — the original brand handoff doc (pre-redesign).

---

## Session log

### 2026-06-08 (this session)

**Done & live:**
- Refactored 88 inline `style={{}}` props → 14 (the 14 are runtime-driven). Added `.section-head` / `.section-head--center` / `.section-head--sm`, `.section--alt`, color utilities `.t-lime` / `.t-paper` / `.t-on-dark-soft`, `.bubble`, hero + contact bubble position classes.
- Custom domain wired: Hover DNS → GitHub Pages → https://207housekeeping.com with HTTPS.
- Header v2: removed "Get started" (already in hero), swapped Call link for a green "Text us" pill (`sms:`), added hamburger drawer at <1200px. Text us stays visible at every width.
- Centered `.hero-media` at <=1000px (was sticking left, leaving an empty right half).
- Site email everywhere → `info@207housekeeping.com` (in `js/data.js`).
- Embedded Elfsight AI chatbot widget in `index.html`.
- Removed all founding-offer mentions ($1,000 / first 5 owners) — both the `.plan-founding` panel on the Housekeeping card and the matching sentence on the value-table footer. Collapsed `.plan-card` to single column.
- Saved coupon auto-reply email template to `emails/coupon-autoreply.html`.

**Open threads (pick up here):**
1. **Mailbox for `info@207housekeeping.com`** — display is on the site, but no real mailbox exists. Choose one path:
   - **Hover Mail** (~$25/yr): leave MX alone, create `info` mailbox in Hover dashboard → Email tab.
   - **Zoho Mail** (free tier): delete current MX, add Zoho's MX records, set up `info` mailbox in Zoho.
   - **Email forward only**: cheap, info@... forwards to a Gmail.
2. **Embed the Elfsight popup on the site** — Liza needs to paste the widget div (`<div class="elfsight-app-...">`) from the Elfsight dashboard. The chatbot script is already loaded, so only the div is needed.
3. **Test the auto-reply email end-to-end** — once the popup div is embedded and Elfsight's auto-reply is set up (Email Notifications → Subscriber confirmation, paste `emails/coupon-autoreply.html`), submit the form with a real email and confirm the coupon arrives.
4. **Verify "Enforce HTTPS"** is checked at https://github.com/liza-bam/207/settings/pages (cert was issued earlier — should be ON now).
5. **Inline-style sweep, round 2** — `wizard.jsx` and `tweaks-panel.jsx` still have inline `style={{}}` props I didn't touch. Lower priority since they're interactive panels.
