import { gql } from '@apollo/client';

import { User } from '../../../../gen/graphql/resolvers';

export interface Data {
  user: User;
}

export interface Variables {
  id: string;
}

export const Query = gql`
  query UserSessionsOverviewQuery($id: ID!) {
    user(id: $id) {
      id
      overview {
        type
        value
        change
      }
    }
  }
`;
