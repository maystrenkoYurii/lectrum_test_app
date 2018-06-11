import { call, put, delay } from 'redux-saga/effects';

import { api, token } from '../../../../config/api';
import { tasksActions } from '../../../../bus/tasks/actions';
import { uiActions } from '../../../../bus/ui/actions';

export function* callFetchTasksWorker () {
    try {
        yield put(uiActions.setFetchingState(true));

        const response = yield call(fetch, `${api}`, {
            method:  'GET',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
        });
        const { data: tasks, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield delay(500);

        yield put(tasksActions.fetchTasksSuccess(tasks));
    } catch (error) {
        yield put(tasksActions.fetchTasksFail(error));
        yield put(uiActions.emitError(error, 'callFetchTasksWorker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
