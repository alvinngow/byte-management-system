import { gql } from '@apollo/client';
import { SessionEditInput, SessionEditPayload } from '@bims/graphql/schema';

export interface Data {
  sessionEdit: SessionEditPayload;
}

export interface Variables {
  input: SessionEditInput;
}

export const Mutation = gql`
  mutation SessionEditMutation($input: SessionEditInput!) {
    sessionEdit(input: $input) {
      clientMutationId
      session {
        id
        name
        description
        startDate
        endDate
        startTime
        endTime
        volunteerSlotCount
      }
    }
  }
`;
