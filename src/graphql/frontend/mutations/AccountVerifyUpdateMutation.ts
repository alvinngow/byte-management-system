import { gql } from '@apollo/client';

import {
  AccountVerifyUpdateInput,
  AccountVerifyUpdatePayload,
} from '../../../../gen/graphql/operations';

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
