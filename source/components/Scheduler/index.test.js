import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Map, fromJS } from 'immutable';

import { Scheduler } from './';
import tasksMook from '../../../jest/scripts/mocks/tasks.json';

configure({ adapter: new Adapter() });


const props = {
    actions: {
        fetchTasks:      () => jest.fn(),
        removeTaskAsync: () => jest.fn(),
        createTaskAsync: () => jest.fn(),
        changeTaskAsync: () => jest.fn(),
    },
    editTask: Map({
        id:         false,
        isEditTask: false,
    }),
    tasks:      fromJS(tasksMook),
    search:     '',
    isFetching: false,
};

const result = shallow(<Scheduler { ...props } />);

console.log(result.debug());

describe('Scheduler component', () => {
    test('Should have 2 section element', () => {
        expect(result.find('section')).toHaveLength(2);
    });

    test('Should have 1 Spinner element', () => {
        expect(result.find('Spinner')).toHaveLength(1);
    });

    test('Should have 1 main element', () => {
        expect(result.find('main')).toHaveLength(1);
    });

    test('Should have 1 header element', () => {
        expect(result.find('header')).toHaveLength(1);
    });

    test('Should have 1 h1 element', () => {
        expect(result.find('h1')).toHaveLength(1);
    });

    test('Should have 1 h1 element', () => {
        expect(result.find('h1')).toHaveLength(1);
    });

    test('Should have 1 input element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('Should have 1 Input element', () => {
        expect(result.find('Input')).toHaveLength(1);
    });

    test('Should have 1 Form element', () => {
        expect(result.find('Connect(Form)')).toHaveLength(1);
    });

    test('Should have 1 button element', () => {
        expect(result.find('button')).toHaveLength(1);
    });

    test('Should have 1 button element', () => {
        expect(result.find('button')).toHaveLength(1);
    });

    test('Should have 1 ul element', () => {
        expect(result.find('ul')).toHaveLength(1);
    });

    test('Should have 1 footer element', () => {
        expect(result.find('footer')).toHaveLength(1);
    });

    test('Should have 1 Checkbox element', () => {
        expect(result.find('withSvg(Checkbox)')).toHaveLength(1);
    });

    test('Should have 1 span element', () => {
        expect(result.find('span')).toHaveLength(1);
    });
});
