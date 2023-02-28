import { LocationResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const Location_clusterResolver: LocationResolvers['cluster'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  if (root.locationClusterId == null) {
    return null;
  }

  const locationCluster = await prisma.locationCluster.findFirst({
    where: {
      id: root.locationClusterId,
    },
  });

  return locationCluster;
};
