import { CourseResolvers } from '@bims/graphql/resolvers';

import { prisma } from '../../../../db';

export const Course_defaultLocationResolver: CourseResolvers['defaultLocation'] =
  async (root, args, context, info) => {
    if (root.defaultLocationId == null) {
      return null;
    }

    /**
     * FIXME: (duncan) use DataLoader
     */

    const defaultLocation = await prisma.location.findFirst({
      where: {
        id: root.defaultLocationId,
      },
    });

    return defaultLocation;
  };
