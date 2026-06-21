import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Email not sent.');
        console.warn(`To: ${to}\nSubject: ${subject}\nBody: ${html}`);
        return { success: false, message: 'RESEND_API_KEY not configured' };
    }

    try {
        const data = await resend.emails.send({
            from: 'INFAB <no-reply@yourdomain.com>', // User needs to configure this domain in Resend
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
