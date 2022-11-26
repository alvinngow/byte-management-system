import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/schema/**/*.graphql',
  generates: {
    './src/graphql/generated/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './src/graphql/generated/schema-merged.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
