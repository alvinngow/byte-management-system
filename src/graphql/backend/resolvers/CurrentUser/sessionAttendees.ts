import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { DateTime } from 'luxon';

import {
  CurrentUserResolvers,
  SessionAttendeeDateFiltering,
  SessionAttendeeSortKey,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import { Prisma } from '.prisma/client';

import SessionAttendeeWhereInput = Prisma.SessionAttendeeWhereInput;
import SessionAttendeeOrderByWithRelationInput = Prisma.SessionAttendeeOrderByWithRelationInput;
import Enumerable = Prisma.Enumerable;

export const CurrentUser_sessionAttendeesResolver: CurrentUserResolvers['sessionAttendees'] =
  async (root, args, context, info) => {
    const { first, after, filter, sortKey, reverse } = args;

    const currentUserId = context.getCurrentUserId()!;

    const where: SessionAttendeeWhereInput = {
      userId: currentUserId,
    };

    if (filter != null) {
      if (filter.searchText != null) {
        where.session = {
          OR: [
            {
              name: {
                contains: filter.searchText,
                mode: 'insensitive',
              },
            },
            {
              overrideLocation: {
                name: {
                  contains: filter.searchText,
                  mode: 'insensitive',
                },
              },
            },
            {
              course: {
                name: {
                  contains: filter.searchText,
                  mode: 'insensitive',
                },
              },
            },
            {
              course: {
                defaultLocation: {
                  name: {
                    contains: filter.searchText,
                    mode: 'insensitive',
                  },
                },
              },
            },
          ],
        };
      }

      if (filter.indicatedAttendance != null) {
        where.indicatedAttendance = filter.indicatedAttendance;
      }

      if (filter.actualAttendance != null) {
        where.actualAttendance = filter.actualAttendance;
      }

      switch (filter.date) {
        case SessionAttendeeDateFiltering.Upcoming: {
          where.session = {
            startDate: {
              gte: DateTime.now().toJSDate(),
            },
          };
          break;
        }
        case SessionAttendeeDateFiltering.Past: {
          where.session = {
            endDate: {
              lt: DateTime.now().toJSDate(),
            },
          };
          break;
        }
      }
    }

    let orderBy:
      | Enumerable<SessionAttendeeOrderByWithRelationInput>
      | undefined = undefined;

    switch (sortKey) {
      case SessionAttendeeSortKey.SessionStart: {
        orderBy = [
          {
            session: {
              startDate: reverse ? 'desc' : 'asc',
            },
          },
          {
            session: {
              overrideStartTime: reverse ? 'desc' : 'asc',
            },
          },
          {
            session: {
              course: {
                defaultStartTime: reverse ? 'desc' : 'asc',
              },
            },
          },
        ];
        break;
      }
      case SessionAttendeeSortKey.SessionEnd: {
        orderBy = [
          {
            session: {
              endDate: reverse ? 'desc' : 'asc',
            },
          },
          {
            session: {
              overrideEndTime: reverse ? 'desc' : 'asc',
            },
          },
          {
            session: {
              course: {
                defaultEndTime: reverse ? 'desc' : 'asc',
              },
            },
          },
        ];
        break;
      }
    }

    const result = await findManyCursorConnection(
      (args) => {
        return prisma.sessionAttendee.findMany({
          ...args,
          where,
          orderBy,
        });
      },
      () =>
        prisma.sessionAttendee.count({
          where,
          orderBy,
        }),
      { first, after },
      { resolveInfo: info }
    );

    return result;
  };
