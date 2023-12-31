import { SessionResolvers } from '@bims/graphql/resolvers';
import { UserRole } from '@bims/graphql/schema';

import { prisma } from '../../../../db';

export const Session_volunteerSlotAvailableCountResolver: SessionResolvers['volunteerSlotAvailableCount'] =
  async (root, args, context, info) => {
    if (root.volunteerSlotCount == null || root.volunteerSlotCount === 0) {
      return null;
    }

    const sessionAttendeeCount = await prisma.sessionAttendee.count({
      where: {
        sessionId: root.id,
        AND: {
          user: {
            NOT: {
              role: {
                in: [UserRole.CommitteeMember, UserRole.SystemAdministrator],
              },
            },
          },
        },
      },
    });

    return root.volunteerSlotCount - sessionAttendeeCount;
  };
