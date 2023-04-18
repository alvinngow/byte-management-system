import { gql } from '@apollo/client';
import {
  AccountTerminateInput,
  AccountTerminatePayload,
} from '@bims/graphql/schema';

export interface Data {
  accountTerminate: AccountTerminatePayload;
}

export interface Variables {
  input: AccountTerminateInput;
}

export const Mutation = gql`
  mutation AccountTerminateMutation($input: AccountTerminateInput!) {
    accountTerminate(input: $input) {
      clientMutationId
      ok
    }
  }
`;
