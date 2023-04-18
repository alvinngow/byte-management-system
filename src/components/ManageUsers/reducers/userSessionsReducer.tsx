import { Attendance } from '@bims/graphql/schema';
import React from 'react';

export type UserSessionsReducerTab = 'upcoming_sessions' | 'session_history';

export interface UserSessionsReducerState {
  tab: UserSessionsReducerTab;
  searchTerm: string;
  reverse: boolean;
  filterActualAttendance: Attendance | undefined;
}

export type UserSessionsReducerAction =
  | {
      type: 'set_tab';
      tab: UserSessionsReducerTab;
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

export const userSessionsReducer: React.Reducer<
  UserSessionsReducerState,
  UserSessionsReducerAction
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
