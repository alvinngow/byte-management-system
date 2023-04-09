import Mail from 'nodemailer/lib/mailer';

interface Options {
  from: string;
  bcc: string[];
  userName: string;
  userEmail: string;
}

export function newVerifiedUser(opts: Options): Mail.Options {
  const { from, bcc, userName, userEmail } = opts;

  return {
    from,
    bcc,
    subject: 'User awaiting approval',
    html: `
There is a new user waiting for your approval
<br>
Name of User: ${userName}
<br>
User email: ${userEmail}
<br>
`,
  };
}
