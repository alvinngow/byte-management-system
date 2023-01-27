import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { CourseResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const Course_sessionsResolver: CourseResolvers['sessions'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { first, after } = args;

  const result = await findManyCursorConnection(
    (args) =>
      prisma.session.findMany({
        ...args,
        where: {
          courseId: root.id,
        },
      }),
    () =>
      prisma.session.count({
        where: {
          courseId: root.id,
        },
      }),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
