import { gql } from '@apollo/client';
import {
  Session,
  SessionAttendee,
  SessionAttendeeConnection,
  SessionAttendeeFiltering,
  SessionAttendeeSortKey,
  SessionConnection,
} from '@bims/graphql/schema';
export interface Data {
  session: Session;
}

export interface Variables {
  id: string;
  first?: number;
  after?: string;
  filter?: SessionAttendeeFiltering;
  sortKey?: SessionAttendeeSortKey;
  reverse?: boolean;
}

export const Query = gql`
  query SessionAttendeesQuery(
    $id: ID!
    $first: Int
    $after: String
    $filter: SessionAttendeeFiltering
    $sortKey: SessionAttendeeSortKey
    $reverse: Boolean
  ) {
    session(id: $id) {
      attendees(
        first: $first
        after: $after
        filter: $filter
        sortKey: $sortKey
        reverse: $reverse
      ) {
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
