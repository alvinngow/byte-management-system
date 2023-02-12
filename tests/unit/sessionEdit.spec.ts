import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  SessionAddInput,
  SessionAddPayload,
  SessionEditInput,
  SessionEditPayload,
} from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const testServer = setupApolloServer();

interface Data {
  sessionEdit: SessionEditPayload;
}

interface Variables {
  input: SessionEditInput;
}

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';
const SESSION_ID_SEEDED = 'ff6f6872-5f81-44ac-8978-848fdc6ed1ef';

describe('sessionEdit', () => {
  test('works', async () => {
    const clientMutationId = uuidv4();
    const startTime = '21:00:00.000Z';
    const endTime = '21:00:00.000Z';
    const date = '2023-02-11';
    const volunteerSlotCount = 999;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation SessionEditMutation($input: SessionEditInput!) {
            sessionEdit(input: $input) {
              clientMutationId
              session {
                id
                name
                description
                startDate
                endDate
                startTime
                endTime
                volunteerSlotCount
              }
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_SEEDED,
            startTime,
            endTime,
            date,
            volunteerSlotCount,
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

    expect(response.body.singleResult.data.sessionEdit.clientMutationId).toBe(
      clientMutationId
    );

    const createdSession = response.body.singleResult.data.sessionEdit.session;

    expect(createdSession?.startTime).toBe(startTime);
    expect(createdSession?.endTime).toBe(endTime);
    expect(createdSession?.startDate).toBe(date);
    expect(createdSession?.endDate).toBe(date);
    expect(createdSession?.volunteerSlotCount).toBe(volunteerSlotCount);
  });
});
