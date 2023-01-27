import httpMocks from 'node-mocks-http';

import { Context } from '../../src/graphql/backend/Context';

class MockContext extends Context {
  private readonly currentUserId: string | null;

  constructor(currentUserId?: string) {
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
    super(req, res);

    this.currentUserId = currentUserId ?? null;
  }

  getCurrentUserId(): string | null {
    return this.currentUserId;
  }
}

/**
 * Build a mock GraphQL context for testing
 *
 * The mock request and response objects here _should_ not require any modification.
 */
export function buildMockContext(currentUserId?: string) {
  return new MockContext(currentUserId);
}
