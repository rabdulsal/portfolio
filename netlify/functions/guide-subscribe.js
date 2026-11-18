// AEO guide signup: takes the form submit from /aeo and sends the
// double opt-in confirmation email through Resend.
// The signup data rides inside a signed token in the confirm link
// (see utils/guideToken.js), so there is no database to run.
// Confirm link target: /api/guide-verify?token=...
const { sign } = require('./utils/guideToken');

const FROM = 'Rashad Salaam <guide@rashadsalaam.com>';
const REPLY_TO = 'rabdulsalaam@gmail.com';
const SITE = 'https://rashadsalaam.com';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'RESEND_API_KEY is not set in the Netlify environment' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const business = String(body.business || '').trim();
  const phone = String(body.phone || '').trim();
  const interest = String(body.interest || '').trim();

  if (name.length < 2 || !/.+@.+\..+/.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name and a valid email are required' })
    };
  }

  const token = sign({
    name,
    email,
    business,
    phone,
    interest,
    exp: Date.now() + 48 * 60 * 60 * 1000
  });
  const confirmUrl = `${SITE}/api/guide-verify?token=${encodeURIComponent(token)}`;
  const firstName = name.split(' ')[0];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        reply_to: REPLY_TO,
        subject: 'Confirm your email, get the guide',
        text: [
          `Hi ${firstName},`,
          '',
          'You asked for the free guide, "When Customers Ask AI," on rashadsalaam.com.',
          'Confirm your email address and I will send it straight over:',
          '',
          confirmUrl,
          '',
          'The link works for 48 hours. If you did not request the guide, ignore this email and nothing happens.',
          '',
          'Rashad Salaam',
          'Salaam Solutions LLC'
        ].join('\n')
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('Resend Error:', data);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'The confirmation email could not be sent', detail: data })
      };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Function Error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
