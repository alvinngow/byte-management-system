import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const {
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = '587',
  SMTP_SECURE = 'false',
  SMTP_USER,
  SMTP_PASS,
} = process.env;

/**
 * Send email
 */
export default async function sendEmail(info: Mail.Options) {
  if (process.env.NODE_ENV === 'test') {
    console.log('Test env, not sending email', { info });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: SMTP_SECURE !== 'false',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return await transporter.sendMail(info);
}
