import { gql } from '@apollo/client';
import {
  AccountRoleUpdateInput,
  AccountRoleUpdatePayload,
} from '@bims/graphql/schema';

export interface Data {
  accountRoleUpdate: AccountRoleUpdatePayload;
}

export interface Variables {
  input: AccountRoleUpdateInput;
}

export const Mutation = gql`
  mutation AccountRoleUpdateMutation($input: AccountRoleUpdateInput!) {
    accountRoleUpdate(input: $input) {
      clientMutationId
      user {
        id
        role
        email
        mobileNo
      }
    }
  }
`;
