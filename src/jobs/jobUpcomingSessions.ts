import { DateTime } from 'luxon';

import { prisma } from '../db';
import sendEmail from '../email/sendEmail';
import { upcomingSession } from '../email/templates/upcomingSession';

export async function jobUpcomingSessions() {
  const notifyUsers = await prisma.user.findMany({
    where: {
      notifyUpcomingSessions: true,
    },
  });

  for (const user of notifyUsers) {
    const withinRange = await prisma.sessionAttendee.findMany({
      where: {
        userId: user.id,
        session: {
          startDate: {
            lte: DateTime.now()
              .plus({ day: user.upcomingSessionTimeBefore })
              .toJSDate(),
            gt: new Date(),
          },
        },
      },
      include: {
        session: {
          select: {
            name: true,
            startDate: true,
            endDate: true,
            course: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (withinRange.length > 0) {
      sendEmail(
        upcomingSession({
          firstName: user.firstName,
          to: user.email,
          from: process.env.EMAIL_FROM!,
          withinRange,
        })
      );
    }
  }
}
