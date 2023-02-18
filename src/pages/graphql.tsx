import 'graphiql/graphiql.css';

import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const GraphiQLWrapper: React.FC = function () {
  const fetcher = React.useMemo(() => {
    return createGraphiQLFetcher({
      url: 'http://localhost:3000/api/graphql',
    });
  }, []);

  return <GraphiQL fetcher={fetcher} />;
};

const DynamicComponent = dynamic(async () => GraphiQLWrapper, {
  loading: () => <>Loading...</>,
  ssr: false,
});

const GraphQLDevelopmentPage: NextPage = function () {
  const router = useRouter();

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    router.push('/404');
  }, [router]);

  return (
    <div className="h-screen">
      <Head>
        <title>GraphiQL Playground | BIMS</title>
      </Head>
      <DynamicComponent />
    </div>
  );
};

export default GraphQLDevelopmentPage;
