import { gql } from '@apollo/client';

import {
  SessionAddInput,
  SessionAddPayload,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  sessionAdd: SessionAddPayload;
}

export interface Variables {
  input: SessionAddInput;
}

export const Mutation = gql`
  mutation SessionAddMutation($input: SessionAddInput!) {
    sessionAdd(input: $input) {
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
