// Mint a personal /intake link for one booked advisory-hour client.
//
// Usage (from the repo root, with the same RESEND_API_KEY value that
// Netlify has, because that key is the token signing secret):
//
//   RESEND_API_KEY=... node scripts/make-intake-link.js "Jane Doe" jane@example.com "Tue Nov 25, 10:00 AM ET"
//
// Prints one signed link, good for 30 days:
//   https://rashadsalaam.com/intake?t=...
//
// Paste it into the short welcome email for that booking. The booking
// argument can be any short reference; date and time is enough.
const path = require('path');
const { signIntake } = require(path.join(__dirname, '..', 'netlify', 'functions', 'utils', 'intakeToken'));

const [name, email, booking] = process.argv.slice(2);

if (!name || !email || !/.+@.+\..+/.test(email)) {
  console.error('Usage: RESEND_API_KEY=... node scripts/make-intake-link.js "Full Name" email@example.com "Booking note"');
  process.exit(1);
}

try {
  const token = signIntake({ name, email, booking: booking || '' });
  console.log(`https://rashadsalaam.com/intake?t=${token}`);
} catch (err) {
  console.error(`${err.message}. Set RESEND_API_KEY to the same value as the Netlify environment.`);
  process.exit(1);
}
