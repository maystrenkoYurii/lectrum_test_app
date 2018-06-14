import { fromJS, List } from 'immutable';

import { tasksReducer } from "../reducers";
import { tasksActions } from "../actions";

import tasksMook from '../../../../jest/scripts/mocks/tasks.json';
import { fetchTask, removeTask, createTask, changeTask } from '../helpers';

const initialState = fromJS(JSON.parse(localStorage.getItem('tasks'))) || List();

describe('tasks reducers', () => {
    test('should return initialState', () => {
        expect(tasksReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });

    test('should return FETCH_TASKS_SUCCESS, CREATE_TASK, REMOVE_TASK, CHANGE_TASK', () => {
        expect(tasksReducer(undefined, tasksActions.createTask(tasksMook[0]))).toEqual(createTask(initialState, tasksMook[0]));
        expect(tasksReducer(undefined, tasksActions.fetchTasks(tasksMook))).toEqual(fetchTask(initialState, tasksMook));
        expect(tasksReducer(fromJS(tasksMook), tasksActions.removeTask('5afc74ae5a244edb7ae939cb'))).toEqual(
            removeTask(fromJS(tasksMook), '5afc74ae5a244edb7ae939cb'));
        expect(tasksReducer(fromJS(tasksMook), tasksActions.changeTask([tasksMook[0]]))).toEqual(
            changeTask(fromJS(tasksMook), [tasksMook[0]]));
    });
});
