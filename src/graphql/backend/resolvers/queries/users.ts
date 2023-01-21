import { QueryResolvers, UserRole } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

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

  const { first, after } = args;

  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        lt:
          after != null
            ? Buffer.from(after, 'base64').toString('utf-8')
            : undefined,
      },
    },
    take: first + 1, // Take one more to determine if there's a next page
    orderBy: {
      createdAt: 'desc',
    },
  });

  const edges = users.slice(0, first).map((user) => {
    return {
      node: user,
      cursor: Buffer.from(user.createdAt.toISOString(), 'utf-8').toString(
        'base64'
      ),
    };
  });

  const hasPreviousPage = after != null;
  const hasNextPage = users.length > first;

  return {
    edges,
    pageInfo: {
      hasPreviousPage,
      hasNextPage,
      startCursor: edges[0]?.cursor,
      endCursor: edges[edges.length - 1]?.cursor,
    },
  };
};
