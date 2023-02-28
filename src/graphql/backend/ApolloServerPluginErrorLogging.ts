import { ApolloServerPlugin } from '@apollo/server';

const ApolloServerPluginErrorLogging: () => ApolloServerPlugin = () => {
  return {
    async requestDidStart() {
      return {
        async didEncounterErrors(requestContext) {
          console.log(
            '\x1b[41m===== GRAPHQL ERROR BEGIN (S) =====\x1b[0m\n',
            requestContext.errors,
            '\x1b[41m===== GRAPHQL ERROR ENDS  (S) =====\x1b[0m\n'
          );
        },
      };
    },
  };
};

export default ApolloServerPluginErrorLogging;
