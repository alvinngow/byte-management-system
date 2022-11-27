import React from 'react';

const PlainLayout: React.FC<React.PropsWithChildren> = function (props) {
  const { children } = props;

  return <div>{children}</div>;
};

export default PlainLayout;
