import { gql } from '@apollo/client';
import { CourseAddInput, CourseAddPayload } from '@bims/graphql/schema';

export interface Data {
  courseAdd: CourseAddPayload;
}

export interface Variables {
  input: CourseAddInput;
}

export const Mutation = gql`
  mutation CourseAddMutation($input: CourseAddInput!) {
    courseAdd(input: $input) {
      clientMutationId
      course {
        id
        name
      }
    }
  }
`;
