import { gql } from '@apollo/client';

import {
  AccountAvatarUpdateInput,
  CurrentUser,
} from '../../../../gen/graphql/resolvers';

export type Data = CurrentUser;

export interface Variables {
  input: AccountAvatarUpdateInput;
}

export const Mutation = gql`
  mutation AccountAvatarUpdateMutation($input: AccountAvatarUpdateInput!) {
    accountAvatarUpdate(input: $input) {
      id
      avatar
    }
  }
`;
