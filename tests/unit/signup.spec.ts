import { gql } from '@apollo/client';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { CurrentUser, SignupInput } from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const testServer = setupApolloServer();

describe('signup', () => {
  test('can signup with valid parameters', async () => {
    const clientMutationId = uuidv4();
    const email = `test-${DateTime.now().valueOf()}-account@example.com`;
    const password = 'abcdef';
    const firstName = 'John';
    const lastName = 'Smith';
    const mobileNo = '91234567';
    const school = 'Test School';

    const response = await testServer.executeOperation<
      {
        accountSignup: CurrentUser | null;
      },
      { input: SignupInput }
    >(
      {
        query: gql`
          mutation AccountSignupMutation($input: SignupInput!) {
            accountSignup(input: $input) {
              email
              firstName
              lastName
              mobileNo
              school {
                name
              }
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            email,
            password,
            firstName,
            lastName,
            mobileNo,
            school,
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
      accountSignup: {
        email,
        firstName,
        lastName,
        mobileNo,
        school: {
          name: school,
        },
      },
    });
  });

  test('cannot signup with missing parameters', async () => {
    const clientMutationId = uuidv4();
    const email = `test-${DateTime.now().valueOf()}-account@example.com`;

    const response = await testServer.executeOperation<
      {
        accountSignup: CurrentUser | null;
      },
      { input: SignupInput }
    >(
      {
        query: gql`
          mutation AccountSignupMutation($input: SignupInput!) {
            accountSignup(input: $input) {
              email
              firstName
              lastName
              mobileNo
              school {
                name
              }
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            email,
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
