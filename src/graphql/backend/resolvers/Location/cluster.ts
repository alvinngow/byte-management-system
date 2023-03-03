import { LocationResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const Location_clusterResolver: LocationResolvers['cluster'] = async (
  root,
  args,
  context,
  info
) => {
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
