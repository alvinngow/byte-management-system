import { GraphQLError } from 'graphql';

import { CourseManagerResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const CourseManager_userResolver: CourseManagerResolvers['user'] =
  async (root, args, context, info) => {
    /**
     * FIXME: (duncan) use DataLoader
     */

    const user = await prisma.user.findFirst({
      where: {
        id: root.userId,
      },
    });

    if (user == null) {
      throw new GraphQLError('Internal Server Error', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }

    return user;
  };
