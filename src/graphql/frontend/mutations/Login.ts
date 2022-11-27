import { gql } from '@apollo/client';

import {
  CurrentUser,
  MutationLoginArgs,
} from '../../../../gen/graphql/operations';

export type Data = CurrentUser;
export type Variables = MutationLoginArgs;

export const Mutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
    }
  }
`;
