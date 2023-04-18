import { MutationResolvers } from '@bims/graphql/resolvers';
import { UserRole } from '@bims/graphql/schema';

import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const sessionAttendReportResolver: MutationResolvers['sessionAttendReport'] =
  async (root, args, context, info) => {
    await requireCurrentUserRole(
      context,
      UserRole.CommitteeMember,
      UserRole.SystemAdministrator
    );

    const { clientMutationId, actualAttendance, sessionId, userId } =
      args.input;

    const sessionAttendee = await prisma.sessionAttendee.update({
      where: {
        sessionId_userId: {
          sessionId,
          userId,
        },
      },
      data: {
        actualAttendance,
      },
    });

    return {
      clientMutationId,
      sessionAttendee,
    };
  };
