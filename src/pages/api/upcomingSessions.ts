import { DateTime } from 'luxon';
import { NextApiHandler } from 'next';

import { prisma } from '../../db';
import sendEmail from '../../email/sendEmail';
import { upcomingSession } from '../../email/templates/upcomingSession';
const { PRIVATE_API_TOKEN } = process.env;

if (PRIVATE_API_TOKEN == null) {
  throw new Error('Private API token not set');
}

const handler: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer /i, '');

  if (token !== PRIVATE_API_TOKEN) {
    res.status(403).end();
    return;
  }

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

  res.status(200).end();
};

export default handler;
