import { gql } from '@apollo/client';
import {
  CourseConnection,
  CourseFiltering,
  CourseSortKey,
} from '@bims/graphql/schema';

export interface Data {
  courses: CourseConnection;
}

export interface Variables {
  after?: string;
  sortKey?: CourseSortKey;
  reverse?: Boolean;
  filter?: CourseFiltering;
}

export const Query = gql`
  query LandingCoursesQuery(
    $after: String
    $sortKey: CourseSortKey
    $reverse: Boolean
    $filter: CourseFiltering
  ) {
    courses(
      first: 10
      after: $after
      sortKey: $sortKey
      reverse: $reverse
      filter: $filter
    ) {
      edges {
        node {
          id
          name
          slug
          description
          coverImage
          firstSessionStartDate
          lastSessionEndDate
          defaultLocation {
            name
            cluster {
              name
            }
          }
          courseManagers {
            edges {
              node {
                id
                user {
                  firstName
                  lastName
                }
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
