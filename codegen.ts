import type { CodegenConfig } from '@graphql-codegen/cli';
import type { NearOperationFileConfig } from '@graphql-codegen/near-operation-file-preset';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import type { TypeScriptResolversPluginConfig } from '@graphql-codegen/typescript-resolvers';
import {
  DocumentMode,
  ScalarsMap,
} from '@graphql-codegen/visitor-plugin-common';

const scalars: ScalarsMap = {
  Date: 'string',
  DateTime: 'string',
  EmailAddress: 'string',
  Time: 'string',
};

const config: CodegenConfig = {
  schema: ['./src/graphql/backend/schema/**/*.graphql'],
  generates: {
    './gen/graphql/schema.ts': {
      config: {
        scalars,
      } as TypeScriptPluginConfig,
      plugins: ['typescript'],
    },
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
          EmailVerification: '@prisma/client#EmailVerification',
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
        namespacedImportName: 'Schema',
      } as TypeScriptResolversPluginConfig,
      plugins: [
        'typescript-resolvers',
        { add: { content: "import { DeepPartial } from 'utility-types';" } },
        { add: { content: "import * as Schema from './schema';" } },
      ],
    },
    'src/': {
      documents: 'src/**/*.graphql',
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '../gen/graphql/schema.ts',
        importTypesNamespace: 'Schema',
      } as NearOperationFileConfig,
      config: {
        scalars,
      } as TypeScriptDocumentsPluginConfig,
      plugins: [
        'typescript-operations',
        'typed-document-node',
        { add: { content: '/* eslint-disable */' } },
      ],
    },
    './gen/graphql/schema.graphql': {
      plugins: ['schema-ast'],
    },
    './gen/graphql/apollo-helpers.ts': {
      plugins: ['typescript-apollo-client-helpers'],
    },
  },
};

export default config;
