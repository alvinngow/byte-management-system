import { gql } from '@apollo/client';
import { CurrentUser, MutationAccountSignupArgs } from '@bims/graphql/schema';

export type Data = CurrentUser;
export type Variables = MutationAccountSignupArgs;

export const Mutation = gql`
  mutation SignupMutation($input: SignupInput!) {
    accountSignup(input: $input) {
      id
    }
  }
`;
