import { types } from './types';

import { List, fromJS } from 'immutable';

import { fetchTask, removeTask, createTask, changeTask } from './helpers';

const initialState = fromJS(JSON.parse(localStorage.getItem('tasks'))) || List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TASKS_SUCCESS:
            return fetchTask(action.payload);
        case types.CREATE_TASK:
            return createTask(state, action.payload);
        case types.REMOVE_TASK:
            return removeTask(state, action.payload);
        case types.CHANGE_TASK:
            return changeTask(state, action.payload);
        default:
            return state;
    }
};
