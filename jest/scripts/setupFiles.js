import { fetch } from './mocks/fetch';
import { LocalStorage } from './mocks/localStorage';

import tasks from './mocks/tasks.json';

global.localStorage = new LocalStorage();

global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;

global.fetch = fetch;

const successMesasge = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const token = 'TEST_TOKEN';
const error = new Error(errorMessage);

const tasksMook = tasks;

const responseDataSuccess = {
    data:    tasksMook,
    message: successMesasge,
};

const responseDataFail = {
    message: errorMessage,
    data:    '',

};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseFail = {
    status: 401,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

global.__ = {
    tasksMook,
    errorMessage,
    token,
    error,
    responseDataSuccess,
    responseDataFail,
    fetchResponseSuccess,
    fetchResponseFail,
};
