import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  AccountTerminateInput,
  AccountTerminatePayload,
  CurrentUser,
  SignupInput,
} from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const USER_ID_SYSTEM_ADMIN = '364c0fb8-0925-4029-8b2c-65ed93e8ffd6';

const testServer = setupApolloServer();

interface Data {
  accountTerminate: AccountTerminatePayload;
}

interface Variables {
  input: AccountTerminateInput;
}

describe('accountTerminate', () => {
  let userId = '';

  /**
   * Create a user to be deleted
   */
  beforeAll(async () => {
    const clientMutationId = uuidv4();

    const response = await testServer.executeOperation<
      {
        accountSignup: CurrentUser | null;
      },
      {
        input: SignupInput;
      }
    >(
      {
        query: gql`
          mutation AccountSignupMutation($input: SignupInput!) {
            accountSignup(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            email: `test-${uuidv4()}-user@example.com`,
            mobileNo: '91234567',
            firstName: 'Test',
            lastName: 'User',
            school: 'Test School',
            password: 'abcdef',
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

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).not.toBeNull();

    if (response.body.singleResult.data?.accountSignup == null) {
      throw new Error();
    }

    userId = response.body.singleResult.data.accountSignup.id;
  });

  test('can terminate an existing user', async () => {
    const clientMutationId = uuidv4();

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation AccountTerminateMutation($input: AccountTerminateInput!) {
            accountTerminate(input: $input) {
              clientMutationId
              ok
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            userId,
          },
        },
      },
      {
        contextValue: buildMockContext(USER_ID_SYSTEM_ADMIN),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toEqual({
      accountTerminate: {
        clientMutationId,
        ok: true,
      },
    });
  });

  test('cannot terminate a non-existent user', async () => {
    const clientMutationId = uuidv4();

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation AccountTerminateMutation($input: AccountTerminateInput!) {
            accountTerminate(input: $input) {
              clientMutationId
              ok
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            userId,
          },
        },
      },
      {
        contextValue: buildMockContext(USER_ID_SYSTEM_ADMIN),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).not.toBeUndefined();
  });
});
