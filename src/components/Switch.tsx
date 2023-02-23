import classNames from 'classnames';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch: React.FC<Props> = function (props) {
  const { className, ...otherProps } = props;

  return (
    <label className={classNames('relative inline-block h-7 w-12', className)}>
      <input {...otherProps} className="peer hidden" type="checkbox" />
      <span
        className={classNames(
          'absolute top-0 left-0 right-0 bottom-0 cursor-pointer rounded-full bg-gray-200 transition-colors hover:bg-gray-300',
          "before:absolute before:left-1 before:bottom-1 before:top-1 before:h-5 before:w-5 before:rounded-full before:bg-white before:transition-colors before:content-['']",
          'peer-checked:bg-brand-main peer-checked:before:translate-x-5 peer-checked:hover:bg-brand-light'
        )}
      />
    </label>
  );
};

export default Switch;
