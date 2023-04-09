import classNames from 'classnames';
import React, { ComponentType } from 'react';

type Scheme =
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'disabled'
  | 'approved';

// @tw
const SchemeClassMap: Record<Scheme, string> = {
  danger: 'bg-red-100 text-red-600',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-amber-100 text-amber-600',
  info: 'bg-blue-100 text-blue-600',
  disabled: 'bg-gray-100 text-gray-500',
  approved: 'bg-purple-100 text-purple-600',
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  scheme: Scheme;
  text?: string;
  number?: string;
  Icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize?: number;
  override?: boolean;
}

const Chip: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<Props>
> = function (props, ref) {
  const {
    children,
    className,
    scheme,
    text,
    number,
    Icon,
    iconSize = 4,
    override,
    ...otherProps
  } = props;

  return (
    <>
      <div className={className}>
        <div
          ref={ref}
          className={classNames(
            'd-flex inline-flex items-center overflow-hidden rounded-2xl py-2 px-2.5 text-sm font-light',
            SchemeClassMap[scheme]
          )}
          {...otherProps}
        >
          {Icon && <Icon className={`h-${iconSize} w-${iconSize}`} />}
          {number}
          {override && <span>{children}</span>}
        </div>
        <div
          className={classNames('ml-2 inline max-w-[50%] truncate align-[3px]')}
        >
          {!override && <span>{children}</span>}
          {text}
        </div>
      </div>
    </>
  );
};

export default React.forwardRef(Chip);
