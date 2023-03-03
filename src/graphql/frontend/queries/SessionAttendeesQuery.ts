import { gql } from '@apollo/client';

import {
  Session,
  SessionAttendee,
  SessionAttendeeConnection,
  SessionConnection,
} from '../../../../gen/graphql/resolvers';
export interface Data {
  session: Session;
}

export interface Variables {
  id: string;
}

export const Query = gql`
  query SessionAttendeesQuery($id: ID!) {
    session(id: $id) {
      attendees {
        edges {
          node {
            user {
              id
              firstName
              lastName
              email
            }
            actualAttendance
          }
        }
      }
    }
  }
`;
