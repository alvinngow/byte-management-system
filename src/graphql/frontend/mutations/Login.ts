import { gql } from '@apollo/client';

import {
  CurrentUser,
  MutationAccountLoginArgs,
} from '../../../../gen/graphql/operations';

export type Data = CurrentUser;
export type Variables = MutationAccountLoginArgs;

export const Mutation = gql`
  mutation Login($input: LoginInput!) {
    accountLogin(input: $input) {
      id
    }
  }
`;
