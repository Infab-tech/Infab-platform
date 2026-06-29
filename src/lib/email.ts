import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function sendEmail({ to, subject, html }: { to: string | string[], subject: string, html: string }) {
    if (process.env.NODE_ENV === 'development') {
        console.log('--- DEVELOPMENT MODE EMAIL LOG ---');
        console.log(`To: ${Array.isArray(to) ? to.join(', ') : to}\nSubject: ${subject}\nBody: ${html}`);
        console.log('----------------------------------');
    }

    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Email not sent.');
        return { success: false, message: 'RESEND_API_KEY not configured' };
    }

    try {
        const data = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'INFAB <no-reply@infab-tech.com>',
            to,
            subject,
            html,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
}
