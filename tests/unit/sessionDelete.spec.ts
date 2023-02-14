import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  SessionDeleteInput,
  SessionDeletePayload,
} from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';
const SESSION_ID_SEEDED = '5141c5c9-ad0a-451a-bbba-409dc0724cf0';

interface Data {
  sessionDelete: SessionDeletePayload;
}

interface Variables {
  input: SessionDeleteInput;
}

const testServer = setupApolloServer();

describe('sessionDelete', () => {
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
