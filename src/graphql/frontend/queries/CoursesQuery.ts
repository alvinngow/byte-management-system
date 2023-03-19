import { gql } from '@apollo/client';

import {
  CourseConnection,
  CourseFiltering,
  CourseSortKey,
  LocationClusterConnection,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  courses: CourseConnection;
  locationClusters: LocationClusterConnection;
}

export interface Variables {
  after?: string;
  sortKey?: CourseSortKey;
  reverse?: Boolean;
  filter?: CourseFiltering;
}

export const Query = gql`
  query CoursesQuery(
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
          sessions {
            totalCount
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

    locationClusters(first: 20) {
      edges {
        node {
          id
          name
        }
        cursor
      }
    }
  }
`;
