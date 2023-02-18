import type { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import type { TypeScriptResolversPluginConfig } from '@graphql-codegen/typescript-resolvers';
import type { ScalarsMap } from '@graphql-codegen/visitor-plugin-common';

import { scalarTypeDefs } from './src/graphql/backend/scalars';

const scalars: ScalarsMap = {
  Date: 'string',
  DateTime: 'string',
  EmailAddress: 'string',
  Time: 'string',
};

const config: CodegenConfig = {
  schema: [...scalarTypeDefs, './src/graphql/backend/schema/**/*.graphql'],
  generates: {
    './gen/graphql/resolvers.ts': {
      config: {
        useIndexSignature: true,
        contextType: '../../src/graphql/backend/Context#Context',
        mappers: {
          CurrentUser: '@prisma/client#User',
          User: '@prisma/client#User',
          School: '@prisma/client#School',
          Location: '@prisma/client#Location',
          LocationCluster: '@prisma/client#LocationCluster',
          Session: '@prisma/client#Session',
          Course: '@prisma/client#Course',
          SessionAttendee: '@prisma/client#SessionAttendee',
          CourseManager: '@prisma/client#CourseManager',
        },
        mapperTypeSuffix: 'Model',
        scalars,
        /**
         * Since Apollo GraphQL allows resolvers to return partial data,
         * we make the default mapper accept partial types.
         *
         * Normal TypeScript Partial is insufficient as Relay Connection types are nested
         * (only the Connection type would be Partial).
         *
         * Hence we use DeepPartial type (official docs: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers#allow-deep-partial-with-utility-types)
         *
         * See https://github.com/dotansimha/graphql-code-generator/discussions/4030 and https://github.com/dotansimha/graphql-code-generator/issues/1219#issuecomment-600217042
         */
        defaultMapper: 'DeepPartial<{T}>',
      } as TypeScriptResolversPluginConfig,
      plugins: [
        'typescript',
        'typescript-resolvers',
        { add: { content: "import { DeepPartial } from 'utility-types';" } },
      ],
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
