import { gql } from '@apollo/client';

import { CurrentUser } from '../../../../gen/graphql/resolvers';

export interface Data {
  me: CurrentUser;
}

export const Query = gql`
  query MeSessionsOverviewQuery {
    me {
      id
      overview {
        type
        value
        change
      }
    }
  }
`;
