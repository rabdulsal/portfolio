// Signed token for the advisory-hour intake page (/intake).
// Mirrors utils/guideToken.js: a base64url JSON payload plus an
// HMAC-SHA256 signature, stateless, no database lookup to verify.
// The token ties one paid booking to one person: it carries their
// name, email, and a booking reference, and expires 30 days after
// it is minted. Secret is the Resend API key env var, same as the
// guide token: server-side only, and rotating the key invalidates
// outstanding links, which is acceptable (a fresh link is one
// script run away, see scripts/make-intake-link.js).
const crypto = require('crypto');

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function secret() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return key;
}

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verify(token) {
  if (!token || typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (!payload.exp || Date.now() > payload.exp) return null;
  return payload;
}

// Mint a token for one booked client. booking is a free-text
// reference (date and time of the session is enough).
function signIntake({ name, email, booking }) {
  return sign({
    kind: 'intake',
    name: String(name || ''),
    email: String(email || ''),
    booking: String(booking || ''),
    exp: Date.now() + THIRTY_DAYS_MS
  });
}

module.exports = { sign, verify, signIntake };
