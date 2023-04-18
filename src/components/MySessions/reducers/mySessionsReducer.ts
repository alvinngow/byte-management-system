import { Attendance } from '@bims/graphql/schema';
import React from 'react';

export type MySessionsReducerTab = 'upcoming_sessions' | 'session_history';

export interface MySessionsReducerState {
  tab: MySessionsReducerTab;
  searchTerm: string;
  reverse: boolean;
  filterActualAttendance: Attendance | undefined;
}

export type MySessionsReducerAction =
  | {
      type: 'set_tab';
      tab: MySessionsReducerTab;
    }
  | {
      type: 'set_search_term';
      searchTerm: string;
    }
  | {
      type: 'flip_reverse';
    }
  | {
      type: 'set_attendance';
      attendance: Attendance | undefined;
    };

export const mySessionsReducer: React.Reducer<
  MySessionsReducerState,
  MySessionsReducerAction
> = (prevState, action) => {
  switch (action.type) {
    case 'set_tab': {
      if (action.tab === 'upcoming_sessions') {
        return {
          ...prevState,
          tab: 'upcoming_sessions',
          filterActualAttendance: undefined,
        };
      }

      return {
        ...prevState,
        tab: action.tab,
      };
    }
    case 'set_search_term': {
      return {
        ...prevState,
        searchTerm: action.searchTerm,
      };
    }
    case 'flip_reverse': {
      return {
        ...prevState,
        reverse: !prevState.reverse,
      };
    }
    case 'set_attendance': {
      if (prevState.tab === 'upcoming_sessions') {
        return prevState;
      }

      return {
        ...prevState,
        filterActualAttendance: action.attendance,
      };
    }
  }
};
