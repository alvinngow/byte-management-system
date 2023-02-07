import classNames from 'classnames';
import React from 'react';

interface Props {
  className?: string;
}

const Spinner: React.FC<Props> = function (props) {
  const { className } = props;

  return (
    <div className="flex items-center justify-center">
      <div
        className={classNames(
          'spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4',
          className
        )}
        role="status"
      />
    </div>
  );
};

export default Spinner;
