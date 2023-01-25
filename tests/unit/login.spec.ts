import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import { CurrentUser, LoginInput } from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const testServer = setupApolloServer();

describe('login', () => {
  test('can login with valid credentials', async () => {
    const clientMutationId = uuidv4();
    const email = 'byte@bims.com';
    const password = 'bytelovesbims';

    const response = await testServer.executeOperation<
      {
        accountLogin: CurrentUser | null;
      },
      {
        input: LoginInput;
      }
    >(
      {
        query: gql`
          mutation AccountLoginMutation($input: LoginInput!) {
            accountLogin(input: $input) {
              id
              email
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            email,
            password,
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
    expect(response.body.singleResult.data).toEqual({
      accountLogin: {
        id: '364c0fb8-0925-4029-8b2c-65ed93e8ffd6',
        email,
      },
    });
  });

  test('cannot login with invalid credentials', async () => {
    const clientMutationId = uuidv4();
    const email = 'byte@bims.com';
    const password = 'totally-the-correct-password';

    const response = await testServer.executeOperation<
      {
        accountLogin: CurrentUser | null;
      },
      {
        input: LoginInput;
      }
    >(
      {
        query: gql`
          mutation AccountLoginMutation($input: LoginInput!) {
            accountLogin(input: $input) {
              id
              email
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            email,
            password,
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
    expect(response.body.singleResult.errors).not.toBeNull();
  });
});
