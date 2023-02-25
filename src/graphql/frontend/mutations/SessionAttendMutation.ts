import { gql } from '@apollo/client';

import {
  SessionAttendInput,
  SessionAttendPayload,
} from '../../../../gen/graphql/resolvers';

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
