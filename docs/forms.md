# 207 HouseKeeping — Forms & Email Pipeline

Everything about how a form submission on `207housekeeping.com` becomes
an email in the owner's inbox and a branded auto-reply in the visitor's
inbox. Self-contained — read this and you can rebuild, debug, or extend
the system without asking anyone.

---

## 1. The flow at a glance

```
  ┌─────────────────┐    POST JSON     ┌──────────────────────┐    Brevo API     ┌──────────┐
  │ Browser (form)  │ ───────────────▶ │ Cloudflare Worker    │ ───────────────▶ │  Brevo   │
  │  sections4.jsx  │   over HTTPS     │  worker/contact.js   │  with API key    │ (sender) │
  └─────────────────┘                  └──────────────────────┘                  └────┬─────┘
                                                                                     │
                                                                                     │ SMTP
                                                                                     ▼
                                                              ┌──────────────────────────────────┐
                                                              │  Owner inbox(es)                 │
                                                              │   support@207housekeeping.com    │
                                                              │   sandy@tayts.com (CC)           │
                                                              │                                  │
                                                              │  Visitor inbox (auto-reply)      │
                                                              │   the email they typed in        │
                                                              └──────────────────────────────────┘
```

One submission → two emails (the second only if the visitor gave an
email address).

---

## 2. Vendors and what each one does

| Vendor | URL | Role | Cost | Account / Key |
|---|---|---|---|---|
| **GitHub Pages** | `github.com/liza-bam/207` | Hosts the static website (`index.html` + `/js` + `/css` + `/assets`). Auto-deploys from `main`. | Free | GitHub account `liza-bam` |
| **Hover** | `hover.com` | Domain registrar for `207housekeeping.com`. Holds the DNS records (A records → GH Pages, CNAME `www`, TXT/CNAME for Brevo). | Domain renewal only | Owner's Hover account |
| **Cloudflare Workers** | `workers.cloudflare.com` | Hosts the serverless "form relay" function that holds the Brevo API key and posts to Brevo. The browser can't hold the API key directly (it'd be public). | Free tier — 100 000 requests/day, plenty | `alexandra.tayts@gmail.com` |
| **Brevo** (formerly Sendinblue) | `brevo.com` | Sends the actual emails — both the owner notification and the visitor auto-reply. Domain `207housekeeping.com` is verified, so emails arrive "From" the brand, not a generic noreply. | Free tier — 300 emails/day (~9 000/month), no domain limit | `alexandra.tayts@gmail.com` |
| **Apple/Gmail/etc.** | — | Where the resulting emails are read. Nothing to configure here, but their spam rules drive why we set up SPF / DKIM / DMARC on the domain. | n/a | n/a |

Anything else (Formspree, Web3Forms, Formsubmit, Mailersend, Resend) was
considered and rejected during the build — see "History / why these
vendors" at the bottom if you're curious.

---

## 3. Files in this repo, and what each does

```
207/
├── index.html                  loads the React/Babel layers + Elfsight widgets
├── js/
│   ├── data.js                 ← FORM_ENDPOINT lives here (the Worker URL)
│   ├── sections4.jsx           ← Contact form Booking component (submit handler)
│   ├── wizard.jsx              the multi-step wizard (NOT YET WIRED TO PIPELINE)
│   └── …                       other JSX sections (hero, savings, etc.)
├── css/
│   ├── colors_and_type.css     design tokens
│   ├── ds-components.css       reusable components — includes .honeypot, .form-error
│   └── page.css                page-level layout
├── emails/
│   ├── README.md               index of email templates + how to use them
│   └── contact-autoreply.html  canonical auto-reply (also embedded in the Worker)
├── worker/
│   └── contact.js              ← THE Cloudflare Worker (this is the relay)
├── docs/
│   └── forms.md                ← this file
├── CLAUDE.md                   project notes / session log
└── …
```

### The two files that matter most

- **`js/data.js`** — one constant `FORM_ENDPOINT` tells every form on the
  site where to POST. Change one line, every form follows. The constant
  is exported on `window.DATA` (line ~248) and consumed as `D4.FORM_ENDPOINT`
  in `sections4.jsx`.
- **`worker/contact.js`** — the entire server-side logic. Receives the
  POST, validates, builds both email HTMLs inline, calls Brevo twice,
  responds JSON. The HTML templates are JS template literals inside the
  Worker (lines ~95 onward) so the Worker is fully self-contained — no
  fetching templates at runtime.

---

## 4. Step-by-step: what happens when a visitor submits

1. Visitor fills the form on `207housekeeping.com` (Booking section).
2. On submit, `sections4.jsx` calls `fetch(D4.FORM_ENDPOINT, …)` with a
   JSON body containing `name, email, phone, town, interest, message,
   source: "Contact form", botcheck`.
3. Cloudflare routes the request to the Worker (`worker/contact.js`).
4. Worker validates: rejects non-POST, rejects invalid JSON, drops
   honeypot-filled submissions (`botcheck` non-empty).
5. Worker calls Brevo's `POST /v3/smtp/email` with:
   - **From:** `noreply@207housekeeping.com` (display name "207 HouseKeeping")
   - **To:** `support@207housekeeping.com`
   - **CC:** `sandy@tayts.com`
   - **Reply-To:** the visitor's email (so a one-click reply lands in their inbox)
   - **Subject:** `Contact form — new inquiry from <Name>`
   - **htmlContent:** branded notification template (data table + reply/call buttons)
6. If the visitor included an email, Worker calls Brevo again:
   - **To:** the visitor
   - **Subject:** `We got your message — 207 HouseKeeping`
   - **htmlContent:** branded auto-reply template
7. Worker responds `{"ok": true}` (or `{"ok": true, "warning": …}` if the
   auto-reply failed but the notification succeeded).
8. The form shows the "Thanks, <name>!" success screen.

If anything in step 5 fails, the Worker returns HTTP 502 and the form
shows an inline error box with a `mailto:` fallback.

---

## 5. Secrets and where they live

| Secret | Where it lives | How it's read |
|---|---|---|
| **Brevo API key** (`xkeysib-…`) | Cloudflare → your Worker → **Settings → Variables and Secrets** → name **`BREVO_API_KEY`** | Worker reads `env.BREVO_API_KEY` at line 70 of `worker/contact.js` |

That is the only secret. It is **never** in the repo, **never** in the
browser, **never** in CLAUDE.md. If it ever appears in a screenshot or a
chat, rotate it immediately at Brevo → Settings → SMTP & API → revoke +
generate new.

---

## 6. DNS records on `207housekeeping.com` (at Hover)

These are what make Brevo emails arrive looking like real
207housekeeping.com mail, not Brevo spam.

| Type | Host | Value | Purpose |
|---|---|---|---|
| TXT | `@` (root) | `brevo-code:<hex>` | Domain ownership verification for Brevo |
| TXT | `@` (root) | `v=spf1 include:spf.brevo.com ~all` | SPF — authorizes Brevo to send as the domain |
| CNAME | `brevo1._domainkey` | `b1.207housekeeping-com.dkim.brevo.com.` | DKIM signing key 1 |
| CNAME | `brevo2._domainkey` | `b2.207housekeeping-com.dkim.brevo.com.` | DKIM signing key 2 |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | DMARC policy + aggregate reporting |

The site-hosting records (4 A records → GH Pages IPs, CNAME `www`) are
separate and unrelated to email.

To check whether DNS is live, from any shell:

```
dig +short TXT 207housekeeping.com
dig +short CNAME brevo1._domainkey.207housekeeping.com
dig +short TXT _dmarc.207housekeeping.com
```

---

## 7. Email templates: how they're authored, where they live, how to edit

There are two distinct surfaces for each email template:

1. **The Worker** (`worker/contact.js`) — the *running* copy. This is
   what actually gets sent. The HTML is inline in a JS template literal
   (functions `renderNotification()` and `renderAutoreply()`).
2. **The `emails/` folder** — the *human-readable* canonical copy. Same
   HTML, but standalone and easier to read/preview. Currently:
   - `emails/contact-autoreply.html`
   - (Notification has no standalone file yet — only lives in the Worker.)

**To change the auto-reply copy:**
1. Edit `emails/contact-autoreply.html`.
2. Mirror the change in `worker/contact.js` → `renderAutoreply()`.
3. Commit + push. (Cloudflare auto-deploys if you connected the repo;
   otherwise paste the new `contact.js` into the Cloudflare dashboard
   editor and click Deploy.)

**To change the owner notification:**
1. Edit `worker/contact.js` → `renderNotification()`.
2. Commit + push (or paste-deploy).

**Why a duplicate copy?** A Cloudflare Worker can't fetch from the repo
at runtime — code on the Worker has to be self-contained. Keeping the
canonical copy in `emails/` makes the templates editable as a unit
(preview in a browser, share with designers) and the Worker has its
own embedded copy for runtime.

---

## 8. How to change who receives email

All in `worker/contact.js` at the top (lines 7–10):

```js
const TO         = "support@207housekeeping.com";  // primary recipient
const CC         = "sandy@tayts.com";              // CC
const FROM_EMAIL = "noreply@207housekeeping.com";  // From address
const FROM_NAME  = "207 HouseKeeping";             // display name
```

Edit, commit + push (or paste-deploy in Cloudflare). The site code in
`js/data.js` never needs to change for recipient changes — it only knows
the Worker URL.

---

## 9. How to add a new form (Wizard, or anything future)

Pattern: same pipeline, different `source` value.

1. In the new form's JSX, on submit, POST JSON to `D.FORM_ENDPOINT`
   with at minimum: `{ name, email, source: "<form name>", … any custom fields }`.
   Example for Wizard:
   ```js
   await fetch(DW.FORM_ENDPOINT, {
     method: "POST",
     headers: { "Content-Type": "application/json", Accept: "application/json" },
     body: JSON.stringify({
       name: info.name,
       email: info.email,
       phone: info.phone,
       town: info.town,
       needs: needLabels.join(", "),
       property_type: propType,
       beds, baths,
       recommended_services: recServices.map(s => s.name).join(", "),
       source: "Wizard",
       botcheck: "",
     }),
   });
   ```
2. The Worker already routes on `source` (subject line and notification
   eyebrow both pull from it) — no Worker changes needed for a standard
   "form → email" flow.
3. If the new form has fields the Worker doesn't currently echo (e.g.
   `needs`, `beds`, `baths`), add them to the `f = { … }` object at the
   top of the Worker and add `row("Label", f.field)` lines inside
   `renderNotification()`.

---

## 10. How to change copy on the success screen ("Thanks, neighbor!")

That's in `js/sections4.jsx`, the `if (sent) { … }` block (~line 130).
Edit, commit, push. No Brevo/Worker touch needed.

---

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Form shows red error box | Worker returned non-2xx. Open browser DevTools → Network → check the response. | Most common: `BREVO_API_KEY` missing/wrong in CF. Re-add the secret. |
| Worker returns `502` `{"error":"Email send failed","detail":"…Key not found…"}` | Brevo rejected the API key. | Verify the Cloudflare secret is named exactly `BREVO_API_KEY`, value starts with `xkeysib-`, full string (not truncated). |
| Worker returns `200` but no email arrives | Brevo accepted but couldn't deliver. | Check Brevo → Transactional → Logs (or "Real time") for bounces or rejections. Most common: domain DNS not fully verified (SPF/DKIM missing), recipient address invalid. |
| Email lands in spam | DNS records incomplete or DMARC mismatched. | Re-check the 5 DNS records in section 6. SPF must include `spf.brevo.com`. DKIM both `brevo1` and `brevo2` CNAMEs must resolve. |
| Emails labeled "This message is from a mailing list" | Brevo's default `List-Unsubscribe` header. Transactional contact forms shouldn't have it. | Add `headers: { "List-Unsubscribe": "" }` (empty) to the Brevo payload in the Worker, or upgrade Brevo plan to control headers. |
| Code is changed locally but site is unchanged | GH Pages serves from `main`. Local edits don't deploy. | `git push`. GH Pages redeploys in ~1 min after push. |
| Worker code is changed locally but emails still look old | Cloudflare Worker doesn't auto-pull from the repo unless explicitly connected. | Paste new `worker/contact.js` into the CF dashboard editor, click Deploy. (Or set up Git integration on the Worker.) |
| `dig` shows DNS, but Brevo still says domain unverified | DNS may take up to 24 hours to propagate everywhere, especially DKIM. | Wait. If still unverified after 24h, re-check the exact host/value in Hover matches what Brevo shows. |

---

## 12. Costs and limits today

- **GitHub Pages:** free, unlimited static traffic.
- **Hover:** ~$15/yr for domain renewal. Nothing per email.
- **Cloudflare Workers:** free up to 100 000 requests/day. Each form
  submission = 1 request. At 100k/day we'd need to upgrade — not today's
  problem.
- **Brevo:** free up to 300 emails/day (~9 000/month). Each form
  submission generates **up to 2 emails** (notification + auto-reply),
  so the practical cap is ~150 submissions/day. Plenty.
- **Apple/Gmail/etc.:** free. Just respect their deliverability rules
  (we do, via SPF/DKIM/DMARC).

If we ever outgrow Brevo's free tier: AWS SES is the cheap-at-scale
fallback ($0.10 per 1 000 emails, no domain limit, more setup).

---

## 13. History / why these vendors (skip if not curious)

Build went through three form services before landing here:

1. **Formspree** — paid $15/mo. Worked, but locked custom HTML
   auto-reply behind paid plan; we cancelled to save the money.
2. **Web3Forms** — free, fine, but `From` address was
   `notifications@web3forms.com` with no way to use the brand domain on
   the free tier. Killed.
3. **Brevo** (current) — free tier covers our scale, supports custom
   `From` address with verified domain, supports CC, supports rich HTML.
   The catch: Brevo's API requires authentication, which means the
   browser can't talk to it directly — hence the Cloudflare Worker.

Reasonable alternatives if we ever leave Brevo: **Resend** (free
3 000/mo per domain, $40/mo for multi-domain), **Mailersend** (free
tier was cut to 500/mo with "delivered with Mailersend" footer — avoid),
**AWS SES** (scale king, more setup).

---

*Last updated 2026-06-13. If a section here drifts from reality, fix the
section, don't write a new note.*
