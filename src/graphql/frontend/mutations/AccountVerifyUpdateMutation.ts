import { gql } from '@apollo/client';
import {
  AccountVerifyUpdateInput,
  AccountVerifyUpdatePayload,
} from '@bims/graphql/schema';

export interface Data {
  accountApprovalUpdate: AccountVerifyUpdatePayload;
}

export interface Variables {
  input: AccountVerifyUpdateInput;
}

export const Mutation = gql`
  mutation AccountVerifyUpdateMutation($input: AccountVerifyUpdateInput!) {
    accountVerifyUpdate(input: $input) {
      clientMutationId
      ok
    }
  }
`;
