import React from 'react';

const AppLayout: React.FC<React.PropsWithChildren> = function (props) {
  return <div>{props.children}</div>;
};

export default AppLayout;
