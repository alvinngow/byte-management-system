import {
  MutationResolvers,
  UserRole,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const accountApprovalUpdateResolver: MutationResolvers['accountApprovalUpdate'] =
  async (root, args, context, info) => {
    const { clientMutationId, userId } = args.input;

    await requireCurrentUserRole(context, UserRole.SystemAdministrator);

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        approved_at: new Date(),
      },
    });

    return {
      clientMutationId,
      user,
    };
  };
