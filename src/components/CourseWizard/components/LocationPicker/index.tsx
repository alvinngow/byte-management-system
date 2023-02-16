import React from 'react';

import useDebounce from '../../../../hooks/useDebounce';
import styles from '../../../../styles/component_styles/Input.module.css';
import searchOneMap, {
  OneMapSearchResult,
} from '../../../../util/searchOneMap';
import Input from '../../../Input';
import { LocationData } from '../../machines/CourseWizardMachine';
import LocationResults from './components/LocationResults';
import { locationPickerReducer } from './reducers/locationPickerReducer';

interface Props {
  locationText: string;
  onLocationTextChange: React.ChangeEventHandler<HTMLInputElement>;
  onLocationPicked: (data: LocationData) => void;
}

const LocationPicker: React.FC<Props> = function (props) {
  const { locationText, onLocationTextChange, onLocationPicked } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const debouncedSearchTerm = useDebounce(locationText, 300);

  const [state, dispatch] = React.useReducer(locationPickerReducer, {
    results: [],
    focusedIndex: -1,
    loading: false,
    error: null,
  });

  const handleResultSelected = React.useCallback(
    (result: OneMapSearchResult) => {
      onLocationPicked({
        name: result.BUILDING,
        address: result.ADDRESS,
        description: '',
        lat: parseFloat(result.LATITUDE),
        lng: parseFloat(result.LONGITUDE),
      });

      setIsOpen(false);
    },
    [onLocationPicked]
  );

  React.useEffect(() => {
    if (debouncedSearchTerm.length === 0) {
      return;
    }

    async function run() {
      dispatch({ type: 'FETCH_START' });

      try {
        const oneMapResponse = await searchOneMap(debouncedSearchTerm);
        dispatch({
          type: 'FETCH_COMPLETE',
          results: oneMapResponse.results,
        });
      } catch (e) {
        dispatch({
          type: 'FETCH_ERROR',
          error: e as Error,
        });
      }
    }

    run();
  }, [debouncedSearchTerm]);

  const handleInputKeyDown = React.useCallback<React.KeyboardEventHandler>(
    (e) => {
      switch (e.key) {
        case 'Enter': {
          const focusedResult = state.results[state.focusedIndex];
          if (focusedResult != null) {
            handleResultSelected(focusedResult);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();

          dispatch({
            type: 'FOCUS_PREVIOUS',
          });
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();

          dispatch({
            type: 'FOCUS_NEXT',
          });
          break;
        }
      }
    },
    [handleResultSelected, state.focusedIndex, state.results]
  );

  const handleInputFocus = React.useCallback<React.FocusEventHandler>(() => {
    setIsOpen(true);
  }, []);

  const handleBackdropClick: React.MouseEventHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex grow flex-col">
        <Input
          className="grow"
          value={locationText}
          label="Address"
          placeholder="Where the course will be held"
          onChange={onLocationTextChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
        />

        {/* HACK: Using position: absolute div instead of proper Floating UI popup */}
        <div className="relative">
          {isOpen && (
            <div className="absolute top-0 left-0 right-0 z-50 flex w-full flex-col gap-y-0.5 overflow-hidden rounded-b-lg bg-gray-300 shadow-lg">
              {/* <span className={`relative`}> */}
              <LocationResults
                state={state}
                onResultSelected={handleResultSelected}
              />
              {/* </span> */}
            </div>
          )}
        </div>
        {isOpen && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen"
            onClick={handleBackdropClick}
          />
        )}
      </div>
    </>
  );
};

export default LocationPicker;
