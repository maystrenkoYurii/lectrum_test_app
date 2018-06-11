import { types } from './types';

import { List, fromJS } from 'immutable';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TASKS_SUCCESS:
            return fromJS(action.payload);
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));
        case types.REMOVE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);
        default:
            return state;
    }
};
