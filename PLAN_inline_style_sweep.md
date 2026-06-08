# Plan — Inline Style Sweep

**Status:** awaiting go-ahead
**Branch:** `main` (no branch per project rule)
**Goal:** Remove all static inline `style={{...}}` from JSX. Move every layout/spacing/color decision into `css/`. Runtime-computed values (e.g. `transitionDelay = i * 60 + "ms"`) stay inline because they cannot live in CSS.

## Why
`index.html` mixes three stylesheets with 88 inline `style={{}}` props across 6 JSX files. The "Piece by piece vs. your plan" block looks centered while sibling sections look left-aligned — not because of the global CSS but because that block has `textAlign:center; max-width:640; margin:0 auto` written inline on the JSX. Sections without those inline overrides fall back to defaults. Removing the inline rules fixes the inconsistency at the source.

## Constraints (from user feedback)
- No inline styles
- No hardcoded values (px, hex)
- No `!important`
- Reuse existing tokens and styles
- Stay global (no per-section bespoke CSS)
- Don't change semantic HTML

## Files in scope
- `css/colors_and_type.css`
- `css/ds-components.css`
- `css/page.css`
- `js/sections1.jsx`
- `js/sections2.jsx`
- `js/sections3.jsx`
- `js/sections4.jsx`
- `tweaks-panel.jsx`
- `js/wizard.jsx`

## 5 commits (each one independently reviewable)

### Commit 1 — `.section-head` and `.section-head--center`
Add in `css/ds-components.css`:
- `.section-head` — left-aligned section heading wrapper; uses token `--heading-max` for `max-width` and `--space-7` (or whatever rhythm token exists) for bottom margin.
- `.section-head--center` — modifier that adds `text-align:center`, `margin-inline:auto`, and centers the nested `.eyebrow`.
No JSX edits in this commit — CSS only.

### Commit 2 — rhythm spacing for headings/leads
In `css/colors_and_type.css`, confirm rhythm tokens exist (e.g. `--space-2`, `--space-3`, `--space-4`). In `css/ds-components.css`, apply:
- `.section-head > h2 { margin-top: <token>; }`
- `.section-head > .lead { margin-top: <token>; }`
This kills the per-element `style={{ marginTop: 12 }}` rules.

### Commit 3 — `.section--alt` for alt background
In `css/ds-components.css`:
- `.section--alt { background: var(--bg-2); }`
Then in JSX, swap `style={{ background: "var(--bg-2)" }}` → `className="section section--alt"`. 4 places.

### Commit 4 — strip inline `style` from JSX
For every `style={{...}}` whose values are static (no `i * 60`, no runtime values), delete it and add the matching class. Affects all 6 JSX files. Keep computed-value styles intact (animation delays).

### Commit 5 — one-off colors → utility classes
Remaining one-offs like `style={{ color: "var(--lime)" }}` get short utility classes in the DS layer:
- `.t-lime { color: var(--lime); }`
- `.t-white { color: #fff; }` (or use existing on-dark token)
- `.t-on-dark-soft { color: var(--fg-on-dark); opacity: .82; }`
JSX swaps the inline `style` for the utility class.

## Out of scope (do not touch in this sweep)
- Computed inline styles (`transitionDelay`, dynamic backgrounds via data, etc.)
- React/Babel pipeline
- Component logic
- Copy / content
- Anything in `tweaks-panel.jsx` that is the live tweaks UI (sweep cosmetic styles there too, but no logic changes)

## Ask-before-every-step git loop (per project rule)
1. "Pull first?" → wait → pull
2. Make commit 1 → "Shall I commit?" → wait → commit
3. Repeat per commit
4. "Pull before push?" → wait → pull
5. "Shall I push to live?" → wait → push
