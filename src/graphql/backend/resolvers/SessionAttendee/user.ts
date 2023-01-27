import { GraphQLError } from 'graphql/index';

import { SessionAttendeeResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const SessionAttendee_userResolver: SessionAttendeeResolvers['user'] =
  async (root, args, context, info) => {
    await requireAuthenticated(context);

    /**
     * FIXME: use dataloader
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
