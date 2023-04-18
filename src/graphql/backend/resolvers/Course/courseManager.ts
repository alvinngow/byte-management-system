import { CourseResolvers } from '@bims/graphql/resolvers';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { prisma } from '../../../../db';

export const Course_courseManagersResolver: CourseResolvers['courseManagers'] =
  async (root, args, context, info) => {
    /**
     * FIXME: (duncan) use DataLoader
     */

    const manager = await findManyCursorConnection(
      (args) =>
        prisma.courseManager.findMany({
          ...args,
          where: {
            courseId: root.id,
          },
        }),
      () =>
        prisma.courseManager.count({
          where: {
            courseId: root.id,
          },
        })
    );

    return manager;
  };
