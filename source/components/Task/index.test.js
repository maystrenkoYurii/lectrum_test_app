import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Map, fromJS } from 'immutable';

import Task from './';
import tasksMook from '../../../jest/scripts/mocks/tasks.json';

configure({ adapter: new Adapter() });

const taskMook = fromJS(tasksMook[0]);

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
    task: taskMook,
};

const result = shallow(<Task { ...props } />);

describe('Task component', () => {
    test('Should have 1 section element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('Should have 1 Checkbox element', () => {
        expect(result.find('withSvg(Checkbox)')).toHaveLength(1);
    });

    test('Should have 1 input element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('Should have 1 Star element', () => {
        expect(result.find('withSvg(Star)')).toHaveLength(1);
    });

    test('Should have 1 Edit element', () => {
        expect(result.find('withSvg(Edit)')).toHaveLength(1);
    });

    test('Should have 1 Remove element', () => {
        expect(result.find('withSvg(Remove)')).toHaveLength(1);
    });

    test('input have should be empty initialy', () => {
        expect(result.find('input').props().defaultValue).toBe(taskMook.get('message'));
    });

    test('Checkbox have should be empty initialy', () => {
        expect(result.find('withSvg(Checkbox)').props().checked).toBe(taskMook.get('completed'));
    });

    test('Star have should be empty initialy', () => {
        expect(result.find('withSvg(Star)').props().checked).toBe(taskMook.get('favorite'));
    });

    test('Edit have should be empty initialy', () => {
        expect(result.find('withSvg(Edit)').props().checked).toBe(props.editTask.get('isEditTask'));
    });
});
