import { SessionAttendeeResolvers } from '@bims/graphql/resolvers';
import { GraphQLError } from 'graphql';

import { prisma } from '../../../../db';

export const SessionAttendee_sessionResolver: SessionAttendeeResolvers['session'] =
  async (root, args, context, info) => {
    /**
     * FIXME: use dataloader
     */

    const session = await prisma.session.findFirst({
      where: {
        id: root.sessionId,
      },
    });

    if (session == null) {
      throw new GraphQLError('Internal Server Error', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }

    return session;
  };
