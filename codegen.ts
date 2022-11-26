import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/schema/**/*.graphql',
  generates: {
    './gen/graphql/resolvers.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './gen/graphql/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
