import {
  MutationResolvers,
  UserRole,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const accountRoleUpdateResolver: MutationResolvers['accountRoleUpdate'] =
  async (root, args, context, info) => {
    const { clientMutationId, userId, role } = args.input;

    await requireCurrentUserRole(context, UserRole.SystemAdministrator);

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });

    return {
      clientMutationId,
      user,
    };
  };
