import { tasksActions } from "../actions";
import { types } from "../types";


describe('tasks actions', () => {
    test('REMOVE_TASK', () => {
        expect(tasksActions.removeTask('123')).toEqual({
            type:    types.REMOVE_TASK,
            payload: '123',
        });
    });
    test('CREATE_TASK', () => {
        expect(tasksActions.createTask({})).toEqual({
            type:    types.CREATE_TASK,
            payload: {},
        });
    });
    test('CHANGE_TASK', () => {
        expect(tasksActions.changeTask({})).toEqual({
            type:    types.CHANGE_TASK,
            payload: {},
        });
    });
    test('FETCH_TASKS', () => {
        expect(tasksActions.fetchTasks()).toEqual({
            type: types.FETCH_TASKS,
        });
    });
    test('FETCH_TASKS_SUCCESS', () => {
        expect(tasksActions.fetchTasksSuccess({})).toEqual({
            type:    types.FETCH_TASKS_SUCCESS,
            payload: {},
        });
    });
    test('FETCH_TASKS_FAIL', () => {
        expect(tasksActions.fetchTasksFail({})).toEqual({
            type:    types.FETCH_TASKS_FAIL,
            payload: {},
            error:   true,
        });
    });
});
