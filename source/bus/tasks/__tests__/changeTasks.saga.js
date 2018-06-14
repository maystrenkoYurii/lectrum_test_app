import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { api, token } from '../../../config/api';
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../../tasks/actions';
import { callChangeTaskWorker } from "../saga/workers/changeTasks";

const message = __.credentials;

const action = tasksActions.changeTask(message);

const saga = cloneableGenerator(callChangeTaskWorker)(action);

describe('changeTasks', () => {
    test('should dispatch SET_FETCHING_STATE action', () => {
        expect(saga.next().value).toEqual(put(uiActions.setFetchingState(true)));
    });

    test('should dispatch CHANGE_TASK action', () => {
        expect(saga.next().value).toEqual(call(fetch, api, {
            method:  'PUT',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([__.credentials]),
        }));
    });


    test('should handle !== 200 response status', () => {
        const clone = saga.clone();

        expect(clone.next(__.fetchResponseFail).value).toEqual(
            call([__.fetchResponseFail, __.fetchResponseFail.json])
        );

        expect(clone.next(__.responseDataFail).value).toEqual(
            put(uiActions.emitError(__.error, 'callChangeTaskWorker')),
        );

        expect(clone.next().value).toEqual(
            put(uiActions.setFetchingState(false)),
        );

        expect(clone.next().done).toBe(true);
    });

    test('fetch regues should handle complete successfuly', () => {
        expect(saga.next(__.fetchResponseSuccess).value).toEqual(
            call([__.fetchResponseSuccess, __.fetchResponseSuccess.json])
        );
    });

    test('should response data success', () => {
        expect(saga.next(__.responseDataSuccess).value).not.toBeUndefined();
    });

    test('should call SET_FETCHING_STATE', () => {
        expect(saga.next().value).toEqual(put(uiActions.setFetchingState(false)));
    });

    test('should done', () => {
        expect(saga.next().done).toBe(true);
    });
});
