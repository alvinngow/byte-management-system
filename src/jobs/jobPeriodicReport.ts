import { UserRole } from '@bims/graphql/schema';
import { DateTime } from 'luxon';

import { prisma } from '../db';
import sendEmail from '../email/sendEmail';
import {
  periodicReport,
  PeriodicReportStatistic,
} from '../email/templates/periodicReport';
export async function jobPeriodicReport() {
  const recipients = await prisma.user.findMany({
    select: {
      email: true,
    },
    where: {
      role: {
        in: [UserRole.CommitteeMember, UserRole.SystemAdministrator],
      },
    },
  });

  const dateOneMonthPrior = DateTime.now()
    .minus({
      month: 1,
    })
    .toJSDate();

  const statistics: PeriodicReportStatistic[] = [
    {
      name: 'Volunteers joined',
      data: await prisma.user.count({
        where: {
          createdAt: {
            gt: dateOneMonthPrior,
            lte: new Date(),
          },
          verified_at: {
            not: null,
          },
        },
      }),
    },
    {
      name: 'Sessions held',
      data: await prisma.session.count({
        where: {
          startDate: {
            gt: dateOneMonthPrior,
            lte: new Date(),
          },
        },
      }),
    },
  ];

  await sendEmail(
    periodicReport({
      from: process.env.EMAIL_FROM!,
      bcc: recipients.map((recipient) => recipient.email),
      statistics,
    })
  );
}
