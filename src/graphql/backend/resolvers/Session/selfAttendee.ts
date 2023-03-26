import { SessionResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const Session_selfAttendeeResolver: SessionResolvers['selfAttendee'] =
  async (root, args, context, info) => {
    await requireAuthenticated(context);

    const currentUserId = context.getCurrentUserId()!;

    const sessionAttendee = await prisma.sessionAttendee.findFirst({
      where: {
        sessionId: root.id,
        userId: currentUserId,
      },
    });

    return sessionAttendee;
  };
