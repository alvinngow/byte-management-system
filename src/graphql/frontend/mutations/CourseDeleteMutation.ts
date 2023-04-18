import { gql } from '@apollo/client';
import { CourseDeleteInput, CourseDeletePayload } from '@bims/graphql/schema';

export interface Data {
  courseDelete: CourseDeletePayload;
}

export interface Variables {
  input: CourseDeleteInput;
}

export const Mutation = gql`
  mutation CourseDeleteMutation($input: CourseDeleteInput!) {
    courseDelete(input: $input) {
      clientMutationId
      ok
    }
  }
`;
