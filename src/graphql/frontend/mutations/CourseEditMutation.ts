import { gql } from '@apollo/client';

import {
  CourseAddInput,
  CourseAddPayload,
  CourseEditInput,
  CourseEditPayload,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  courseEdit: CourseEditPayload;
}

export interface Variables {
  input: CourseEditInput;
}

export const Mutation = gql`
  mutation CourseEditMutation($input: CourseEditInput!) {
    courseEdit(input: $input) {
      clientMutationId
      course {
        id
        name
        description
        descriptionPrivate
        subtitle
        defaultLocation {
          id
          name
          description
          lat
          lng
        }
      }
    }
  }
`;
