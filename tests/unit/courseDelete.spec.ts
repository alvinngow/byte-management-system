import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  CourseDeleteInput,
  CourseDeletePayload,
} from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const testServer = setupApolloServer();

interface Data {
  courseDelete: CourseDeletePayload;
}

interface Variables {
  input: CourseDeleteInput;
}

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';
const USER_ID_VOLUNTEER = 'f1444b1d-4360-42d4-bc1b-c23cd5051fa4';

const COURSE_ID_SEEDED = '97fee544-baf2-4ffb-95c8-e3cf5e59b944';

describe('courseDelete', () => {
  test('Volunteer cannot delete course', async () => {
    const clientMutationId = uuidv4();

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation CourseDeleteMutation($input: CourseDeleteInput!) {
            courseDelete(input: $input) {
              clientMutationId
              ok
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            courseId: COURSE_ID_SEEDED,
          },
        },
      },
      {
        contextValue: buildMockContext(USER_ID_VOLUNTEER),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).not.toBeUndefined();
  });

  test('Guest cannot delete course', async () => {
    const clientMutationId = uuidv4();

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation CourseDeleteMutation($input: CourseDeleteInput!) {
            courseDelete(input: $input) {
              clientMutationId
              ok
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            courseId: COURSE_ID_SEEDED,
          },
        },
      },
      {
        contextValue: buildMockContext(),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).not.toBeUndefined();
  });

  test('CM can delete existing course', async () => {
    const clientMutationId = uuidv4();

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation CourseDeleteMutation($input: CourseDeleteInput!) {
            courseDelete(input: $input) {
              clientMutationId
              ok
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            courseId: COURSE_ID_SEEDED,
          },
        },
      },
      {
        contextValue: buildMockContext(USER_ID_COMMITTEE_MEMBER),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).not.toBeNull();

    if (response.body.singleResult.data == null) {
      throw new Error();
    }

    expect(response.body.singleResult.data.courseDelete.clientMutationId).toBe(
      clientMutationId
    );
    expect(response.body.singleResult.data.courseDelete.ok).toBe(true);
  });

  test('CM cannot delete non-existent course', async () => {
    const clientMutationId = uuidv4();

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation CourseDeleteMutation($input: CourseDeleteInput!) {
            courseDelete(input: $input) {
              clientMutationId
              ok
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            courseId: uuidv4(),
          },
        },
      },
      {
        contextValue: buildMockContext(USER_ID_COMMITTEE_MEMBER),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).not.toBeUndefined();
  });
});