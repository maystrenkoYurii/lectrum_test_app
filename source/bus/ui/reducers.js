import { types } from './types';

import { Map, fromJS } from 'immutable';

const initialState = Map({
    isFetching: false,
    search:     '',
    editTask:   Map({
        id:         false,
        isEditTask: false,
    }),
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_FETCHING_STATE:
            return state.set('isFetching', action.payload);
        case types.SET_SEARCH:
            return state.set('search', action.payload);
        case types.SET_EDIT_TASK_STATE:
            return state.set('editTask', fromJS(action.payload));
        default:
            return state;
    }
};
