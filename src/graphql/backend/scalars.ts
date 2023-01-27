import {
  DateResolver,
  DateTimeResolver,
  DateTimeTypeDefinition,
  DateTypeDefinition,
  EmailAddressResolver,
  EmailAddressTypeDefinition,
  TimeResolver,
  TimeTypeDefinition,
} from 'graphql-scalars';

export const scalarResolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Time: TimeResolver,
};

export const scalarTypeDefs = [
  DateTypeDefinition,
  DateTimeTypeDefinition,
  EmailAddressTypeDefinition,
  TimeTypeDefinition,
];
