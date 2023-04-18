import { MutationResolvers } from '@bims/graphql/resolvers';
import { UserRole } from '@bims/graphql/schema';
import { GraphQLError } from 'graphql/index';

import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const accountTerminateResolver: MutationResolvers['accountTerminate'] =
  async (root, args, context, info) => {
    await requireCurrentUserRole(context, UserRole.SystemAdministrator);

    const { clientMutationId, userId } = args.input;

    const targetUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (targetUser == null) {
      throw new GraphQLError('Not Found', {
        extensions: {
          code: 'NOT_FOUND',
        },
      });
    }

    /**
     * System administrator cannot demote another system administrator
     */
    if (targetUser.role === UserRole.SystemAdministrator) {
      throw new GraphQLError('Forbidden', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    try {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (e) {
      throw new GraphQLError('Internal Server Error', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }

    return {
      clientMutationId,
      ok: true,
    };
  };
