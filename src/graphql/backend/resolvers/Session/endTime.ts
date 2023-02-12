import { GraphQLError } from 'graphql/index';
import { DateTime } from 'luxon';

import { SessionResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const Session_endTimeResolver: SessionResolvers['startTime'] = async (
  root,
  args,
  context,
  info
) => {
  if (root.overrideEndTime != null) {
    return DateTime.fromJSDate(root.overrideEndTime).toISOTime({
      includeOffset: true,
    });
  }

  const course = await prisma.course.findFirst({
    where: {
      id: root.courseId,
    },
    select: {
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

  return DateTime.fromJSDate(course.defaultEndTime).toISOTime({
    includeOffset: true,
  });
};
