// Vercel serverless function: api/send.js
// Receives JSON POST from the form and sends an email via SendGrid.
// Required environment variables when deployed:
// - SENDGRID_API_KEY : SendGrid API key with Mail Send permission
// - TO_EMAIL : recipient email (e.g., katkaty1756@gmail.com)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const TO_EMAIL = process.env.TO_EMAIL || 'katkaty1756@gmail.com';

  if (!SENDGRID_API_KEY) {
    res.status(500).json({ error: 'SENDGRID_API_KEY not configured' });
    return;
  }

  try {
    const data = req.body || {};

    // Build an HTML representation of the form for the email body
    const rows = Object.keys(data).map(key => {
      const value = Array.isArray(data[key]) ? data[key].join(', ') : String(data[key] ?? '');
      return `<tr><td style="padding:6px 10px;border:1px solid #eee;font-weight:600;">${escapeHtml(key)}</td><td style="padding:6px 10px;border:1px solid #eee;">${escapeHtml(value)}</td></tr>`;
    }).join('');

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0b2540">
        <h2 style="color:#0b2540">New Fan Club Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:700px">${rows}</table>
        <p style="color:#6b7280;font-size:13px">This message was sent from your Sandra Bullock Fan Club site.</p>
      </div>
    `;

    const subject = `Sandra Hub submission — ${escapeHtml((data.firstName || '') + ' ' + (data.lastName || '')).trim()}` || 'Sandra Hub submission';

    const payload = {
      personalizations: [
        {
          to: [{ email: TO_EMAIL }],
          subject: subject
        }
      ],
      from: { email: 'no-reply@sandrafanhub.local', name: 'Sandra Fan Club' },
      content: [
        { type: 'text/html', value: html }
      ]
    };

    const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (resp.status >= 200 && resp.status < 300) {
      res.status(200).json({ ok: true });
    } else {
      const text = await resp.text().catch(()=>"");
      console.error('SendGrid error', resp.status, text);
      res.status(502).json({ error: 'Failed to send email', details: text });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
