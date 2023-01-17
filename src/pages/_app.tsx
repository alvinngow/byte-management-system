import '../styles/globals.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app';

import { cacheConfig } from '../graphql/frontend/cacheConfig';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(cacheConfig),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
