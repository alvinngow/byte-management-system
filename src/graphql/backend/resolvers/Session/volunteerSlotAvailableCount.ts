import { SessionResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const Session_volunteerSlotAvailableCountResolver: SessionResolvers['volunteerSlotAvailableCount'] =
  async (root, args, context, info) => {
    if (root.volunteerSlotCount == null || root.volunteerSlotCount === 0) {
      return null;
    }

    const sessionAttendeeCount = await prisma.sessionAttendee.count({
      where: {
        sessionId: root.id,
      },
    });

    return root.volunteerSlotCount - sessionAttendeeCount;
  };
