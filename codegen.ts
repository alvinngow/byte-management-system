import type { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptResolversPluginConfig } from '@graphql-codegen/typescript-resolvers';

const config: CodegenConfig = {
  schema: './src/graphql/schema/**/*.graphql',
  generates: {
    './gen/graphql/resolvers.ts': {
      config: {
        useIndexSignature: true,
        contextType: 'Context',
        mappers: {
          CurrentUser: '@prisma/client#User',
          User: '@prisma/client#User',
        },
      } as TypeScriptResolversPluginConfig,
      plugins: [
        {
          add: {
            content: ["import type Context from '../../src/graphql/Context'"],
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
    },
    './gen/graphql/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
