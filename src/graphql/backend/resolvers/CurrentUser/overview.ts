import { DateTime, Duration } from 'luxon';

import {
  Attendance,
  CurrentUserOverview,
  CurrentUserOverviewType,
  CurrentUserResolvers,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

async function computeSessionsUpcoming(
  currentUserId: string
): Promise<CurrentUserOverview> {
  const value = await prisma.sessionAttendee.count({
    where: {
      userId: currentUserId,
      indicatedAttendance: Attendance.Attend,
      session: {
        startDate: {
          gte: DateTime.now().toJSDate(),
        },
      },
    },
  });

  return {
    type: CurrentUserOverviewType.SessionsUpcoming,
    value,
    change: null,
  };
}

async function computeSessionsAttended(
  currentUserId: string
): Promise<CurrentUserOverview> {
  const countLastWeek = await prisma.sessionAttendee.count({
    where: {
      userId: currentUserId,
      actualAttendance: Attendance.Attend,
      updatedAt: {
        gte: DateTime.now()
          .startOf('week')
          .minus(Duration.fromISO('P7D'))
          .toJSDate(),
        lte: DateTime.now().startOf('week').toJSDate(),
      },
    },
  });

  const countThisWeek = await prisma.sessionAttendee.count({
    where: {
      userId: currentUserId,
      actualAttendance: Attendance.Attend,
      updatedAt: {
        gte: DateTime.now().startOf('week').toJSDate(),
      },
    },
  });

  return {
    type: CurrentUserOverviewType.SessionsAttended,
    value: await prisma.sessionAttendee.count({
      where: {
        userId: currentUserId,
        actualAttendance: Attendance.Attend,
      },
    }),
    change: countThisWeek - countLastWeek,
  };
}

async function computeHoursAccumulated(
  currentUserId: string
): Promise<CurrentUserOverview> {
  let total = 0;
  let countLastWeek = 0;
  let countThisWeek = 0;

  const sessionAttendees = await prisma.sessionAttendee.findMany({
    where: {
      userId: currentUserId,
      actualAttendance: Attendance.Attend,
    },
    select: {
      updatedAt: true,
      session: {
        select: {
          overrideStartTime: true,
          overrideEndTime: true,
          startDate: true,
          endDate: true,

          course: {
            select: {
              defaultStartTime: true,
              defaultEndTime: true,
            },
          },
        },
      },
    },
  });

  for (const sessionAttendee of sessionAttendees) {
    const { overrideStartTime, overrideEndTime, startDate, endDate } =
      sessionAttendee.session;
    const { defaultStartTime, defaultEndTime } = sessionAttendee.session.course;

    let start = DateTime.fromJSDate(overrideStartTime ?? defaultStartTime);
    let end = DateTime.fromJSDate(overrideEndTime ?? defaultEndTime);

    let hoursCount = end.diff(start, 'hours').hours;

    if (
      endDate.valueOf() >=
      DateTime.now()
        .startOf('week')
        .minus(Duration.fromISO('P7D'))
        .toUnixInteger()
    ) {
      countThisWeek += hoursCount;
    } else if (
      endDate.valueOf() >= DateTime.now().startOf('week').toUnixInteger()
    ) {
      countLastWeek += hoursCount;
    }

    total += hoursCount;
  }

  return {
    type: CurrentUserOverviewType.HoursAccumulated,
    value: total,
    change: countThisWeek - countLastWeek,
  };
}

// FIXME: horribly inefficient queries

export const CurrentUser_overviewResolver: CurrentUserResolvers['overview'] =
  async (root, args, context, info) => {
    const results: CurrentUserOverview[] = [
      await computeSessionsUpcoming(root.id),
      await computeSessionsAttended(root.id),
      await computeHoursAccumulated(root.id),

      // TODO: Implement
      {
        type: CurrentUserOverviewType.SessionsCancelled,
        value: 0,
        change: null,
      },
    ];

    return results;
  };
