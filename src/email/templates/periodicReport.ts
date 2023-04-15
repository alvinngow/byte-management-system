import Mail from 'nodemailer/lib/mailer';

export interface PeriodicReportStatistic {
  name: string;
  data: number;
}

interface Options {
  from: string;
  bcc: string[];
  statistics: PeriodicReportStatistic[];
}

export function periodicReport(opts: Options): Mail.Options {
  const { from, bcc, statistics } = opts;

  return {
    from,
    bcc,
    subject: 'BIMS Periodic Report',
    html: `Hi,
<br>
This is the periodic report for the BIMS.
<br>
<br>
<table>
<thead>
<tr>
<th>Name</th>
<th>Data</th>
</tr>
</thead>
<tbody>
${statistics.map(
  (statistic) => `
<tr>
<td>${statistic.name}</td>
<td>${statistic.data}</td>
</tr>
`
)}
</tbody>
</table>
<br>
You're receiving this because you are a committee member or system administrator.
<br>
<br>
Team BYTE`,
  };
}
