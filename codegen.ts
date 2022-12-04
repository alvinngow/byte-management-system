import type { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import type { TypeScriptResolversPluginConfig } from '@graphql-codegen/typescript-resolvers';
import type { ScalarsMap } from '@graphql-codegen/visitor-plugin-common';

import { scalarTypeDefs } from './src/graphql/backend/scalars';

const scalars: ScalarsMap = {
  DateTime: 'string',
  EmailAddress: 'string',
};

const config: CodegenConfig = {
  schema: [...scalarTypeDefs, './src/graphql/backend/schema/**/*.graphql'],
  generates: {
    './gen/graphql/resolvers.ts': {
      config: {
        useIndexSignature: true,
        contextType: '../../src/graphql/Context#Context',
        mappers: {
          CurrentUser: '@prisma/client#User',
          User: '@prisma/client#User',
        },
        mapperTypeSuffix: 'Model',
        scalars,
      } as TypeScriptResolversPluginConfig,
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './gen/graphql/operations.ts': {
      config: {
        scalars,
      } as TypeScriptDocumentsPluginConfig,
      plugins: ['typescript', 'typescript-operations'],
    },
    './gen/graphql/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
