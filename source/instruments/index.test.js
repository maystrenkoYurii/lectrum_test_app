import {
    getDisplayName,
    getFavorite,
    getNotCompleted,
    getAllTask,
    sortTask,
    searchTask,
    getCheckedCompletedAll
} from './helpers';

import tasksMook from './tasks.json';

describe('test getDisplayName function', () => {
    test('getDisplayName function should return is not string', () => {
        expect(typeof getDisplayName({})).toBe('string');
    });

    test('getDisplayName function should return displayName', () => {
        expect(getDisplayName({ displayName: 'name' })).toBe('name');
    });

    test('getDisplayName function should return name', () => {
        expect(getDisplayName({ name: 'name' })).toBe('name');
    });

    test('getDisplayName function should return Component', () => {
        expect(getDisplayName({})).toBe('Component');
    });

    test('getDisplayName function should return undefined', () => {
        expect(getDisplayName({ displayName: 'name' })).not.toBeUndefined();
    });

    test('getDisplayName function should return undefined', () => {
        expect(getDisplayName({ name: 'name' })).not.toBeUndefined();
    });

    test('getDisplayName function should return undefined', () => {
        expect(getDisplayName({})).not.toBeUndefined();
    });
});

describe('test getFavorite function', () => {
    test('getFavorite function should return is not array', () => {
        expect(Array.isArray(getFavorite([]))).toBe(true);
    });

    test('getFavorite function should result 2 tasks favorite in json', () => {
        expect(getFavorite(tasksMook).length).toBe(2);
    });

    test('getFavorite function should result 2 tasks favorite in json', () => {
        expect(getFavorite(tasksMook).length).not.toBe(0);
    });

    test('getFavorite function should return undefined', () => {
        expect(getFavorite(tasksMook)).not.toBeUndefined();
    });

    test('getFavorite function should return object in array ', () => {
        expect(typeof getFavorite(tasksMook)[0]).toBe('object');
    });
});

describe('test getNotCompleted function', () => {
    test('getNotCompleted function should return is not array', () => {
        expect(Array.isArray(getNotCompleted([]))).toBe(true);
    });

    test('sortTask function should result length not real with favorite', () => {
        expect(getNotCompleted(tasksMook).length).toBe(4);
    });

    test('sortTask function should result length 0 real length > 0', () => {
        expect(getNotCompleted(tasksMook).length).not.toBe(0);
    });

    test('sortTask function should return undefined', () => {
        expect(getNotCompleted(tasksMook)).not.toBeUndefined();
    });

    test('searchTask function should return object in array ', () => {
        expect(typeof getNotCompleted(tasksMook)[0]).toBe('object');
    });
});

describe('test getAllTask function', () => {
    test('getAllTask function should return is not array', () => {
        expect(Array.isArray(getAllTask([], []))).toBe(true);
    });

    test('getAllTask function should result length not real', () => {
        expect(getAllTask(tasksMook, getNotCompleted(tasksMook)).length).toBe(2);
    });

    test('getAllTask function should result length 0 real length > 0', () => {
        expect(getAllTask(tasksMook, getNotCompleted(tasksMook)).length).not.toBe(0);
    });

    test('getAllTask function should return undefined', () => {
        expect(getAllTask(tasksMook, getNotCompleted(tasksMook))).not.toBeUndefined();
    });

    test('getAllTask function should return object in array ', () => {
        expect(typeof getAllTask(tasksMook, getNotCompleted(tasksMook))[0]).toBe('object');
    });
});

describe('test sortTask function', () => {
    test('sortTask function should return is not array', () => {
        expect(Array.isArray(sortTask([]))).toBe(true);
    });

    test('sortTask function should result length !== operand length', () => {
        expect(sortTask(tasksMook).length).toBe(tasksMook.length);
    });

    test('sortTask function should result length 0 tasks length > 0', () => {
        expect(sortTask(tasksMook).length).not.toBe(0);
    });

    test('sortTask function should return undefined', () => {
        expect(sortTask(tasksMook)).not.toBeUndefined();
    });

    test('sortTask function should return object in array ', () => {
        expect(typeof sortTask(tasksMook)[0]).toBe('object');
    });
});

describe('test searchTask function', () => {
    test('searchTask function should return is not array', () => {
        expect(Array.isArray(searchTask([], ''))).toBe(true);
    });

    test('searchTask function should result 1 tasks in json', () => {
        expect(searchTask(tasksMook, 'nfg').length).toBe(1);
    });

    test('searchTask function should result tasks length 0', () => {
        expect(searchTask(tasksMook, 'nfg').length).not.toBe(0);
    });

    test('searchTask function should return undefined', () => {
        expect(searchTask(tasksMook, 'nfg')).not.toBeUndefined();
    });

    test('searchTask function should return object in array ', () => {
        expect(typeof searchTask(tasksMook, 'nfg')[0]).toBe('object');
    });
});

describe('test getCheckedCompletedAll function', () => {
    test('getCheckedCompletedAll function should return is not array', () => {
        expect(typeof getCheckedCompletedAll([])).toBe('boolean');
    });

    test('getCheckedCompletedAll function should return is not array', () => {
        expect(getCheckedCompletedAll(tasksMook)).toBe(false);
    });

    test('getCheckedCompletedAll function should return undefined', () => {
        expect(getCheckedCompletedAll(tasksMook)).not.toBeUndefined();
    });
});
