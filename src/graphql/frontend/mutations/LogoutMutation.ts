import { gql } from '@apollo/client';
import { MutationAccountLogoutArgs } from '@bims/graphql/schema';

export type Data = boolean;
export type Variables = MutationAccountLogoutArgs;

export const Mutation = gql`
  mutation LogoutMutation($input: LogoutInput!) {
    accountLogout(input: $input)
  }
`;
