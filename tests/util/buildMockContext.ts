import httpMocks from 'node-mocks-http';

import { Context } from '../../src/graphql/backend/Context';

/**
 * Build a mock GraphQL context for testing
 *
 * The mock request and response objects here _should_ not require any modification.
 */
export function buildMockContext() {
  const req = httpMocks.createRequest({
    method: 'POST',
    url: '/api/graphql',

    /**
     * Mock iron-session session instance that doesn't do anything
     *
     * adapted from https://github.com/vvo/iron-session/issues/130#issuecomment-641359735
     */
    session: {
      set() {},
      get() {},
      unset() {},
      save() {},
      destroy() {},
    },
  });

  const res = httpMocks.createResponse();

  // @ts-ignore
  return new Context(req, res);
}
