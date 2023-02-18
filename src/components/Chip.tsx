import classNames from 'classnames';
import React, { ComponentType } from 'react';

type Scheme = 'danger' | 'success' | 'warning' | 'info' | 'disabled';

// @tw
const SchemeClassMap: Record<Scheme, string> = {
  danger: 'bg-red-100 text-red-600',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-amber-100 text-amber-600',
  info: 'bg-blue-100 text-blue-600',
  disabled: 'bg-gray-100 text-gray-500',
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  scheme: Scheme;
  text?: string;
  number?: string;
  Icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Chip: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<Props>
> = function (props, ref) {
  const {
    children,
    className,
    scheme,
    text = 'placeholder',
    number = '0',
    Icon,
    ...otherProps
  } = props;

  return (
    <>
      <div className={className}>
        <div
          ref={ref}
          className={classNames(
            'd-flex inline-flex items-center rounded-2xl py-2 px-2.5 text-sm font-light',
            SchemeClassMap[scheme]
          )}
          {...otherProps}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {number}
        </div>
        <div
          className={classNames('ml-2 inline max-w-[50%] truncate align-[3px]')}
        >
          {children}
          {text}
        </div>
      </div>
    </>
  );
};

export default React.forwardRef(Chip);
