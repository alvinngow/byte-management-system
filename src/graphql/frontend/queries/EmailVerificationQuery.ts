import { gql } from '@apollo/client';
import { EmailVerification } from '@bims/graphql/schema';

export interface Data {
  emailVerification: EmailVerification;
}

export interface Variables {
  id: string;
}
export const Query = gql`
  query EmailVerificationQuery($id: ID!) {
    emailVerification(id: $id) {
      id
      expiresAt
      used
      email
    }
  }
`;
