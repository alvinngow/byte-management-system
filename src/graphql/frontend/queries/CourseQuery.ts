import { gql } from '@apollo/client';
import { Course } from '@bims/graphql/schema';

export interface Data {
  course: Course;
}

export interface Variables {
  id: string;
}

/**
 * FIXME: fetch defaultLocation and managers
 */

export const Query = gql`
  query CourseQuery($id: ID!) {
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
        description
        lat
        lng
        unit

        cluster {
          id
        }
      }
      courseManagers {
        edges {
          node {
            id
            user {
              id
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;
