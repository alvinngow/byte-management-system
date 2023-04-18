import { gql } from '@apollo/client';
import { CourseDeleteInput, CourseDeletePayload } from '@bims/graphql/schema';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../../src/db';
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

describe('courseDelete', () => {
  let COURSE_ID_SEEDED = uuidv4();

  /**
   * Create a course to be deleted
   */
  beforeAll(async () => {
    await prisma.course.create({
      data: {
        id: COURSE_ID_SEEDED,
        name: 'Unit Test Course',
        description: 'Course created by unit test',
        descriptionPrivate: 'Hi there volunteer',
        subtitle: 'Amazing unit test course',
        defaultStartTime: DateTime.fromISO('19:00:00').toJSDate(),
        defaultEndTime: DateTime.fromISO('21:30:00').toJSDate(),
        defaultLocation: {
          connectOrCreate: {
            where: {
              name: 'ABC Building',
            },
            create: {
              name: 'ABC Building',
              description: '',
              address: '123 ABC Street',
              lat: 1,
              lng: 103,
              unit: '#01-01',
              locationClusterId: 'd8bf4880-75d8-4443-869a-d9d96c3a5149',
            },
          },
        },
      },
    });
  });

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
