import { GraphQLError } from 'graphql/index';

import { SessionResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const Session_courseResolver: SessionResolvers['course'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  /**
   * FIXME: should use dataloader
   */

  const course = await prisma.course.findFirst({
    where: {
      id: root.courseId,
    },
  });

  if (course == null) {
    throw new GraphQLError('Internal Server Error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  return course;
};
