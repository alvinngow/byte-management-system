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

  return (
    <BaseCard
      className={`grid grid-flow-row grid-rows-3 ${
        linkTo ? 'cursor-pointer' : ''
      }`}
      onClick={clickHandler}
    >
      <div className="relative row-span-2 flex justify-center">
        <Image src={coverImage} alt="cover image" {...imgProps}></Image>
      </div>
      <div>
        <h2 className={`text-xl text-brand-main ${titleClass}`}>{title}</h2>
        {children}
      </div>
    </BaseCard>
  );
};

export default Card;
