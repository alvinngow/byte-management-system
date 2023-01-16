import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import fs from 'fs';
import path from 'path';

import { CurrentUser } from '../../gen/graphql/resolvers';

const appSchemas = fs.readFileSync(
  path.join(__dirname, '../../gen/graphql/schema.graphql'),
  { encoding: 'utf-8' }
);

import appResolvers from '../../src/graphql/backend/resolvers';
import {
  scalarResolvers,
  scalarTypeDefs,
} from '../../src/graphql/backend/scalars';

test('example test', async () => {
  expect(1).toBe(1);

  const testServer = new ApolloServer({
    typeDefs: [...scalarTypeDefs, appSchemas],
    resolvers: {
      ...scalarResolvers,
      ...appResolvers,
    },
  });

  const response = await testServer.executeOperation<{
    me: CurrentUser | null;
  }>({
    query: gql`
      query MeQuery {
        me {
          id
        }
      }
    `,
  });

  expect(response.body.kind).toBe('single');
  if (response.body.kind !== 'single') {
    throw new Error();
  }
  expect(response.body.singleResult.data?.me).toBeNull();
});
