import { gql } from '@apollo/client';
import { Course, SessionFiltering, SessionSortKey } from '@bims/graphql/schema';

export interface Data {
  course: Course;
}

export interface Variables {
  id: string;
  first?: number;
  after?: string;
  filter?: SessionFiltering;
  sortKey?: SessionSortKey;
  reverse?: boolean;
}

export const Query = gql`
  query CourseSessionsQuery(
    $id: ID!
    $first: Int = 10
    $after: String
    $filter: SessionFiltering
    $sortKey: SessionSortKey
    $reverse: Boolean
  ) {
    course(id: $id) {
      id
      name
      slug
      subtitle
      description
      descriptionPrivate
      defaultStartTime
      defaultEndTime
      firstSessionStartDate
      lastSessionEndDate
      coverImage
      defaultLocation {
        id
        name
        address
        lat
        lng
      }

      courseManagers {
        edges {
          node {
            user {
              id
              firstName
              lastName
              email
            }
          }
        }
      }
      sessions(
        first: $first
        after: $after
        filter: $filter
        sortKey: $sortKey
        reverse: $reverse
      ) {
        edges {
          node {
            id
            name
            description
            startDate
            endDate
            startTime
            endTime
            volunteerSlotAvailableCount
            volunteerSlotCount
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
      }
    }
  }
`;
