# Email templates

All transactional emails sent from the 207 HouseKeeping site live here as
brand-coherent HTML. The site itself doesn't send these — third-party
services (Formspree, Elfsight) do. These files are the **source of truth**
that gets pasted into each service's template editor.

## Index

| Template | Triggered by | Pasted into | Recipient | Subject line |
|---|---|---|---|---|
| [`contact-autoreply.html`](./contact-autoreply.html) | Contact form submit (`js/sections4.jsx`) | Formspree → Form settings → Notifications → Customize autoresponder | The person who filled out the form | `We got your message — 207 HouseKeeping` |
| [`coupon-autoreply.html`](./coupon-autoreply.html) | $200-off popup signup (`index.html` Elfsight widget) | Elfsight dashboard → Email Notifications → Subscriber confirmation | The person who signed up | `Your $200 off — 207 HouseKeeping` |

## How to edit

1. Edit the `.html` file here, commit, push.
2. Open the service's template editor (column 3 above).
3. Paste the **entire file contents** (including the top `<style>` block and the leading HTML comment) into the editor's Source / `<>` view.
4. Save in the service. Test by submitting the form / popup.

The repo file is always canonical. If the email arrives looking different
from the file, the dashboard has drifted — repaste from the file.

## Conventions every template follows

- **Self-contained.** Each file is one paste — `<style>` block at the top, HTML markup below. No external CSS, no JS.
- **Inline-style fallback.** Modern Gmail / Apple Mail honor the `<style>` block; some Outlook clients strip it. If a client renders unstyled, run the file through [premailer.io](https://premailer.io) (free) to inline the styles, and keep the inlined copy alongside the source.
- **Live brand assets.** Logos are loaded from `https://207housekeeping.com/assets/` so a brand refresh on the live site flows into existing emails automatically.
- **Templating placeholders.** Use the receiving service's syntax — Formspree uses `{{ name }}` (Mustache), Elfsight uses `{first_name}` / `{email}`. Don't mix.
- **One CTA per email.** Call / Text / Facebook buttons in that order. No marketing links beyond the footer.

## Adding a new template

1. Drop a new file in this folder named `<source>-<purpose>.html` (e.g., `wizard-autoreply.html`).
2. Copy the `<style>` block from an existing template to stay on brand.
3. Add a row to the index table above.
4. Note which service it gets pasted into.
