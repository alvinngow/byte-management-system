import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import {
  QueryResolvers,
  UserRole,
  UserSortKey,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';
import { Prisma } from '.prisma/client';
import UserWhereInput = Prisma.UserWhereInput;
import UserOrderByWithRelationInput = Prisma.UserOrderByWithRelationInput;

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
