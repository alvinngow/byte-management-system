import { gql } from '@apollo/client';
import {
  SessionAttendeeConnection,
  SessionAttendeeFiltering,
  SessionAttendeeSortKey,
  User,
} from '@bims/graphql/schema';

export interface Data {
  user: User;
}

export interface Variables {
  first?: number;
  after?: number;
  sortKey?: SessionAttendeeSortKey;
  filter?: SessionAttendeeFiltering;
  reverse?: boolean;
  id: string;
}

export const Query = gql`
  query UserSessionAttendeesQuery(
    $first: Int = 50
    $after: String
    $sortKey: SessionAttendeeSortKey
    $filter: SessionAttendeeFiltering
    $reverse: Boolean
    $id: ID!
  ) {
    user(id: $id) {
      id
      sessionAttendees(
        first: $first
        after: $after
        sortKey: $sortKey
        filter: $filter
        reverse: $reverse
      ) {
        edges {
          node {
            id
            indicatedAttendance
            actualAttendance
            sessionId
            session {
              startDate
              endDate
              startTime
              endTime
              name

              location {
                id
                name
              }
              course {
                id
                name
                slug
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }
  }
`;
