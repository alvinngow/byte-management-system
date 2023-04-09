import {
  MutationResolvers,
  UserRole,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const accountNotificationUpdateResolver: MutationResolvers['accountNotificationUpdate'] =
  async (root, args, context, info) => {
    const {
      clientMutationId,
      notifyNewCourse,
      notifyNearNewCourse,
      nearRegion,
    } = args.input;

    const currentUserId = await context.getCurrentUserId();

    const user = await prisma.user.update({
      where: {
        id: currentUserId ?? undefined,
      },
      data: {
        notifyNewCourse: notifyNewCourse ?? undefined,
        notifyNearNewCourse: notifyNearNewCourse ?? undefined,
        nearRegion,
      },
    });

    return {
      clientMutationId,
      user,
    };
  };
