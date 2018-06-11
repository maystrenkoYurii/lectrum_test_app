import { call, put, select, delay } from 'redux-saga/effects';

export function* callCreateTaskWorker ({ payload: task }) {
    try {
        yield put(console.log('callCreateTaskWorker', task));
    } catch (error) {
        yield put(console.log('callCreateTaskWorker'));
    } finally {
        yield put(console.log('callCreateTaskWorker'));
    }
}
