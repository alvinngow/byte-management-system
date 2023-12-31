import { gql } from '@apollo/client';
import { CurrentUser, MutationAccountLoginArgs } from '@bims/graphql/schema';

export type Data = CurrentUser;
export type Variables = MutationAccountLoginArgs;

export const Mutation = gql`
  mutation LoginMutation($input: LoginInput!) {
    accountLogin(input: $input) {
      id
      role
    }
  }
`;
