// Cloudflare Worker — 207 HouseKeeping form relay
// Receives form POST, sends TWO branded emails via Brevo:
//   1) Notification → support@ + sandy@ (CC)
//   2) Autoreply    → the submitter
// Set BREVO_API_KEY as a secret in the Cloudflare dashboard
// (Worker → Settings → Variables and Secrets).

const TO = "support@207housekeeping.com";
const CC = "sandy@tayts.com";
const FROM_EMAIL = "noreply@207housekeeping.com";
const FROM_NAME = "207 HouseKeeping";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (request.method !== "POST") return json({ error: "POST only" }, 405);

    const data = await request.json().catch(() => null);
    if (!data) return json({ error: "Invalid JSON" }, 400);
    if (data.botcheck) return json({ ok: true }); // honeypot — pretend success

    const f = {
      name: clip(data.name, 200) || "site visitor",
      email: clip(data.email, 200),
      phone: clip(data.phone, 50),
      town: clip(data.town, 100),
      interest: clip(data.interest, 200),
      message: clip(data.message, 4000),
      source: clip(data.source, 100) || "Contact form",
    };

    // 1) Notification → us
    const notifyRes = await sendBrevo(env, {
      sender: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: TO }],
      cc: [{ email: CC }],
      replyTo: f.email ? { email: f.email, name: f.name } : undefined,
      subject: `${f.source} — new inquiry from ${f.name}`,
      htmlContent: renderNotification(f),
    });
    if (!notifyRes.ok) return json({ error: "Notification send failed", detail: notifyRes.detail }, 502);

    // 2) Autoreply → submitter (only if they gave an email)
    if (f.email) {
      const replyRes = await sendBrevo(env, {
        sender: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email: f.email, name: f.name }],
        replyTo: { email: TO, name: FROM_NAME },
        subject: "We got your message — 207 HouseKeeping",
        htmlContent: renderAutoreply(f),
        textContent: renderAutoreplyText(f),
      });
      if (!replyRes.ok) return json({ ok: true, warning: "Autoreply failed", detail: replyRes.detail });
    }

    return json({ ok: true });
  },
};

async function sendBrevo(env, payload) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return { ok: false, detail: await res.text() };
  return { ok: true };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function clip(s, n) {
  return String(s ?? "").slice(0, n);
}
function row(label, value) {
  if (!value) return "";
  return `<tr><td class="k">${esc(label)}</td><td class="v">${esc(value)}</td></tr>`;
}

// ---------- Notification (internal) ----------
function renderNotification(f) {
  return `
<style>
  .n      { background:#EAF2EF; font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#00312D; }
  .n-wrap { padding:24px 16px; }
  .n-card { max-width:600px; width:100%; background:#FFFFFF; border-radius:20px; overflow:hidden; box-shadow:0 16px 40px -12px rgba(0,49,45,0.18); }
  .n-hd   { background:linear-gradient(140deg,#00312D 0%,#005C58 100%); padding:24px 28px; color:#FFFFFF; }
  .n-eyebrow { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#D6FF82; font-weight:700; }
  .n-title   { font-weight:800; font-size:20px; line-height:1.3; margin:6px 0 0; }
  .n-body { padding:8px 28px 24px; }
  .n-table { width:100%; border-collapse:collapse; margin-top:8px; }
  .n-table .k { padding:12px 0; font-size:13px; font-weight:700; color:#007F7A; text-transform:uppercase; letter-spacing:0.08em; width:130px; vertical-align:top; border-bottom:1px solid #E1EAE6; }
  .n-table .v { padding:12px 0; font-size:15px; color:#00312D; border-bottom:1px solid #E1EAE6; white-space:pre-wrap; }
  .n-cta { padding:20px 28px 28px; text-align:center; }
  .n-btn { display:inline-block; font-weight:700; font-size:15px; text-decoration:none; padding:12px 22px; border-radius:999px; margin:4px 4px; color:#FFFFFF; background:#00D4A3; }
  .n-btn--dark { background:#00312D; }
  .n-ft { padding:18px 28px 28px; border-top:1px solid #E1EAE6; font-size:12px; color:#6E8A85; text-align:center; }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="n">
  <tr><td align="center" class="n-wrap">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="n-card">
      <tr><td class="n-hd">
        <div class="n-eyebrow">New ${esc(f.source)}</div>
        <div class="n-title">${esc(f.name)}${f.town ? ` &middot; ${esc(f.town)}` : ""}</div>
      </td></tr>
      <tr><td class="n-body">
        <table role="presentation" class="n-table" cellpadding="0" cellspacing="0" border="0">
          ${row("Name", f.name)}
          ${row("Email", f.email)}
          ${row("Phone", f.phone)}
          ${row("Town", f.town)}
          ${row("Interested in", f.interest)}
          ${row("Message", f.message)}
        </table>
      </td></tr>
      <tr><td class="n-cta">
        ${f.email ? `<a href="mailto:${esc(f.email)}" class="n-btn">Reply by email</a>` : ""}
        ${f.phone ? `<a href="tel:${esc(f.phone)}" class="n-btn n-btn--dark">Call ${esc(f.phone)}</a>` : ""}
      </td></tr>
      <tr><td class="n-ft">Sent from the 207housekeeping.com contact form.</td></tr>
    </table>
  </td></tr>
</table>`;
}

// ---------- Autoreply plain-text fallback ----------
// Both HTML and plain-text versions sent — significantly improves
// deliverability (Apple Mail / Gmail spam filters prefer multipart).
function renderAutoreplyText(f) {
  const firstName = (f.name.split(" ")[0] || "neighbor");
  return [
    `Thanks, ${firstName} — your message is in our hands.`,
    ``,
    `We'll come back to you the same day, usually within a couple of hours.`,
    `No phone tree, no ticket number — just a real Maine neighbor.`,
    ``,
    `What happens next:`,
    `  1. We read your request.`,
    `  2. We reach back out by text or call, whichever you prefer.`,
    `  3. You get a flat-rate quote.`,
    ``,
    `Need us sooner? Call or text (207) 598-9215.`,
    ``,
    `— 207 HouseKeeping`,
    `Central Maine — Portland · Augusta · Farmington · Windham`,
    `https://207housekeeping.com`,
  ].join("\n");
}

// ---------- Autoreply (to submitter) ----------
function renderAutoreply(f) {
  const firstName = esc(f.name.split(" ")[0] || "neighbor");
  return `
<style>
  .rc-email      { background:#EAF2EF; font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#00312D; }
  .rc-email-wrap { padding:32px 16px; }
  .rc-email-card { max-width:600px; width:100%; background:#FFFFFF; border-radius:24px; overflow:hidden; box-shadow:0 24px 56px -16px rgba(0,49,45,0.18); }
  .rc-email-hd   { background:linear-gradient(140deg,#00312D 0%,#005C58 100%); padding:36px 24px; text-align:center; }
  .rc-email-logo { display:block; width:72px; height:72px; border:0; outline:none; text-decoration:none; margin:0 auto; }
  .rc-email-brand { color:#FFFFFF; font-weight:700; font-size:18px; letter-spacing:-0.01em; margin-top:14px; }
  .rc-email-sub   { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#D6FF82; font-weight:700; margin-top:4px; }
  .rc-email-hero  { padding:44px 32px 8px; text-align:center; }
  .rc-email-chip  { display:inline-block; background:#D6FF82; color:#00312D; font-size:12px; font-weight:800; letter-spacing:0.14em; text-transform:uppercase; padding:6px 14px; border-radius:999px; }
  .rc-email-h1    { font-weight:800; font-size:24px; line-height:1.35; letter-spacing:-0.01em; color:#00312D; margin:18px 0 0; }
  .rc-email-h1 .accent { color:#00D4A3; }
  .rc-email-lead-cell { padding:18px 36px 8px; text-align:center; }
  .rc-email-lead { margin:0; font-size:16px; line-height:1.6; color:#3F5C57; }
  .rc-email-lead strong { color:#00312D; }
  .rc-email-list-cell  { padding:24px 36px 8px; }
  .rc-email-list-label { font-size:12px; font-weight:800; letter-spacing:0.14em; text-transform:uppercase; color:#007F7A; text-align:center; margin-bottom:14px; }
  .rc-email-list       { background:#F4F8F6; border-radius:16px; padding:8px 4px; width:100%; }
  .rc-email-list td    { padding:14px 20px; font-size:15px; color:#00312D; vertical-align:top; }
  .rc-email-list tr + tr td { border-top:1px solid #E1EAE6; }
  .rc-email-list-num   { display:inline-block; width:26px; height:26px; line-height:26px; border-radius:50%; background:#00D4A3; color:#00312D; font-weight:800; font-size:13px; text-align:center; margin-right:10px; }
  .rc-email-cta-cell { padding:32px 36px 8px; text-align:center; }
  .rc-email-cta-lead { font-size:16px; line-height:1.6; color:#00312D; margin-bottom:6px; }
  .rc-email-cta-note { font-size:13px; line-height:1.5; color:#6E8A85; margin-bottom:18px; }
  .rc-email-btn      { display:inline-block; font-weight:700; font-size:16px; text-decoration:none; padding:14px 26px; border-radius:999px; margin:4px 4px; color:#FFFFFF; }
  .rc-email-btn--call { background:#00D4A3; }
  .rc-email-btn--text { background:#00312D; }
  .rc-email-btn--fb   { background:#1877F2; margin-top:8px; }
  .rc-email-ft       { padding:36px 32px 36px; border-top:1px solid #E1EAE6; margin-top:24px; text-align:center; }
  .rc-email-tagline  { font-size:16px; font-weight:800; color:#00312D; }
  .rc-email-meta     { margin:12px 0 0; font-size:13px; line-height:1.6; color:#6E8A85; }
  .rc-email-meta a   { color:#007F7A; text-decoration:none; }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="rc-email">
  <tr><td align="center" class="rc-email-wrap">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="rc-email-card">
      <tr><td class="rc-email-hd">
        <img src="https://207housekeeping.com/assets/logo-mark-gradient.svg" alt="207 HouseKeeping" width="72" height="72" class="rc-email-logo">
        <div class="rc-email-brand">207 HouseKeeping</div>
        <div class="rc-email-sub">Property Management</div>
      </td></tr>
      <tr><td class="rc-email-hero">
        <div class="rc-email-chip">Got it</div>
        <h1 class="rc-email-h1">Thanks, ${firstName} &mdash; your message <span class="accent">is in our hands</span>.</h1>
      </td></tr>
      <tr><td class="rc-email-lead-cell">
        <p class="rc-email-lead">We&rsquo;ll come back to you <strong>the same day</strong>, usually within a couple of hours. No phone tree, no ticket number &mdash; just a real Maine neighbor on the other end.</p>
      </td></tr>
      <tr><td class="rc-email-list-cell">
        <div class="rc-email-list-label">What happens next</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="rc-email-list">
          <tr><td><span class="rc-email-list-num">1</span><strong>We read your request.</strong> One of us &mdash; not a bot &mdash; goes through what you sent.</td></tr>
          <tr><td><span class="rc-email-list-num">2</span><strong>We reach back out.</strong> A quick text or call, whichever you prefer, to fill in the details.</td></tr>
          <tr><td><span class="rc-email-list-num">3</span><strong>You get a flat-rate quote.</strong> No surprise add-ons. If we can&rsquo;t help, we&rsquo;ll tell you who can.</td></tr>
        </table>
      </td></tr>
      <tr><td class="rc-email-cta-cell">
        <div class="rc-email-cta-lead"><strong>Need us sooner?</strong> Give us a ring or shoot a text &mdash; we pick up.</div>
        <div class="rc-email-cta-note">Central Maine &mdash; Portland, Augusta, Farmington, Windham &amp; beyond.</div>
        <a href="tel:+12075989215" class="rc-email-btn rc-email-btn--call">Call (207) 598-9215</a>
        <a href="sms:+12075989215" class="rc-email-btn rc-email-btn--text">Text us</a>
        <br>
        <a href="https://www.facebook.com/housekeeping207/" class="rc-email-btn rc-email-btn--fb">Follow on Facebook</a>
      </td></tr>
      <tr><td class="rc-email-ft">
        <div class="rc-email-tagline">Your place &mdash; handled.</div>
        <p class="rc-email-meta">
          207 HouseKeeping &middot; Property Management<br>
          Central Maine &mdash; Portland &middot; Augusta &middot; Farmington &middot; Windham<br>
          <a href="https://207housekeeping.com">207housekeeping.com</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`;
}
