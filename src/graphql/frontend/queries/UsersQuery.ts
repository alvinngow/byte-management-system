import { gql } from '@apollo/client';
import { UserSortKey } from '@bims/graphql/schema';
import { UserConnection, UserFiltering } from '@bims/graphql/schema';

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
      first: 30
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
          approved_at
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
