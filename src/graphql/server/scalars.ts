import {
  DateTimeResolver,
  DateTimeTypeDefinition,
  EmailAddressResolver,
  EmailAddressTypeDefinition,
} from 'graphql-scalars';

export const scalarResolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
};

export const scalarTypeDefs = [
  DateTimeTypeDefinition,
  EmailAddressTypeDefinition,
];
