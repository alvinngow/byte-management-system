import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import path from 'path';

import resolvers from '../../graphql/resolvers';

const typeDefs = readFileSync(
  path.join(process.cwd(), './graphql/generated/schema-merged.graphql'),
  'utf-8'
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
