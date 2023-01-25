import { ApolloServer } from '@apollo/server';
import fs from 'fs';
import path from 'path';

const appSchemas = fs.readFileSync(
  path.join(__dirname, '../../gen/graphql/schema.graphql'),
  { encoding: 'utf-8' }
);

import appResolvers from '../../src/graphql/backend/resolvers';
import {
  scalarResolvers,
  scalarTypeDefs,
} from '../../src/graphql/backend/scalars';

export default function setupApolloServer() {
  const testServer = new ApolloServer({
    typeDefs: [...scalarTypeDefs, appSchemas],
    resolvers: {
      ...scalarResolvers,
      ...appResolvers,
    },
  });

  return testServer;
}
