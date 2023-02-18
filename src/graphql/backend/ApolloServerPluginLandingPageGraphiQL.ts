import { ApolloServerPlugin } from '@apollo/server';

/**
 * This is an Apollo Server plugin that renders a GraphiQL IDE Landing page
 */
const ApolloServerPluginLandingPageGraphiQL: () => ApolloServerPlugin = () => {
  return {
    async serverWillStart() {
      return {
        async renderLandingPage() {
          const html = `
            <!DOCTYPE html>
            <html>
              <head>
                <title>GraphiQL</title>
                <script>
                  window.location.href = '/graphql';
                </script>
              </body>
            </html>
          `;

          return { html };
        },
      };
    },
  };
};

export default ApolloServerPluginLandingPageGraphiQL;
