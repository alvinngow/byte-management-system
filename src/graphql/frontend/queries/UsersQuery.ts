import { gql } from '@apollo/client';

import { UserSortKey } from '../../../../gen/graphql/operations';
import {
  UserConnection,
  UserFiltering,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  users: UserConnection;
}

export interface Variables {
  after?: string;
  filter?: UserFiltering;
  sortKey?: UserSortKey;
}

export const Query = gql`
  query UsersQuery(
    $after: String
    $filter: UserFiltering
    $sortKey: UserSortKey
  ) {
    users(first: 10, after: $after, filter: $filter, sortKey: $sortKey) {
      edges {
        node {
          id
          email
          firstName
          lastName
          mobileNo
          school {
            id
            name
          }
          role
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
