import classNames from 'classnames';
import React from 'react';

import { OneMapSearchResult } from '../../../../../../../util/searchOneMap';

interface Props {
  result: OneMapSearchResult;
  focused: boolean;
  onResultSelected: (result: OneMapSearchResult) => void;
}

const LocationResult: React.FC<Props> = function (props) {
  const { result, focused, onResultSelected } = props;

  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!focused) {
      return;
    }

    elementRef.current?.scrollIntoView({
      block: 'nearest',
    });
  }, [focused]);

  return (
    <div
      ref={elementRef}
      key={result.ADDRESS}
      className={classNames('flex flex-col hover:bg-brand-hover', {
        'bg-brand-hover': focused,
      })}
      onClick={(e) => {
        onResultSelected(result);
      }}
    >
      <span className="font-bold">{result.BUILDING}</span>
      <span>{result.ADDRESS}</span>
    </div>
  );
};

export default LocationResult;
