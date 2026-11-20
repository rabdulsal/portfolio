// AEO live demo: a visitor types their company name on /aeo, this
// function asks Perplexity (search-grounded) about that company, and
// returns a teaser: the opening of the AI's real answer, cut off
// mid-thought, plus one observation drawn from the answer itself.
// The full answer rides inside a signed token (utils/guideToken.js,
// same as the guide flow, no database). On unlock (name + email),
// the full report goes out through Resend and Rashad gets the lead
// notification with the complete answer attached.
//
// Abuse controls for v1: honeypot field, per-IP in-memory rate limit,
// and a daily run cap. In-memory limits reset when the function
// instance recycles, so they are a speed bump, not a wall. Turnstile
// is the first upgrade if abuse shows up.
const { sign, verify } = require('./utils/guideToken');

const FROM = 'Rashad Salaam <guide@rashadsalaam.com>';
const REPLY_TO = 'rashad@getbossman.com';
const NOTIFY = 'rashad@getbossman.com';
const SITE = 'https://rashadsalaam.com';
const GUIDE_URL = `${SITE}/aeo-guide.pdf`;
const MODEL_LABEL = 'Perplexity Sonar';

const DAILY_CAP = 50;
const PER_IP_DAILY = 3;
const TEASER_CHARS = 280;

const ipHits = new Map();
let daily = { day: '', count: 0 };

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function clientIp(event) {
  const h = event.headers || {};
  return (
    h['x-nf-client-connection-ip'] ||
    (h['x-forwarded-for'] || '').split(',')[0].trim() ||
    'unknown'
  );
}

function rateLimited(ip) {
  const day = todayKey();
  if (daily.day !== day) daily = { day, count: 0 };
  if (daily.count >= DAILY_CAP) return 'cap';
  const rec = ipHits.get(ip);
  if (rec && rec.day === day && rec.count >= PER_IP_DAILY) return 'ip';
  return null;
}

function recordRun(ip) {
  const day = todayKey();
  if (daily.day !== day) daily = { day, count: 0 };
  daily.count += 1;
  const rec = ipHits.get(ip);
  if (rec && rec.day === day) rec.count += 1;
  else ipHits.set(ip, { day, count: 1 });
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function makeTeaser(answer) {
  const clean = answer.replace(/\s+/g, ' ').trim();
  if (clean.length <= TEASER_CHARS) return clean;
  const cut = clean.slice(0, TEASER_CHARS);
  const lastSpace = cut.lastIndexOf(' ');
  return cut.slice(0, lastSpace > 40 ? lastSpace : TEASER_CHARS);
}

function makeObservation(answer, city) {
  const lower = answer.toLowerCase();
  const words = wordCount(answer);
  if (
    /could not find|couldn't find|cannot find|no (reliable )?(information|details|record)|not familiar with|unable to find|no specific information/.test(lower)
  ) {
    return 'It could not find your business at all.';
  }
  if (words < 50) {
    return `The full answer runs ${words} words. That is all it had.`;
  }
  if (city && !lower.includes(city.toLowerCase())) {
    return 'It never mentioned your city.';
  }
  return `The full answer runs ${words} words. The rest covers what it thinks you do, and what it leaves out.`;
}

async function askPerplexity(apiKey, company, city) {
  const where = city ? ` in ${city}` : '';
  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI assistant answering a customer who asks about a local business. Describe the business plainly, the way you would in a search answer: what it does, where it is, what services it offers, and what it is known for. Use only what you can find. If you cannot find reliable information about this specific business, say so plainly instead of guessing.'
        },
        {
          role: 'user',
          content: `Tell me about ${company}${where}. What does this business do, where is it located, what services does it offer, and what is it known for?`
        }
      ]
    })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Perplexity call failed: ${JSON.stringify(data).slice(0, 300)}`);
  }
  const answer = String(
    (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || ''
  ).trim();
  if (!answer) throw new Error('Perplexity returned an empty answer');
  const citations = Array.isArray(data.citations) ? data.citations.filter((c) => typeof c === 'string') : [];
  return { answer, citations };
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

function json(statusCode, obj) {
  return { statusCode, body: JSON.stringify(obj) };
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

  const action = String(body.action || '');

  // ── Run: ask the AI, return the teaser ──────────────────────────
  if (action === 'run') {
    // Honeypot: real visitors never see or fill this field.
    if (String(body.website || '').trim()) {
      return json(400, { error: 'Invalid request' });
    }

    const company = String(body.company || '').trim().slice(0, 120);
    const city = String(body.city || '').trim().slice(0, 80);
    if (company.length < 2) {
      return json(400, { error: 'Enter your company name' });
    }

    const perplexityKey = process.env.PERPLEXITY_API_KEY;
    if (!perplexityKey) {
      return json(500, { error: 'PERPLEXITY_API_KEY is not set in the Netlify environment' });
    }

    const ip = clientIp(event);
    const limit = rateLimited(ip);
    if (limit === 'cap') {
      return json(429, { error: 'The demo reached its limit for today. Try again tomorrow, or grab the free guide below.' });
    }
    if (limit === 'ip') {
      return json(429, { error: 'You have run the demo a few times today. The full report is one email away below.' });
    }

    try {
      const { answer, citations } = await askPerplexity(perplexityKey, company, city);
      recordRun(ip);
      const token = sign({
        kind: 'aeo-demo',
        company,
        city,
        answer,
        citations,
        exp: Date.now() + 24 * 60 * 60 * 1000
      });
      return json(200, {
        teaser: makeTeaser(answer),
        observation: makeObservation(answer, city),
        token
      });
    } catch (err) {
      console.error('AEO demo run error:', err);
      return json(502, { error: 'The AI search hit a snag. Try again in a moment.' });
    }
  }

  // ── Unlock: verify the token, email the full report ─────────────
  if (action === 'unlock') {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return json(500, { error: 'RESEND_API_KEY is not set in the Netlify environment' });
    }

    const report = verify(String(body.token || ''));
    if (!report || report.kind !== 'aeo-demo') {
      return json(400, { error: 'That demo result has expired. Run the search again and unlock it fresh.' });
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    if (name.length < 2 || !/.+@.+\..+/.test(email)) {
      return json(400, { error: 'Name and a valid email are required' });
    }

    const firstName = name.split(' ')[0];
    const when = new Date(report.exp - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const words = wordCount(report.answer);
    const sources =
      report.citations && report.citations.length
        ? report.citations.map((c, i) => `${i + 1}. ${c}`).join('\n')
        : '(The answer cited no sources.)';

    try {
      // 1. The full report, to the visitor.
      await sendEmail(apiKey, {
        from: FROM,
        to: [email],
        reply_to: REPLY_TO,
        subject: `What the AI says about ${report.company}`,
        text: [
          `Hi ${firstName},`,
          '',
          `You asked what an AI says about ${report.company}. Here is the complete answer, word for word, from ${MODEL_LABEL} on ${when}:`,
          '',
          '-----',
          report.answer,
          '-----',
          '',
          'One AI, on one day. Answers vary from model to model and week to week. That is the point: this is the raw material your next customer reads before they ever reach your website.',
          '',
          `The readout: the answer runs ${words} words. Read it for what it never mentions. Services it skipped, a city it got wrong or left out, hours it invented or missed. Every gap in that answer is a customer who heard about someone else, or heard nothing at all.`,
          '',
          'Where it pulled from:',
          sources,
          '',
          'What the AI got wrong about you is the expensive part, and it is the part no tool can grade without your ground truth. That is what the advisory hour is for: bring this report, we go line by line, and you leave with the fix list in the order I would work it.',
          `Book the hour here: ${SITE}/book`,
          '',
          `The free guide that goes with this report is here: ${GUIDE_URL}`,
          '"When Customers Ask AI," two pages, the loop and the checklist.',
          '',
          'Reply to this email and tell me what jumped out at you. I read every reply myself.',
          '',
          'Rashad Salaam',
          'Salaam Solutions LLC'
        ].join('\n')
      });

      // 2. Lead notification to Rashad, with the full answer.
      await sendEmail(apiKey, {
        from: FROM,
        to: [NOTIFY],
        reply_to: email,
        subject: `New AEO demo lead: ${name} (${report.company})`,
        text: [
          'A visitor ran the AEO demo and unlocked the full report.',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || '(not given)'}`,
          `Company searched: ${report.company}`,
          `City: ${report.city || '(not given)'}`,
          '',
          `What ${MODEL_LABEL} said (${when}):`,
          '-----',
          report.answer,
          '-----',
          '',
          'Sources:',
          sources,
          '',
          'Reply to this email to follow up with them directly.'
        ].join('\n')
      });

      return json(200, { success: true });
    } catch (err) {
      console.error('AEO demo unlock error:', err);
      return json(502, { error: 'The report email could not be sent. Try again in a moment.' });
    }
  }

  return json(400, { error: 'Unknown action' });
};
