import { isImmutable, fromJS } from 'immutable';

import {
    fetchTask,
    createTask,
    removeTask,
    changeTask
} from './helpers';

import tasksMook from '../../instruments/tasks.json';

describe('test fetchTask function', () => {
    test('fetchTask function should return is not array', () => {
        expect(isImmutable(fetchTask([{}]))).toBe(true);
    });

    test('fetchTask function should return size === length', () => {
        expect(fetchTask(tasksMook).size).toBe(tasksMook.length);
    });
});

describe('test createTask function', () => {
    test('createTask function should return is not array', () => {
        expect(isImmutable(createTask(fromJS(tasksMook), tasksMook))).toBe(true);
    });

    test('createTask function should return size === length', () => {
        expect(createTask(fromJS(tasksMook), tasksMook).size).toBe(tasksMook.length + 1);
    });
});

describe('test removeTask function', () => {
    test('createTask function should return is not array', () => {
        expect(isImmutable(removeTask(fromJS(tasksMook), ''))).toBe(true);
    });

    test('removeTask function should return size === length', () => {
        expect(removeTask(fromJS(tasksMook), '5afc74ae5a244edb7ae939cb').size).toBe(tasksMook.length - 1);
    });
});

describe('test changeTask function', () => {
    test('changeTask function should return is not array', () => {
        expect(isImmutable(changeTask(fromJS(tasksMook), [tasksMook[0]]))).toBe(true);
    });

    test('changeTask function should return size === length', () => {
        expect(changeTask(fromJS(tasksMook), [tasksMook[0]]).size).toBe(tasksMook.length);
    });
});
