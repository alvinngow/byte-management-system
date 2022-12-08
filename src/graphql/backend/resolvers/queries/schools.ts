import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import {
  QueryResolvers,
  SchoolEdge,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const schoolsResolver: QueryResolvers['schools'] = async (
  root,
  args,
  context,
  info
) => {
  const { first, after } = args;

  const schools = await prisma.school.findMany({
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

  const edges: SchoolEdge[] = schools.slice(0, first).map((school) => {
    return {
      node: school,
      cursor: Buffer.from(school.createdAt.toISOString(), 'utf-8').toString(
        'base64'
      ),
    };
  });

  const hasPreviousPage = after != null;
  const hasNextPage = schools.length > first;

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
