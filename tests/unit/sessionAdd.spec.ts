import { gql } from '@apollo/client';
import { SessionAddInput, SessionAddPayload } from '@bims/graphql/schema';
import { v4 as uuidv4 } from 'uuid';

import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const testServer = setupApolloServer();

interface Data {
  sessionAdd: SessionAddPayload;
}

interface Variables {
  input: SessionAddInput;
}

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';
const COURSE_ID_SEEDED = '1bd97075-86e4-4137-b751-52b270e5caa9';

describe('sessionAdd', () => {
  test('works', async () => {
    const clientMutationId = uuidv4();
    const startTime = '21:00:00.000Z';
    const endTime = '21:00:00.000Z';
    const date = '2023-02-11';
    const volunteerSlotCount = 999;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation SessionAddMutation($input: SessionAddInput!) {
            sessionAdd(input: $input) {
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
            courseId: COURSE_ID_SEEDED,
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

    expect(response.body.singleResult.data.sessionAdd.clientMutationId).toBe(
      clientMutationId
    );

    const createdSession = response.body.singleResult.data.sessionAdd.session;

    expect(createdSession?.startTime).toBe(startTime);
    expect(createdSession?.endTime).toBe(endTime);
    expect(createdSession?.startDate).toBe(date);
    expect(createdSession?.endDate).toBe(date);
    expect(createdSession?.volunteerSlotCount).toBe(volunteerSlotCount);
  });
});
