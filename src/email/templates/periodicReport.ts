import Mail from 'nodemailer/lib/mailer';

interface Options {
  from: string;
  bcc: string[];
}

export function periodicReport(opts: Options): Mail.Options {
  const { from, bcc } = opts;

  return {
    from,
    bcc,
    subject: 'BIMS Periodic Report',
    html: `Hi,
<br>
This is the periodic report for the BIMS.
<br>
<br>
You're receiving this because you are a committee member or system administrator.
<br>
<br>
Team BYTE`,
  };
}
