# 207 HouseKeeping

Marketing prototype for **207 HouseKeeping** — property management & trusted home care across Maine.

## What this is

A fully static, single-page prototype. There is **no build step**: React and
Babel are loaded from a CDN and the `.jsx` files are transpiled in the browser.

```
index.html            entry point
css/                  design tokens, components, page styles
js/                   React components (data, icons, sections, wizard, app)
tweaks-panel.jsx      live "Tweaks" editor panel
assets/               logos
photos/               imagery
```

## Run locally

Because the page fetches the `.jsx`/`.js` files over HTTP, open it through a
local server rather than `file://`:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Pushes to `main` (and the active prototype branch) are published to **GitHub
Pages** automatically via `.github/workflows/deploy-pages.yml`.
