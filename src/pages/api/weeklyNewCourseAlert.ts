import { DateTime } from 'luxon';
import { NextApiHandler } from 'next';

import { UserRole } from '../../../gen/graphql/resolvers';
import { prisma } from '../../db';
import sendEmail from '../../email/sendEmail';
import { newCourseAlert } from '../../email/templates/newCourseAlert';
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
      notifyNearNewCourse: true,
    },
  });

  const newCourses = await prisma.courseWithSessionInfo.findMany({
    where: {
      createdAt: {
        gt: DateTime.now().minus({ week: 1 }).toJSDate(),
        lte: new Date(),
      },
      AND: {
        firstSessionStartDate: {
          not: null,
        },
      },
    },
    include: {
      defaultLocation: {
        select: {
          address: true,
        },
      },
    },
  });

  notifyUsers.forEach((user) => {
    sendEmail(
      newCourseAlert({
        firstName: user.firstName,
        to: user.email,
        from: process.env.EMAIL_FROM!,
        newCourses,
      })
    );
  });

  res.status(200).end();
};

export default handler;
