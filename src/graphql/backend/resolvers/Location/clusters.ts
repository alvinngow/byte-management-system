import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { LocationResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const Location_clustersResolver: LocationResolvers['clusters'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { first, after } = args;

  const result = await findManyCursorConnection(
    (args) =>
      prisma.locationCluster.findMany({
        ...args,
        where: {
          locationClusterLocations: {
            every: {
              locationId: root.id,
            },
            some: {}, // See https://github.com/prisma/prisma/issues/6456#issuecomment-1237870943
          },
        },
      }),
    () =>
      prisma.locationCluster.count({
        where: {
          locationClusterLocations: {
            every: {
              locationId: root.id,
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
