import { UserRole, UserSortKey } from '@bims/graphql/schema';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';
import { Prisma } from '.prisma/client';
import UserWhereInput = Prisma.UserWhereInput;
import UserOrderByWithRelationInput = Prisma.UserOrderByWithRelationInput;
import { QueryResolvers } from '@bims/graphql/resolvers';

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

  const currentUserId = context.getCurrentUserId()!;
  const currentUserRole = await context.getCurrentUserRole();

  const { first, after, filter, sortKey, reverse } = args;

  let orderBy: UserOrderByWithRelationInput | undefined = undefined;

  switch (sortKey) {
    case UserSortKey.FirstName: {
      orderBy = { firstName: reverse ? 'desc' : 'asc' };
      break;
    }
    case UserSortKey.ContactNumber: {
      orderBy = {
        mobileNo: reverse ? 'desc' : 'asc',
      };
      break;
    }
    case UserSortKey.School: {
      orderBy = {
        school: { name: reverse ? 'desc' : 'asc' },
      };
      break;
    }
    case UserSortKey.UserType: {
      orderBy = {
        role: reverse ? 'desc' : 'asc',
      };
    }
  }

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
            {
              email: {
                contains: filter.searchTerm,
                mode: 'insensitive',
              },
            },
            {
              school: {
                name: {
                  contains: filter.searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          ]
        : undefined,
    AND:
      currentUserRole !== UserRole.SystemAdministrator
        ? [
            {
              OR: [
                {
                  role: UserRole.User,
                },
                {
                  role: UserRole.CommitteeMember,
                  id: currentUserId,
                },
              ],
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
        orderBy,
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
