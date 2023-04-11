import { ApolloServer } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { withIronSessionApiRoute } from 'iron-session/next';

import appSchemas from '../../../gen/graphql/schema.graphql';
import ApolloServerPluginErrorLogging from '../../graphql/backend/ApolloServerPluginErrorLogging';
import ApolloServerPluginLandingPageGraphiQL from '../../graphql/backend/ApolloServerPluginLandingPageGraphiQL';
import { Context } from '../../graphql/backend/Context';
import appResolvers from '../../graphql/backend/resolvers';
import { scalarResolvers, scalarTypeDefs } from '../../graphql/backend/scalars';
import { ironSessionOptions } from '../../session/iron-session';

const isProduction = process.env.NODE_ENV === 'production';

const server = new ApolloServer({
  typeDefs: [...scalarTypeDefs, appSchemas],
  resolvers: {
    ...scalarResolvers,
    ...appResolvers,
  },
  plugins: isProduction
    ? [
        ApolloServerPluginLandingPageDisabled(),
        ApolloServerPluginErrorLogging(),
      ]
    : [
        ApolloServerPluginLandingPageGraphiQL(),
        ApolloServerPluginErrorLogging(),
      ],
  introspection: !isProduction,
  formatError(formattedError, error) {
    const code = formattedError.extensions?.code;

    if (typeof code !== 'string') {
      return formattedError;
    }

    return {
      ...formattedError,
      message: code ?? '',
      extensions: {
        code,
      },
    };
  },
});

const apolloServerHandler = startServerAndCreateNextHandler(server, {
  async context(req, res) {
    return new Context(req, res);
  },
});

export default withIronSessionApiRoute(apolloServerHandler, ironSessionOptions);
