// Advisory-hour intake: backs the branded /intake page. A client who
// booked and paid lands on /intake with a signed 30-day token
// (utils/intakeToken.js) that ties the page to their booking.
//
// One function, three modes, POST JSON { token, mode, answers, website }:
//   load   — verify the token, return the client's name and any
//            answers they already saved (partial saves included).
//   save   — store a partial set of answers; the same link resumes later.
//   submit — store the final answers, mark the row submitted, and email
//            Rashad the full set at rashad@getbossman.com via Resend.
//
// Storage is Supabase over its REST API (PostgREST) with the service
// role key, so the table needs no public policies. Identity always
// comes from the verified token, never from the request body.
// Abuse controls: honeypot field (website), per-field length caps,
// and one row per booking (upsert on email + booking_ref).
const { verify } = require('./utils/intakeToken');

const FROM = 'Rashad Salaam <guide@rashadsalaam.com>';
const NOTIFY = 'rashad@getbossman.com';

const TEXT_CAP = 4000;
const SHORT_CAP = 500;

function json(statusCode, obj) {
  return { statusCode, body: JSON.stringify(obj) };
}

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Resend send failed: ${JSON.stringify(data)}`);
  return data;
}

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) return null;
  return { url, key };
}

async function sbFetch(cfg, pathAndQuery, options) {
  const opts = options || {};
  const res = await fetch(`${cfg.url}/rest/v1/${pathAndQuery}`, {
    method: opts.method || 'GET',
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      'Content-Type': 'application/json',
      ...(opts.headers || {})
    },
    body: opts.body
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    throw new Error(`Supabase request failed (${res.status}): ${text.slice(0, 300)}`);
  }
  return data;
}

async function findRow(cfg, email, bookingRef) {
  const query =
    'intake_submissions?select=email,name,booking_ref,q1_decision,q2_links,q3_outcome,q4_budget,q5_deciders,status,submitted_at' +
    `&email=eq.${encodeURIComponent(email)}` +
    `&booking_ref=eq.${encodeURIComponent(bookingRef)}` +
    '&limit=1';
  const rows = await sbFetch(cfg, query, { method: 'GET' });
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

async function upsertRow(cfg, row) {
  return sbFetch(cfg, 'intake_submissions?on_conflict=email,booking_ref', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(row)
  });
}

function cleanAnswers(body) {
  const a = body.answers || {};
  const cut = (v, cap) => String(v == null ? '' : v).trim().slice(0, cap);
  return {
    q1_decision: cut(a.q1, TEXT_CAP),
    q2_links: cut(a.q2, TEXT_CAP),
    q3_outcome: cut(a.q3, TEXT_CAP),
    q4_budget: cut(a.q4, SHORT_CAP),
    q5_deciders: cut(a.q5, SHORT_CAP)
  };
}

function savedShape(row) {
  if (!row) return null;
  return {
    q1: row.q1_decision || '',
    q2: row.q2_links || '',
    q3: row.q3_outcome || '',
    q4: row.q4_budget || '',
    q5: row.q5_deciders || '',
    status: row.status || 'started'
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid request body' });
  }

  // Honeypot: real clients never see or fill this field.
  if (String(body.website || '').trim()) {
    return json(400, { error: 'Invalid request' });
  }

  let payload;
  try {
    payload = verify(String(body.token || ''));
  } catch {
    return json(500, { error: 'RESEND_API_KEY is not set in the Netlify environment' });
  }
  if (!payload || payload.kind !== 'intake' || !payload.email) {
    return json(400, {
      error: 'That link has expired or does not check out. Reply to your booking email and I will send a fresh one.'
    });
  }

  const cfg = supabaseConfig();
  if (!cfg) {
    return json(500, { error: 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set in the Netlify environment' });
  }

  const email = String(payload.email);
  const name = String(payload.name || '');
  const bookingRef = String(payload.booking || '');
  const mode = String(body.mode || '');

  // ── Load: greeting name plus any saved answers ──────────────────
  if (mode === 'load') {
    try {
      const row = await findRow(cfg, email, bookingRef);
      return json(200, { ok: true, name, saved: savedShape(row) });
    } catch (err) {
      console.error('Intake load error:', err);
      return json(502, { error: 'Your saved answers could not be loaded. Try again in a moment.' });
    }
  }

  // ── Save: partial answers, resumable on the same link ───────────
  if (mode === 'save') {
    try {
      const existing = await findRow(cfg, email, bookingRef);
      const status = existing && existing.status === 'submitted' ? 'submitted' : 'started';
      await upsertRow(cfg, {
        email,
        name,
        booking_ref: bookingRef,
        ...cleanAnswers(body),
        status,
        updated_at: new Date().toISOString()
      });
      return json(200, { ok: true, saved: true });
    } catch (err) {
      console.error('Intake save error:', err);
      return json(502, { error: 'Your answers could not be saved. Try again in a moment.' });
    }
  }

  // ── Submit: final answers, stored, then Rashad is notified ──────
  if (mode === 'submit') {
    const answers = cleanAnswers(body);
    const anyAnswer = Object.values(answers).some((v) => v.length > 0);
    if (!anyAnswer) {
      return json(400, { error: 'Write at least one answer before sending. Short is fine.' });
    }

    const now = new Date().toISOString();
    try {
      await upsertRow(cfg, {
        email,
        name,
        booking_ref: bookingRef,
        ...answers,
        status: 'submitted',
        submitted_at: now,
        updated_at: now
      });
    } catch (err) {
      console.error('Intake submit store error:', err);
      return json(502, { error: 'Your answers could not be stored. Try again in a moment.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    try {
      await sendEmail(apiKey, {
        from: FROM,
        to: [NOTIFY],
        reply_to: email,
        subject: `Advisory intake: ${name || email}${bookingRef ? ` (${bookingRef})` : ''}`,
        text: [
          'A booked client sent their intake answers from /intake.',
          '',
          `Name: ${name || '(not in token)'}`,
          `Email: ${email}`,
          `Booking: ${bookingRef || '(not in token)'}`,
          '',
          '1. The decision you are facing, in your own words.',
          answers.q1_decision || '(blank)',
          '',
          '2. Any links or numbers that bear on it.',
          answers.q2_links || '(blank)',
          '',
          '3. What outcome would make this hour worth it?',
          answers.q3_outcome || '(blank)',
          '',
          '4. Your budget range for the fix, if we find it together.',
          answers.q4_budget || '(blank)',
          '',
          '5. Who else needs to say yes before work starts?',
          answers.q5_deciders || '(blank)',
          '',
          'The full record lives in the intake_submissions table in Supabase.',
          'Reply to this email to reach the client directly.'
        ].join('\n')
      });
    } catch (err) {
      console.error('Intake submit email error:', err);
      return json(502, {
        error: 'Your answers are stored, but the notification email failed. Send again in a moment.'
      });
    }

    return json(200, { ok: true, submitted: true });
  }

  return json(400, { error: 'Unknown mode' });
};
