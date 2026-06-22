// MMIRE Website Server
// Stack: Node.js + Express + Resend (no Supabase)
// Deploy: Railway · Environment variables in Railway dashboard

import express from 'express';
import { Resend } from 'resend';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT || 3000;

// Safe Resend initialization — don't crash if API key is missing
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'rick@mymateinrealestate.com.au';
const FROM_NOTIFY  = 'notifications@mymateinrealestate.com.au';
const FROM_CONFIRM = 'hello@mymateinrealestate.com.au';
const BASE_URL     = process.env.BASE_URL || 'https://mymateinrealestate.com.au';
const REFERRER_API_URL = process.env.REFERRER_API_URL || 'https://referrer.com.au/api/platform';
const REFERRER_API_KEY = process.env.REFERRER_API_KEY_MMIRE;

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// ── Email helpers ─────────────────────────────────────────────────────────────
async function notify(subject, html) {
  if (!resend) {
    console.warn('Resend not configured: Notification skipped ->', subject);
    return;
  }
  try {
    await resend.emails.send({ from: FROM_NOTIFY, to: NOTIFY_EMAIL, subject, html });
  } catch (err) {
    console.error('Resend notify error:', err.message);
  }
}

async function confirm(toEmail, subject, html) {
  if (!resend) {
    console.warn('Resend not configured: Confirmation skipped ->', toEmail);
    return;
  }
  try {
    await resend.emails.send({ from: FROM_CONFIRM, to: toEmail, subject, html });
  } catch (err) {
    console.error('Resend confirm error:', err.message);
  }
}

function row(label, value) {
  if (!value) return '';
  return `<tr>
    <td style="padding:6px 12px;font-size:13px;color:#6b7280;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:6px 12px;font-size:13px;color:#0E2A44;font-weight:600;">${value}</td>
  </tr>`;
}

function notifyTemplate(title, accent, rows, cta) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F4EEE2;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:540px;margin:2rem auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(14,42,68,0.1);">
  <div style="background:${accent};padding:1.25rem 1.75rem;">
    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;color:rgba(255,255,255,0.65);text-transform:uppercase;">mymateinrealestate.com.au</p>
    <h1 style="margin:0.4rem 0 0;font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.02em;">${title}</h1>
  </div>
  <div style="padding:1.5rem 1.75rem;">
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    ${cta ? `<div style="margin-top:1.25rem;padding:0.875rem 1.25rem;background:#F4EEE2;border-radius:10px;font-size:12px;color:#6b7280;line-height:1.5;">${cta}</div>` : ''}
  </div>
  <div style="padding:1rem 1.75rem;background:#0E2A44;text-align:center;">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);">mymateinrealestate.com.au · mmire.com.au</p>
  </div>
</div></body></html>`;
}

function confirmTemplate(firstName, bodyText, tyUrl) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F4EEE2;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:540px;margin:2rem auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(14,42,68,0.1);">
  <div style="background:#0E2A44;padding:1.25rem 1.75rem;">
    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;color:rgba(255,255,255,0.5);text-transform:uppercase;">mymateinrealestate.com.au</p>
    <h1 style="margin:0.4rem 0 0;font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.02em;">You're in${firstName ? ', ' + firstName : ''}.</h1>
  </div>
  <div style="padding:1.75rem;">
    <p style="font-size:15px;line-height:1.7;color:#141111;opacity:0.8;margin-bottom:1.5rem;">${bodyText}</p>
    <a href="${tyUrl}" style="display:inline-block;background:#E07856;color:#fff;padding:0.875rem 2rem;border-radius:100px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.01em;">
      View your next steps →
    </a>
  </div>
  <div style="padding:1rem 1.75rem;background:#0E2A44;text-align:center;">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);">mymateinrealestate.com.au · mmire.com.au</p>
  </div>
</div></body></html>`;
}

// ── Page routes ───────────────────────────────────────────────────────────────
app.get('/',          (req, res) => res.sendFile(join(__dirname, 'public', 'index.html')));
app.get('/mates',     (req, res) => res.sendFile(join(__dirname, 'public', 'mates.html')));
app.get('/referrers', (req, res) => res.sendFile(join(__dirname, 'public', 'referrers.html')));
app.get('/thankyou',  (req, res) => res.sendFile(join(__dirname, 'public', 'thankyou.html')));
app.get('/privacy',   (req, res) => res.sendFile(join(__dirname, 'public', 'privacy.html')));

// ── Find Your Mate ────────────────────────────────────────────────────────────
app.post('/api/find-mate', async (req, res) => {
  const { name, phone, email, suburb } = req.body;
  if (!name || !email || !suburb) return res.status(400).json({ error: 'Missing required fields' });

  // 1. Notify Rick
  await notify(
    `🏠 New owner request — ${suburb}`,
    notifyTemplate(
      'New Find Your Mate request', '#E07856',
      row('Name', name) + row('Suburb', suburb) + row('Email', email) + row('Phone', phone),
      `An owner in <strong>${suburb}</strong> is looking for their local Mate.`
    )
  );

  // 2. Push to Referrer.com.au
  if (REFERRER_API_KEY) {
    try {
      const response = await fetch(`${REFERRER_API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${REFERRER_API_KEY}`
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          service_type: 'agent', // MMIRE "Mates" are typically agents
          lga: suburb,
          source: 'mmire-find-a-mate'
        })
      });
      const data = await response.json();
      if (!response.ok) console.warn('[Referrer] Lead push failed:', data.error);
    } catch (err) {
      console.error('[Referrer] Lead push error:', err.message);
    }
  }

  res.json({ success: true });
});

// ── Mates registration ────────────────────────────────────────────────────────
app.post('/api/mates-register', async (req, res) => {
  const { first_name, last_name, email, phone, area } = req.body;
  if (!first_name || !last_name || !email || !phone) return res.status(400).json({ error: 'Missing required fields' });

  // Build personalised TY URL
  const tyParams = new URLSearchParams({
    type: 'mate', name: first_name, email, phone, area: area || ''
  });
  const tyUrl = `${BASE_URL}/thankyou?${tyParams.toString()}`;

  // Notify Rick
  await notify(
    `⭐ New Mate expression of interest — ${first_name} ${last_name}`,
    notifyTemplate(
      'New Mate expression of interest', '#0E2A44',
      row('Name', `${first_name} ${last_name}`) + row('Area', area) + row('Email', email) + row('Phone', phone),
      `Follow up within 2 business days. <a href="${tyUrl}">View their thank-you page</a>`
    )
  );

  // Confirm to registrant — links back to TY page only
  await confirm(
    email,
    `You're in, ${first_name} — My Mate in Real Estate`,
    confirmTemplate(
      first_name,
      `Thanks for your expression of interest. We'll review your details and be in touch within 2 business days to talk through your market, your approach, and whether there's a fit. In the meantime, your commission breakdown and next steps are ready for you.`,
      tyUrl
    )
  );

  res.json({ success: true });
});

// ── Referrers registration ────────────────────────────────────────────────────
app.post('/api/referrers-register', async (req, res) => {
  const { contact_name, company, email, phone } = req.body;
  if (!contact_name || !company || !email) return res.status(400).json({ error: 'Missing required fields' });

  const firstName = contact_name.split(' ')[0] || contact_name;

  // Build personalised TY URL
  const tyParams = new URLSearchParams({
    type: 'referrer', name: contact_name, company, email, phone: phone || ''
  });
  const tyUrl = `${BASE_URL}/thankyou?${tyParams.toString()}`;

  // Notify Rick — priority
  await notify(
    `🚀 Platform partner registration — ${company}`,
    notifyTemplate(
      'New platform partner registration', '#FF6200',
      row('Contact', contact_name) + row('Company', company) + row('Email', email) + row('Phone', phone),
      `<strong>Priority follow-up.</strong> Call within 2 business days. <a href="${tyUrl}">View their thank-you page</a>`
    )
  );

  // Confirm to registrant — links back to TY page only
  await confirm(
    email,
    `Registration received — My Mate in Real Estate · Referrer.com.au`,
    confirmTemplate(
      firstName,
      `Thanks for registering ${company}'s interest. We'll be in touch within 2 business days with a proposal tailored to your platform. Your preferred partner rates and next steps are ready for you now.`,
      tyUrl
    )
  );

  res.json({ success: true });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`MMIRE running on port ${PORT}`));
