import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { CurrentUser, User } from '../../gen/graphql/resolvers';

/**
 * Adapted from https://stackoverflow.com/a/21682946
 */
function colorByHashCode(str: string) {
  return intToHSL(getHashCode(str));
}
function getHashCode(str: string) {
  let hash = 0;
  if (str.length == 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
function intToHSL(num: number) {
  const shortened = num % 360;
  return 'hsl(' + shortened + ',40%,60%)';
}

interface Props {
  user: User | CurrentUser;
  className?: string;
}

const Avatar: React.FC<Props> = function (props) {
  const { user, className } = props;
  const { firstName, lastName, avatar } = user;

  const backgroundColor = React.useMemo(() => {
    return colorByHashCode(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return (
    <div
      className={classNames(
        'flex items-center justify-center overflow-hidden rounded-full',
        className
      )}
      style={{
        backgroundColor,
      }}
    >
      {avatar ? (
        <Image
          className="grow object-cover"
          src={avatar}
          alt="profile placeholder"
          width={24}
          height={24}
        />
      ) : (
        <span className="grow self-center text-center font-medium uppercase text-white">
          {firstName?.[0]}
          {lastName?.[0]}
        </span>
      )}
    </div>
  );
};

export default Avatar;
