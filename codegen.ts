import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/schema/**/*.graphql',
  generates: {
    './graphql/generated/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './graphql/generated/schema-merged.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
