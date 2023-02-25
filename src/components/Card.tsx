import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ClassAttributes, HTMLAttributes } from 'react';
import { ClassExpression, ClassLikeDeclaration } from 'typescript';

import BaseCard from './BaseCard';

type CardProps = {
  coverImage: string;
  title: string;
  imgWidth?: number;
  imgHeight?: number;
  titleClass?: string;
  fill?: boolean;
  linkTo?: string;
  className?: string;
};

const Card: React.FC<React.PropsWithChildren<CardProps>> = (props) => {
  const {
    coverImage,
    title,
    imgWidth,
    imgHeight,
    titleClass,
    children,
    linkTo,
    className,
  } = props;

  let imgProps = {};
  if (!imgWidth || !imgHeight) {
    imgProps = {
      fill: true,
    };
  } else {
    imgProps = {
      width: imgWidth,
      height: imgHeight,
    };
  }
  const router = useRouter();

  function clickHandler() {
    if (linkTo) {
      router.push(linkTo);
    }
  }
  const baseCardClass = classNames(
    className,
    'grid grid-flow-row grid-rows-3',
    { 'cursor-pointer': linkTo }
  );
  return (
    <BaseCard className={baseCardClass} onClick={clickHandler}>
      <div className="relative row-span-2 flex justify-center">
        <Image
          className="rounded-t-lg"
          src={coverImage}
          alt="cover image"
          {...imgProps}
        ></Image>
      </div>
      <div>
        <h2 className={`px-4 pt-4 pb-1 text-xl text-brand-main ${titleClass}`}>
          {title}
        </h2>
        {children}
      </div>
    </BaseCard>
  );
};

export default Card;
