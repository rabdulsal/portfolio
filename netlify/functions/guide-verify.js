// AEO guide confirmation: the visitor clicks the link in the confirm
// email. This function checks the signed token, emails the guide PDF
// through Resend, notifies Rashad of the new verified lead, and shows
// a confirmation page with a direct download link as a backup.
const { verify } = require('./utils/guideToken');

const FROM = 'Rashad Salaam <guide@rashadsalaam.com>';
const REPLY_TO = 'rashad@getbossman.com';
const NOTIFY = 'rashad@getbossman.com';
const SITE = 'https://rashadsalaam.com';
const GUIDE_URL = `${SITE}/aeo-guide.pdf`;

function page(title, inner) {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} | Rashad Salaam</title>
</head>
<body style="margin:0;background:#0a0f1e;color:#e8e6e1;font-family:Georgia,serif;">
<div style="max-width:560px;margin:0 auto;padding:64px 24px;">
${inner}
<p style="margin-top:40px;font-size:12px;color:#8a877f;">Salaam Solutions LLC · rashadsalaam.com</p>
</div>
</body>
</html>`
  };
}

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Resend send failed: ${JSON.stringify(data)}`);
  return data;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return page('Something went wrong', `<h1 style="font-size:28px;">Something went wrong on my side.</h1><p>The mail setup is missing a piece. Email me at rashad@getbossman.com and I will send the guide by hand.</p>`);
  }

  const token = (event.queryStringParameters || {}).token;
  const lead = verify(token);
  if (!lead) {
    return page(
      'Link expired',
      `<h1 style="font-size:28px;">That link has expired or does not check out.</h1><p>Confirmation links work for 48 hours. Sign up again at <a href="${SITE}/aeo" style="color:#e8912d;">rashadsalaam.com/aeo</a> and I will send a fresh one.</p>`
    );
  }

  const firstName = String(lead.name || '').split(' ')[0] || 'there';

  try {
    // 1. The guide, to the subscriber, PDF attached.
    await sendEmail(apiKey, {
      from: FROM,
      to: [lead.email],
      reply_to: REPLY_TO,
      subject: 'Your guide: When Customers Ask AI',
      text: [
        `Hi ${firstName},`,
        '',
        'Confirmed. Your guide is attached: "When Customers Ask AI," the 2-page guide to getting picked when customers ask AI who to hire.',
        '',
        'Page 1 covers the shift and the four-step loop. Page 2 is the checklist, weekly and monthly, in the order I work it.',
        '',
        `You can also download it here: ${GUIDE_URL}`,
        '',
        'Read it, then reply to this email and tell me what you run. I read every reply myself, and if the loop fits your business we can talk about running it for you.',
        '',
        'Rashad Salaam',
        'Salaam Solutions LLC'
      ].join('\n'),
      attachments: [{ filename: 'when-customers-ask-ai.pdf', path: GUIDE_URL }]
    });

    // 2. Lead notification to Rashad, with everything the form collected.
    await sendEmail(apiKey, {
      from: FROM,
      to: [NOTIFY],
      reply_to: lead.email,
      subject: `New verified guide lead: ${lead.name}`,
      text: [
        'A visitor confirmed their email and got the AEO guide.',
        '',
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Business: ${lead.business || '(not given)'}`,
        `Phone: ${lead.phone || '(not given)'}`,
        `What brought them here: ${lead.interest || '(not given)'}`,
        '',
        'Reply to this email to follow up with them directly.'
      ].join('\n')
    });
  } catch (err) {
    console.error('Verify send error:', err);
    return page(
      'Something went wrong',
      `<h1 style="font-size:28px;">You are confirmed, but the guide hit a snag.</h1><p>Download it directly here: <a href="${GUIDE_URL}" style="color:#e8912d;">${GUIDE_URL}</a></p>`
    );
  }

  return page(
    'You are confirmed',
    `<p style="font-family:monospace;font-size:12px;letter-spacing:2px;color:#e8912d;text-transform:uppercase;">Confirmed</p>
<h1 style="font-size:32px;line-height:1.2;">The guide is on its way, ${firstName}.</h1>
<p style="line-height:1.6;">I just emailed "When Customers Ask AI" to ${lead.email}, PDF attached. If it is not in your main inbox in a few minutes, check Promotions or Spam and drag it to your main inbox so the next one lands right.</p>
<p style="line-height:1.6;">Want it right now instead? <a href="${GUIDE_URL}" style="color:#e8912d;">Download the guide (PDF)</a>.</p>
<p style="line-height:1.6;">When you have read it, reply to that email and tell me what you run. I read every reply myself.</p>`
  );
};
