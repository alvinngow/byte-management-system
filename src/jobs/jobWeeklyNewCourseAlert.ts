import { DateTime } from 'luxon';

import { prisma } from '../db';
import sendEmail from '../email/sendEmail';
import { newCourseAlert } from '../email/templates/newCourseAlert';

export async function jobWeeklyNewCourseAlert() {
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
}
