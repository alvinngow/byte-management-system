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
                <style>
                  body {
                    height: 100%;
                    margin: 0;
                    width: 100%;
                    overflow: hidden;
                    background-color: rgb(33, 42, 59);
                    color: white;
                  }
            
                  #graphiql {
                    height: 100vh;
                  }
                </style>
                <link href="https://unpkg.com/graphiql/graphiql.min.css" rel="stylesheet" />
              </head>
              <body>
                <div id="graphiql">Loading...</div>
                <script
                  src="https://unpkg.com/react@17/umd/react.development.js"
                  integrity="sha512-Vf2xGDzpqUOEIKO+X2rgTLWPY+65++WPwCHkX2nFMu9IcstumPsf/uKKRd5prX3wOu8Q0GBylRpsDB26R6ExOg=="
                  crossorigin="anonymous"
                ></script>
                <script
                  src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
                  integrity="sha512-Wr9OKCTtq1anK0hq5bY3X/AvDI5EflDSAh0mE9gma+4hl+kXdTJPKZ3TwLMBcrgUeoY0s3dq9JjhCQc7vddtFg=="
                  crossorigin="anonymous"
                ></script>
                <script
                  src="https://unpkg.com/graphiql/graphiql.min.js"
                  type="application/javascript"
                ></script>
                <script>
                  ReactDOM.render(
                    React.createElement(GraphiQL, {
                      fetcher: GraphiQL.createFetcher({
                        url: 'http://localhost:3000/api/graphql',
                      }),
                      defaultEditorToolsVisibility: true,
                    }),
                    document.getElementById('graphiql'),
                  );
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
