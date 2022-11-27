import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { withIronSessionApiRoute } from 'iron-session/next';

import appSchemas from '../../../gen/graphql/schema.graphql';
import { Context } from '../../graphql/Context';
import appResolvers from '../../graphql/resolvers';
import ApolloServerPluginLandingPageGraphiQL from '../../graphql/server/ApolloServerPluginLandingPageGraphiQL';
import { scalarResolvers, scalarTypeDefs } from '../../graphql/server/scalars';
import { ironSessionOptions } from '../../session/iron-session';

const isProduction = process.env.NODE_ENV === 'production';

const server = new ApolloServer({
  typeDefs: [...scalarTypeDefs, appSchemas],
  resolvers: {
    ...scalarResolvers,
    ...appResolvers,
  },
  plugins: isProduction
    ? [ApolloServerPluginLandingPageDisabled()]
    : [ApolloServerPluginLandingPageGraphiQL()],
  introspection: !isProduction,
});

const apolloServerHandler = startServerAndCreateNextHandler(server, {
  async context(req, res) {
    return new Context(req, res);
  },
});

export default withIronSessionApiRoute(apolloServerHandler, ironSessionOptions);
