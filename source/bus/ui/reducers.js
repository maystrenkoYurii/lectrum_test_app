import { types } from './types';

import { Map } from 'immutable';

const initialState = Map({
    isFetching: false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_FETCHING_STATE:
            return state.set('isFetching', action.payload);
        default:
            return state;
    }
};
