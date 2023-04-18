import { gql } from '@apollo/client';
import { SessionDeleteInput, SessionDeletePayload } from '@bims/graphql/schema';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../../src/db';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';

interface Data {
  sessionDelete: SessionDeletePayload;
}

interface Variables {
  input: SessionDeleteInput;
}

const testServer = setupApolloServer();

describe('sessionDelete', () => {
  let COURSE_ID_SEEDED = uuidv4();
  let SESSION_ID_SEEDED = uuidv4();

  beforeAll(async () => {
    await prisma.course.create({
      data: {
        id: COURSE_ID_SEEDED,
        name: `Unit Test Course-${uuidv4()}`,
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
        sessions: {
          createMany: {
            data: [
              {
                id: SESSION_ID_SEEDED,
                name: '',
                description: '',
                startDate: DateTime.now().toJSDate(),
                endDate: DateTime.now().toJSDate(),
              },
            ],
          },
        },
      },
    });
  });

  test('works', async () => {
    const clientMutationId = uuidv4();

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation SessionDeleteMutation($input: SessionDeleteInput!) {
            sessionDelete(input: $input) {
              clientMutationId
              ok
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_SEEDED,
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

    expect(response.body.singleResult.data.sessionDelete).toEqual({
      clientMutationId,
      ok: true,
    });
  });
});
