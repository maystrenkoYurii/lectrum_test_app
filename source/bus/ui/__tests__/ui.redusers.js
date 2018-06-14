import { fromJS, Map } from 'immutable';

import { uiReducer } from "../reducers";
import { uiActions } from "../actions";

const initialState = Map({
    isFetching: false,
    search:     '',
    editTask:   Map({
        id:         false,
        isEditTask: false,
    }),
});

describe('ui reducers', () => {
    test('should return initialState', () => {
        expect(uiReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });

    test('should return SET_FETCHING_STATE, SET_SEARCH, SET_EDIT_TASK_STATE', () => {
        expect(uiReducer(undefined, uiActions.setFetchingState(true))).toEqual(initialState.set('isFetching', true));
        expect(uiReducer(undefined, uiActions.setEditTaskState({
            id:         false,
            isEditTask: true,
        }))).toEqual(initialState.set('editTask', fromJS({
            id:         false,
            isEditTask: true,
        })));
        expect(uiReducer(undefined, uiActions.setSearch('RR'))).toEqual(initialState.set('search', 'RR'));
    });
});
