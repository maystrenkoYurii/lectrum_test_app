import { types } from './types';

export const tasksActions = Object.freeze({
    removeTask: (id) => ({
        type:    types.REMOVE_TASK,
        payload: id,
    }),
    createTask: (task) => ({
        type:    types.CREATE_TASK,
        payload: task,
    }),
    fetchTasks: () => ({
        type: types.FETCH_TASKS,
    }),
    fetchTasksSuccess: (tasks) => ({
        type:    types.FETCH_TASKS_SUCCESS,
        payload: tasks,
    }),
    fetchTasksFail: (error) => ({
        type:    types.FETCH_TASKS_FAIL,
        payload: error,
        error:   true,
    }),
});
