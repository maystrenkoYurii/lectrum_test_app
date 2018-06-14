import { call, put } from 'redux-saga/effects';

import { api, token } from '../../../../config/api';
import { tasksActions } from '../../../../bus/tasks/actions';
import { uiActions } from '../../../../bus/ui/actions';

export function* callRemoveTaskWorker ({ payload: id }) {
    try {
        yield put(uiActions.setFetchingState(true));

        const response = yield call(fetch, `${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 204) {
            const { message } = yield call([response, response.json]);

            throw new Error(message);
        }

        yield put(tasksActions.removeTask(id));
    } catch (error) {
        yield put(uiActions.emitError(error, 'callRemoveTaskWorker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
