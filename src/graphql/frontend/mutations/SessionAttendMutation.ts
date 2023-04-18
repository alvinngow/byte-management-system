import { gql } from '@apollo/client';
import { SessionAttendInput, SessionAttendPayload } from '@bims/graphql/schema';

export interface Data {
  sessionAttend: SessionAttendPayload;
}

export interface Variables {
  input: SessionAttendInput;
}

export const Mutation = gql`
  mutation SessionAttendMutation($input: SessionAttendInput!) {
    sessionAttend(input: $input) {
      clientMutationId
      sessionAttendee {
        id
        indicatedAttendance
        sessionId
        userId
      }
    }
  }
`;
