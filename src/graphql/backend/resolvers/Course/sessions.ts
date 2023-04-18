import { CourseResolvers } from '@bims/graphql/resolvers';
import { SessionDateFiltering, SessionSortKey } from '@bims/graphql/schema';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { DateTime } from 'luxon';

import { prisma } from '../../../../db';
import { Prisma } from '.prisma/client';
import SessionOrderByWithAggregationInput = Prisma.SessionOrderByWithAggregationInput;
import SessionWhereInput = Prisma.SessionWhereInput;

export const Course_sessionsResolver: CourseResolvers['sessions'] = async (
  root,
  args,
  context,
  info
) => {
  const { first, after, sortKey, filter, reverse } = args;

  let orderBy: SessionOrderByWithAggregationInput | undefined = undefined;

  switch (sortKey) {
    case SessionSortKey.Start: {
      orderBy = {
        startDate: reverse ? 'desc' : 'asc',
      };
      break;
    }
    case SessionSortKey.End: {
      orderBy = {
        endDate: reverse ? 'desc' : 'asc',
      };
      break;
    }
  }

  const where: SessionWhereInput = {
    courseId: root.id,
  };

  if (filter != null) {
    switch (filter.date) {
      case SessionDateFiltering.Upcoming: {
        where.OR = {
          endDate: {
            gte: DateTime.now().toJSDate(),
          },
        };
        break;
      }
      case SessionDateFiltering.Past: {
        where.OR = {
          endDate: {
            lt: DateTime.now().toJSDate(),
          },
        };
        break;
      }
    }
  }

  const result = await findManyCursorConnection(
    (args) =>
      prisma.session.findMany({
        ...args,
        where,
        orderBy,
      }),
    () =>
      prisma.session.count({
        where,
        orderBy,
      }),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
