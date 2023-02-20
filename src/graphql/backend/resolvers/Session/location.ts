import { GraphQLError } from 'graphql';

import { SessionResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const Session_locationResolver: SessionResolvers['location'] = async (
  root,
  args,
  context,
  info
) => {
  if (root.overrideLocationId != null) {
    return prisma.location.findFirst({
      where: {
        id: root.overrideLocationId,
      },
    });
  }

  const course = await prisma.course.findFirst({
    where: {
      id: root.courseId,
    },
    select: {
      defaultLocation: true,
    },
  });

  if (course == null) {
    throw new GraphQLError('Not Found', {
      extensions: {
        code: 'NOT_FOUND',
      },
    });
  }

  return course.defaultLocation;
};
