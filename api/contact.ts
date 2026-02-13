import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API_URL = 'https://api.resend.com/emails';

interface ContactBody {
    name?: string;
    email?: string;
    message?: string;
    isKooperation?: boolean;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body as ContactBody;
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
        return res.status(400).json({
            error: 'Bitte füllen Sie Name, E-Mail und Nachricht aus.',
        });
    }

    const isKooperation = Boolean(body?.isKooperation);
    const subject = isKooperation
        ? `Kooperationsanfrage von ${name}`
        : `Kontaktanfrage von ${name}`;
    const toEmail = process.env.CONTACT_EMAIL || 'info@pilzhof-dahl-heide.de';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'website@pilzhof-dahl-heide.de';

    const html = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Kooperationsanfrage:</strong> ${isKooperation ? 'Ja' : 'Nein'}</p>
      <p><strong>Nachricht:</strong></p>
      <pre>${escapeHtml(message)}</pre>
    `;

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
        try {
            const response = await fetch(RESEND_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    from: fromEmail,
                    to: [toEmail],
                    subject: `[Pilzhof] ${subject}`,
                    html,
                    reply_to: email,
                }),
            });
            if (!response.ok) {
                const err = await response.text();
                console.error('Resend error:', response.status, err);
                return res.status(500).json({
                    error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
                });
            }
        } catch (err) {
            console.error('Contact API error:', err);
            return res.status(500).json({
                error: 'Ein Fehler ist aufgetreten. Bitte später erneut versuchen.',
            });
        }
    }
    // No API key: accept the form but don't send email (e.g. local dev)
    return res.status(200).json({ success: true });
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
