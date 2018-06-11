import { call, put } from 'redux-saga/effects';

import { api, token } from '../../../../config/api';
import { tasksActions } from '../../../../bus/tasks/actions';
import { uiActions } from '../../../../bus/ui/actions';

export function* callChangeTaskWorker ({ payload: task }) {
    try {

        yield put(uiActions.setFetchingState(true));

        const response = yield call(fetch, api, {
            method:  'PUT',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Array.isArray(task) ? task: [task]),
        });

        const { data: newTask, message: msg } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(msg);
        }

        yield put(tasksActions.changeTask(newTask));
    } catch (error) {
        yield put(uiActions.emitError(error, 'callChangeTaskWorker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
