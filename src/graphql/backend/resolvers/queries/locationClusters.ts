import { QueryResolvers } from '@bims/graphql/resolvers';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const locationClustersResolver: QueryResolvers['locationClusters'] =
  async (root, args, context, info) => {
    await requireAuthenticated(context);

    const { first, after } = args;

    const result = await findManyCursorConnection(
      (args) => prisma.locationCluster.findMany(args),
      () => prisma.locationCluster.count(),
      { first, after },
      { resolveInfo: info }
    );

    return result;
  };
