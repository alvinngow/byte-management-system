import classNames from 'classnames';
import React from 'react';

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
}

const Chip: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<Props>
> = function (props, ref) {
  const { children, className, scheme, ...otherProps } = props;

  return (
    <div
      ref={ref}
      className={classNames(
        'd-flex inline-flex items-center gap-x-1.5 rounded-2xl px-3 py-2 text-sm font-light',
        SchemeClassMap[scheme],
        className
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(Chip);
