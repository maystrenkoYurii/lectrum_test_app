import { call, put } from 'redux-saga/effects';

import { api, token } from '../../../../config/api';
import { tasksActions } from '../../../../bus/tasks/actions';
import { uiActions } from '../../../../bus/ui/actions';

export function* callCreateTaskWorker ({ payload: message }) {
    try {

        yield put(uiActions.setFetchingState(true));

        const response = yield call(fetch, api, {
            method:  'POST',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        const { data: task, message: msg } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(msg);
        }

        yield put(tasksActions.createTask(task));
    } catch (error) {
        yield put(uiActions.emitError(error, 'callCreateTaskWorker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
