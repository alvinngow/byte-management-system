import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { QueryResolvers, UserRole } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';
import { Prisma } from '.prisma/client';
import UserWhereInput = Prisma.UserWhereInput;

export const usersResolver: QueryResolvers['users'] = async (
  root,
  args,
  context,
  info
) => {
  await requireCurrentUserRole(
    context,
    UserRole.CommitteeMember,
    UserRole.SystemAdministrator
  );

  const { first, after, filter } = args;

  const where: UserWhereInput = {
    OR:
      filter?.searchTerm != null
        ? [
            {
              firstName: {
                contains: filter.searchTerm,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: filter.searchTerm,
                mode: 'insensitive',
              },
            },
          ]
        : undefined,
    role:
      filter?.role != null
        ? {
            in: filter.role,
          }
        : undefined,
  };

  const result = await findManyCursorConnection(
    (args) =>
      prisma.user.findMany({
        ...args,
        where,
      }),
    () =>
      prisma.user.count({
        where,
      }),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
