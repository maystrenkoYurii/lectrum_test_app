import { takeEvery } from 'redux-saga/effects';

import { types } from '../types';
import { asyncTypes } from './asyncTypes';
import { callFetchTasksWorker } from './workers/fetchTasks';
import { callCreateTaskWorker } from './workers/createTasks';
import { callRemoveTaskWorker } from './workers/removeTasks';

export const tasksWatchers = Object.freeze({
    * watchFetchTask () {
        yield takeEvery(types.FETCH_TASKS, callFetchTasksWorker);
    },
    * watchCreateTask () {
        yield takeEvery(asyncTypes.CREATE_TASK_ASYNC, callCreateTaskWorker);
    },
    * watchRemoveTask () {
        yield takeEvery(asyncTypes.REMOVE_TASK_ASYNC, callRemoveTaskWorker);
    },
});
