import Image from 'next/image';
import React from 'react';

const PlainLayout: React.FC<React.PropsWithChildren> = function (props) {
  const { children } = props;

  return (
    <div className="block lg:grid lg:grid-cols-2">
      {' '}
      <div
        className="relative hidden overflow-hidden lg:block"
        style={{ backgroundColor: '#F1F4FB' }}
      >
        <h1 className="px-12 text-center text-5xl font-bold md:mt-32 xl:mt-24">
          Welcome to our community!
        </h1>
        <Image
          className="absolute -left-[10%] right-0 mx-auto lg:-top-[20%] lg:max-w-[800px] xl:-top-[60%] xl:max-w-screen-xl"
          src="/ellipse-2.png"
          width="1400"
          height="1000"
          alt="Translucent blue background"
        />
        <Image
          className="absolute left-0 right-0 bottom-0 mx-auto md:shrink-0"
          src="/welcome-community.png"
          alt="Welcome Community"
          width="798"
          height="674"
        />
      </div>
      {children}
    </div>
  );
};

export default PlainLayout;
