import { types } from './types';

import { List, fromJS } from 'immutable';

const initialState = fromJS(JSON.parse(localStorage.getItem('tasks'))) || List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TASKS_SUCCESS:
            localStorage.setItem('tasks', JSON.stringify(action.payload));

            return fromJS(action.payload);
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));
        case types.REMOVE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);
        case types.CHANGE_TASK:
            const taskJS = fromJS(action.payload);
            //console.log('X ', taskJS);

            const g = state.map((taskOld) => console.log('R ', taskJS.get(console.log('Z ',
                taskJS.map((taskNew) => taskNew.get('id')).indexOf(taskOld.get('id'))))));

            //console.log('Q ', g);

            const d = fromJS(state.toJS().map((taskOld) => action.payload[action.payload.map((taskNew) => taskNew.id).indexOf(taskOld.id)] || taskOld));

            return d;
        default:
            return state;
    }
};
