import { gql } from '@apollo/client';

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
}

export const Query = gql`
  query UsersQuery($after: String, $filter: UserFiltering) {
    users(first: 10, after: $after, filter: $filter) {
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
