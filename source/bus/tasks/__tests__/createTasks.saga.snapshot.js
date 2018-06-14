import { cloneableGenerator } from 'redux-saga/utils';

import { tasksActions } from '../../../bus/tasks/actions';
import { callFetchTasksWorker } from '../saga/workers/fetchTasks';

import tasksMook from '../../../instruments/tasks.json';

const action = tasksActions.createTask(tasksMook[0]);
const saga = cloneableGenerator(callFetchTasksWorker)(action);

describe('createTasks saga', () => {
    test('should yield fetchTasks', () => {
        expect(saga.next().value).toMatchSnapshot();
    });

    test('should handle !== 200 response status', () => {
        const clone = saga.clone();

        const responseStatus400 = { ...__.fetchResponseFail, status: 400 };

        expect(clone.next(responseStatus400).value).toMatchSnapshot();

        expect(clone.next(__.responseDataFail).value).toMatchSnapshot();

        expect(clone.next().value).toMatchSnapshot();
        expect(clone.next().value).toMatchSnapshot();
        expect(clone.next().value).toMatchSnapshot();

        expect(clone.next().done).toBe(true);
    });

    test('should complete successfully', () => {

        expect(saga.next(__.fetchResponseSuccess).value).toMatchSnapshot();

        expect(saga.next(__.responseDataSuccess).value).toMatchSnapshot();

        expect(saga.next().value).toMatchSnapshot();
        expect(saga.next().value).toMatchSnapshot();
        expect(saga.next().value).toMatchSnapshot();

        expect(saga.next().done).toBe(true);
    });
});
