import { gql } from '@apollo/client';

import {
  CurrentUser,
  SessionAttendeeConnection,
  SessionAttendeeFiltering,
  SessionAttendeeSortKey,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  me: CurrentUser;
}

export interface Variables {
  first?: number;
  after?: number;
  sortKey?: SessionAttendeeSortKey;
  filter?: SessionAttendeeFiltering;
  reverse?: boolean;
}

export const Query = gql`
  query MeSessionAttendeesQuery(
    $first: Int = 50
    $after: String
    $sortKey: SessionAttendeeSortKey
    $filter: SessionAttendeeFiltering
    $reverse: Boolean
  ) {
    me {
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
