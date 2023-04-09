import { gql } from '@apollo/client';

import {
  Course,
  SessionFiltering,
  SessionSortKey,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  course: Course;
}

export interface Variables {
  slug: string;
  first?: number;
  after?: string;
  filter?: SessionFiltering;
  sortKey?: SessionSortKey;
  reverse?: boolean;
}

export const Query = gql`
  query CourseSlugSessionsQuery(
    $slug: String!
    $first: Int = 10
    $after: String
    $filter: SessionFiltering
    $sortKey: SessionSortKey
    $reverse: Boolean
  ) {
    course: courseBySlug(slug: $slug) {
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
            selfAttendee {
              id
              indicatedAttendance
            }
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
