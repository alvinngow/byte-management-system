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
            locationClusterId: root.id,
          },
        }),
      () =>
        prisma.location.count({
          where: {
            locationClusterId: root.id,
          },
        }),
      { first, after },
      { resolveInfo: info }
    );

    return result;
  };
