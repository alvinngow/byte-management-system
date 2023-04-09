import Mail from 'nodemailer/lib/mailer';

interface Options {
  from: string;
  to: string;
  firstName: string;
}

export function approved(opts: Options): Mail.Options {
  const { from, to, firstName } = opts;

  return {
    from,
    to,
    subject: 'Account approval for Byte Integrated Management System',
    html: `Hi ${firstName},
<br>
Welcome to the Byte Integrated Management System.
<br>
Your account has been approved
<br>
<br>
Team BYTE`,
  };
}
