import { gql } from '@apollo/client';
import { CurrentUser } from '@bims/graphql/schema';

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
