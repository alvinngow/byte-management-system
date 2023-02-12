import { gql } from '@apollo/client';

import { Course } from '../../../../gen/graphql/resolvers';

export interface Data {
  course: Course;
}

export interface Variables {
  id: string;
  first?: number;
  after?: string;
}

export const Query = gql`
  query CourseSessionsQuery($id: ID!, $first: Int = 10, $after: String) {
    course(id: $id) {
      id
      sessions(first: $first, after: $after) {
        edges {
          node {
            id
            name
            description
            startDate
            endDate
            startTime
            endTime
          }
          cursor
        }
      }
    }
  }
`;
