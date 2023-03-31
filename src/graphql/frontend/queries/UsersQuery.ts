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
  reverse?: boolean;
}

export const Query = gql`
  query UsersQuery(
    $after: String
    $filter: UserFiltering
    $sortKey: UserSortKey
    $reverse: Boolean
  ) {
    users(
      first: 10
      after: $after
      filter: $filter
      sortKey: $sortKey
      reverse: $reverse
    ) {
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
          verified_at
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
