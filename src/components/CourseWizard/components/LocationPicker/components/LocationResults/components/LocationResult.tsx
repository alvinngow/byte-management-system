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
      className={classNames(
        'flex cursor-pointer flex-col bg-white px-2 py-2 hover:bg-brand-hover',
        {
          'bg-brand-hover': focused,
        }
      )}
      onClick={(e) => {
        onResultSelected(result);
      }}
    >
      <span className="subtitle1">{result.BUILDING}</span>
      <span>{result.ADDRESS}</span>
    </div>
  );
};

export default LocationResult;
