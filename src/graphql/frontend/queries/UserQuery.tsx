import { gql } from '@apollo/client';
import { User } from '@bims/graphql/schema';

export interface Data {
  user: User;
}

export interface Variables {
  id: string;
}
export const Query = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      avatar
      mobileNo
      role
      school {
        name
      }
      verified_at
      approved_at
    }
  }
`;
