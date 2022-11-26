import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import typeDefs from '../../../gen/graphql/schema.graphql';
import resolvers from '../../graphql/resolvers';
import ApolloServerPluginLandingPageGraphiQL from '../../graphql/server/ApolloServerPluginLandingPageGraphiQL';
const isProduction = process.env.NODE_ENV === 'production';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: isProduction
    ? [ApolloServerPluginLandingPageDisabled()]
    : [ApolloServerPluginLandingPageGraphiQL()],
});

export default startServerAndCreateNextHandler(server);
