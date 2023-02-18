import { MutationResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const sessionAttendResolver: MutationResolvers['sessionAttend'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const currentUserId = context.getCurrentUserId()!;

  const { clientMutationId, sessionId, indicatedAttendance } = args.input;

  const sessionAttendee = await prisma.sessionAttendee.upsert({
    where: {
      sessionId_userId: {
        sessionId,
        userId: currentUserId,
      },
    },
    update: {
      indicatedAttendance,
    },
    create: {
      sessionId,
      userId: currentUserId,
      indicatedAttendance,
    },
  });

  return {
    clientMutationId,
    sessionAttendee,
  };
};
