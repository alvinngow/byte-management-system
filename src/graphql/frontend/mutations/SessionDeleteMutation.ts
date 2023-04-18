import { gql } from '@apollo/client';
import { SessionDeleteInput, SessionDeletePayload } from '@bims/graphql/schema';

export interface Data {
  sessionDelete: SessionDeletePayload;
}

export interface Variables {
  input: SessionDeleteInput;
}

export const Mutation = gql`
  mutation SessionDeleteMutation($input: SessionDeleteInput!) {
    sessionDelete(input: $input) {
      clientMutationId
      ok
    }
  }
`;
