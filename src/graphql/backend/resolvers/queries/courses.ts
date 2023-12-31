import { CourseDateFiltering, CourseSortKey } from '@bims/graphql/schema';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { prisma } from '../../../../db';
import { Prisma } from '.prisma/client';
import CourseWhereInput = Prisma.CourseWhereInput;
import { DateTime } from 'luxon';
import CourseWithSessionInfoOrderByWithRelationInput = Prisma.CourseWithSessionInfoOrderByWithRelationInput;
import CourseWithSessionInfoWhereInput = Prisma.CourseWithSessionInfoWhereInput;
import { QueryResolvers } from '@bims/graphql/resolvers';

export const coursesResolver: QueryResolvers['courses'] = async (
  root,
  args,
  context,
  info
) => {
  const { first, after, filter, sortKey, reverse } = args;

  let orderBy: CourseWithSessionInfoOrderByWithRelationInput | undefined =
    undefined;

  switch (sortKey) {
    case CourseSortKey.StartDate: {
      orderBy = {
        firstSessionStartDate: reverse ? 'desc' : 'asc',
      };
      break;
    }
    case CourseSortKey.EndDate: {
      orderBy = {
        lastSessionEndDate: reverse ? 'desc' : 'asc',
      };
      break;
    }
    case CourseSortKey.Name: {
      orderBy = {
        name: reverse ? 'desc' : 'asc',
      };
      break;
    }
    case CourseSortKey.LocationName: {
      orderBy = {
        //@ts-ignore
        defaultLocation: {
          name: reverse ? 'desc' : 'asc',
        },
      };
      break;
    }
    case CourseSortKey.Region: {
      orderBy = {
        defaultLocation: {
          locationCluster: {
            name: reverse ? 'desc' : 'asc',
          },
        },
      };
    }
    case CourseSortKey.CreatedAt: {
      orderBy = {
        createdAt: reverse ? 'desc' : 'asc',
      };
    }
  }

  let where: CourseWithSessionInfoWhereInput | undefined = undefined;

  if (filter != null) {
    where = {};

    if (filter.searchTerm != null) {
      where.OR = [
        {
          name: {
            contains: filter.searchTerm,
            mode: 'insensitive',
          },
        },
        {
          defaultLocation: {
            name: {
              contains: filter.searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (filter.locationClusterID != null) {
      where.defaultLocation = {
        locationCluster: {
          id: filter.locationClusterID,
        },
      };
    }

    switch (filter.date) {
      case CourseDateFiltering.Upcoming: {
        where.lastSessionEndDate = {
          gte: DateTime.now().toJSDate(),
        };
        break;
      }
      case CourseDateFiltering.Past: {
        where.firstSessionStartDate = {
          lt: DateTime.now().toJSDate(),
        };
        break;
      }
    }
  }

  const result = await findManyCursorConnection(
    (args) =>
      prisma.courseWithSessionInfo.findMany({
        ...args,
        orderBy,
        where,
      }),
    () =>
      prisma.courseWithSessionInfo.count({
        where,
      }),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
