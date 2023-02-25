import Head from 'next/head';
import React from 'react';

interface Props {
  title: string;
}

const SEO: React.FC<Props> = function (props) {
  const { title } = props;

  return (
    <Head>
      <title>{title} | BIMS</title>
    </Head>
  );
};

export default SEO;
