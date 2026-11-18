// Test endpoint for the Resend pipeline on rashadsalaam.com.
// Sends ONE fixed test email to Rashad's Gmail so the full chain
// (Netlify env var -> function -> Resend -> verified domain -> inbox)
// can be proven end to end. Recipient is hardcoded on purpose:
// this is a pipeline test, not a mailer. Delete after the test,
// or fold it into the AEO lead-magnet endpoint when that is built.
//
// Trigger: POST https://rashadsalaam.com/api/test-email

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'RESEND_API_KEY is not set in the Netlify environment' })
    };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Rashad Salaam <guide@rashadsalaam.com>',
        to: ['rabdulsalaam@gmail.com'],
        reply_to: 'rabdulsalaam@gmail.com',
        subject: 'Resend test: the rashadsalaam.com pipeline works',
        text: [
          'This is a test email from the portfolio site.',
          '',
          'If you are reading this in Gmail, the whole chain works:',
          'Netlify function, RESEND_API_KEY, Resend, and the verified',
          'rashadsalaam.com sending domain (DKIM, SPF, DMARC).',
          '',
          'This endpoint can now be deleted, or grown into the AEO',
          'lead-magnet endpoint that emails the guide.'
        ].join('\n')
      })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error('Resend Error:', data);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Resend rejected the send', detail: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: data.id })
    };
  } catch (err) {
    console.error('Function Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
