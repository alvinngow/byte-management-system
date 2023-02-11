import { gql } from '@apollo/client';

import { Course } from '../../../../gen/graphql/resolvers';

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
      subtitle
      description
      descriptionPrivate
      defaultStartTime
      defaultEndTime
      coverImage
    }
  }
`;
