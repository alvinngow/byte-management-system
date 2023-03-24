import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

interface Props extends React.PropsWithChildren {
  className?: string;
  src?: string;
  header?: string;
  body?: string;
}

const NoResults: React.FC<Props> = function (props) {
  const {
    src = '/no-results.png',
    header = 'No search results found',
    body = 'Try searching using keyword(s)',
    className,
  } = props;

  return (
    <div
      className={classNames(
        'my-8 flex w-full flex-col items-center',
        className
      )}
    >
      <div className="relative flex h-64 w-64 flex-col items-center">
        <Image src={src} className="object-contain" fill alt="..." />
      </div>
      <p className="subtitle1 mt-4 text-black">{header}</p>
      <p className="text-secondary">{body}</p>
    </div>
  );
};

export default NoResults;
