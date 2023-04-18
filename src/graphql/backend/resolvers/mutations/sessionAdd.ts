import { MutationResolvers } from '@bims/graphql/resolvers';
import { GraphQLError } from 'graphql/index';
import { DateTime } from 'luxon';

import { prisma } from '../../../../db';

export const sessionAddResolver: MutationResolvers['sessionAdd'] = async (
  root,
  args,
  context,
  info
) => {
  const {
    clientMutationId,
    courseId,
    date,
    startTime,
    endTime,
    volunteerSlotCount,
  } = args.input;

  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
    },
    select: {
      defaultStartTime: true,
      defaultEndTime: true,
    },
  });

  if (course == null) {
    throw new GraphQLError('Not Found', {
      extensions: {
        code: 'NOT_FOUND',
      },
    });
  }

  const startTimeJSDate = DateTime.fromJSDate(
    startTime as unknown as Date
  ).toJSDate();

  const endTimeJSDate = DateTime.fromJSDate(
    endTime as unknown as Date
  ).toJSDate();

  const session = await prisma.session.create({
    data: {
      courseId,
      name: '',
      description: '',
      startDate: date,
      endDate: date,
      overrideStartTime:
        startTimeJSDate.valueOf() !== course.defaultStartTime.valueOf()
          ? startTimeJSDate
          : undefined,
      overrideEndTime:
        startTimeJSDate.valueOf() !== course.defaultEndTime.valueOf()
          ? endTimeJSDate
          : undefined,
      /**
       * Explicitly treat 0 count as `null`
       */
      volunteerSlotCount: volunteerSlotCount === 0 ? null : volunteerSlotCount,
    },
  });

  return {
    clientMutationId,
    session,
  };
};
