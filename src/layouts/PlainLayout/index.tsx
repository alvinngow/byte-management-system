import React from 'react';

const PlainLayout: React.FC<React.PropsWithChildren> = function (props) {
  const { children } = props;

  return (
    <div
      className="block md:grid md:grid-cols-2"
      style={{ minHeight: '100vh' }}
    >
      {' '}
      <div
        className="none md:block"
        style={{ backgroundColor: '#F1F4FB' }}
      ></div>
      {children}
    </div>
  );
};

export default PlainLayout;
