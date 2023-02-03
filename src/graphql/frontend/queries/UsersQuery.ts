import { gql } from '@apollo/client';

import { UserConnection } from '../../../../gen/graphql/resolvers';

export interface Data {
  users: UserConnection;
}

export interface Variables {
  after?: string;
}

export const Query = gql`
  query UsersQuery($after: String) {
    users(first: 10, after: $after) {
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
