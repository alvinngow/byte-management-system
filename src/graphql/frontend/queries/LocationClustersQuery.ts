import { gql } from '@apollo/client';

import { LocationClusterConnection } from '../../../../gen/graphql/resolvers';

export interface Data {
  locationClusters: LocationClusterConnection;
}

export interface Variables {
  first?: number;
  after?: string;
}

export const Query = gql`
  query LocationClustersQuery($first: Int = 50, $after: String) {
    locationClusters(first: $first, after: $after) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
