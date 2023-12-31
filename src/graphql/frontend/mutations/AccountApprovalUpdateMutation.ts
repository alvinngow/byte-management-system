import { gql } from '@apollo/client';
import {
  AccountApprovalUpdateInput,
  AccountApprovalUpdatePayload,
} from '@bims/graphql/schema';

export interface Data {
  accountApprovalUpdate: AccountApprovalUpdatePayload;
}

export interface Variables {
  input: AccountApprovalUpdateInput;
}

export const Mutation = gql`
  mutation AccountApprovalUpdateMutation($input: AccountApprovalUpdateInput!) {
    accountApprovalUpdate(input: $input) {
      clientMutationId
      user {
        id
        approved_at
      }
    }
  }
`;
