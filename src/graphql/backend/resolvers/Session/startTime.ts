import { SessionResolvers } from '@bims/graphql/resolvers';
import { GraphQLError } from 'graphql/index';
import { DateTime } from 'luxon';

import { prisma } from '../../../../db';

export const Session_startTimeResolver: SessionResolvers['startTime'] = async (
  root,
  args,
  context,
  info
) => {
  if (root.overrideStartTime != null) {
    return DateTime.fromJSDate(root.overrideStartTime).toISOTime({
      includeOffset: true,
    });
  }

  const course = await prisma.course.findFirst({
    where: {
      id: root.courseId,
    },
    select: {
      defaultStartTime: true,
    },
  });

  if (course == null) {
    throw new GraphQLError('Not Found', {
      extensions: {
        code: 'NOT_FOUND',
      },
    });
  }

  return DateTime.fromJSDate(course.defaultStartTime).toISOTime({
    includeOffset: true,
  });
};
