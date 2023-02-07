import React from 'react';

import { OneMapSearchResult } from '../../../../../../util/searchOneMap';
import Spinner from '../../../../../Spinner';
import { LocationPickerReducerState } from '../../reducers/locationPickerReducer';
import LocationResult from './components/LocationResult';

interface Props {
  state: LocationPickerReducerState;
  onResultSelected: (result: OneMapSearchResult) => void;
}

const LocationResults: React.FC<Props> = function (props) {
  const { state, onResultSelected } = props;

  return (
    <div className="flex max-h-72 flex-col gap-y-4 overflow-y-scroll">
      {state.results.length === 0 && <span>No results</span>}
      {state.loading && <Spinner />}
      {state.results.map((result, index) => (
        <LocationResult
          key={result.ADDRESS}
          result={result}
          focused={state.focusedIndex === index}
          onResultSelected={onResultSelected}
        />
      ))}
    </div>
  );
};

export default LocationResults;
