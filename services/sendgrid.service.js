import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const senderEmail = process.env.SENDGRID_FROM_EMAIL;

/**
 * Send Sendgrid email
 *
 * @export
 * @param { { toEmail: string, subject: string, text: string }} email
 * @returns
 */
export async function sendEmail(email) {
  const { toEmail, subject, text } = email;
  const message = {
    to: toEmail,
    from: senderEmail,
    subject,
    text,
    // mailSettings: {
    //   sandbox_mode: {
    //     enable: true,
    //   },
    // },
  };
  return sgMail.send(message);
}
