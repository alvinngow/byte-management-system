import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { LocationClusterResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const LocationCluster_locationsResolver: LocationClusterResolvers['locations'] =
  async (root, args, context, info) => {
    await requireAuthenticated(context);

    const { first, after } = args;

    const result = await findManyCursorConnection(
      (args) =>
        prisma.location.findMany({
          ...args,
          where: {
            locationClusterLocations: {
              every: {
                clusterId: root.id,
              },
              some: {}, // See https://github.com/prisma/prisma/issues/6456#issuecomment-1237870943
            },
          },
        }),
      () =>
        prisma.location.count({
          where: {
            locationClusterLocations: {
              every: {
                clusterId: root.id,
              },
              some: {}, // See https://github.com/prisma/prisma/issues/6456#issuecomment-1237870943
            },
          },
        }),
      { first, after },
      { resolveInfo: info }
    );

    return result;
  };
