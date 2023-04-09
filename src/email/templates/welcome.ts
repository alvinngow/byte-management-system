import Mail from 'nodemailer/lib/mailer';

interface Options {
  from: string;
  to: string;
  firstName: string;
  verificationId: string;
}

export function welcome(opts: Options): Mail.Options {
  const { from, to, firstName, verificationId } = opts;

  return {
    from,
    to,
    subject: 'Welcome to the Byte Integrated Management System',
    html: `Hi ${firstName},
<br>
Welcome to the Byte Integrated Management System.
<br>
Click <a href="${process.env.ROOT_URL}/login?verificationCode=${verificationId}">here</a> to verify your email.
<br>
<br>
Team BYTE`,
  };
}
