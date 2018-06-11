import { all } from 'redux-saga/effects';

import { tasksWatchers } from '../bus/tasks/saga';

export function* rootSaga () {
    yield all([
        tasksWatchers.watchFetchTask(),
        tasksWatchers.watchCreateTask(),
        tasksWatchers.watchRemoveTask()
    ]);
}
