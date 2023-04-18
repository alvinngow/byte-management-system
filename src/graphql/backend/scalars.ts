import {
  DateResolver,
  DateTimeResolver,
  EmailAddressResolver,
  TimeResolver,
} from 'graphql-scalars';

export const scalarResolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Time: TimeResolver,
};
