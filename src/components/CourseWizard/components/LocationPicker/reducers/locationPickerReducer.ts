import React from 'react';

import { OneMapSearchResult } from '../../../../../util/searchOneMap';

export type LocationPickerReducerState = {
  results: OneMapSearchResult[];
  focusedIndex: number;
} & (
  | {
      loading: true;
      error: null;
    }
  | {
      loading: false;
      error: Error | null;
    }
);

export type LocationPickerReducerAction =
  | {
      type: 'FOCUS_PREVIOUS';
    }
  | {
      type: 'FOCUS_NEXT';
    }
  | {
      type: 'FETCH_START';
    }
  | {
      type: 'FETCH_ERROR';
      error: Error;
    }
  | {
      type: 'FETCH_COMPLETE';
      results: OneMapSearchResult[];
    };

export const locationPickerReducer: React.Reducer<
  LocationPickerReducerState,
  LocationPickerReducerAction
> = (prevState, action) => {
  switch (action.type) {
    case 'FOCUS_PREVIOUS': {
      if (prevState.results.length === 0) {
        return prevState;
      }

      return {
        ...prevState,
        focusedIndex: Math.max(prevState.focusedIndex - 1, 0),
      };
    }
    case 'FOCUS_NEXT': {
      if (prevState.results.length === 0) {
        return prevState;
      }

      return {
        ...prevState,
        focusedIndex: Math.min(
          prevState.focusedIndex + 1,
          prevState.results.length - 1
        ),
      };
    }
    case 'FETCH_START': {
      return {
        results: [],
        focusedIndex: -1,
        loading: true,
        error: null,
      };
    }
    case 'FETCH_ERROR': {
      return {
        results: [],
        focusedIndex: -1,
        loading: false,
        error: action.error,
      };
    }
    case 'FETCH_COMPLETE': {
      return {
        results: action.results,
        focusedIndex: action.results.length > 0 ? 0 : -1,
        loading: false,
        error: null,
      };
    }
  }

  return prevState;
};
