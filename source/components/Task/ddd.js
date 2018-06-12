import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Task from './';
import tasksMook from '../../instruments/tasks.json';

configure({ adapter: new Adapter() });

const taskMook = tasksMook[0];

const props = {
    changeTask: jest.fn(),
    removeTask: jest.fn(),
    task:       taskMook,
};

const state = {
    checkedEdit: false,
};

const checkedEditChange = true;
const mutateState = {
    checkedEdit: checkedEditChange,
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

    test('Should have a valid initial state', () => {
        expect(result.state()).toEqual(state);
    });

    test('input have should be empty initialy', () => {
        expect(result.find('input').props().defaultValue).toBe(taskMook.message);
    });

    test('Checkbox have should be empty initialy', () => {
        expect(result.find('withSvg(Checkbox)').props().checked).toBe(taskMook.completed);
    });

    test('Star have should be empty initialy', () => {
        expect(result.find('withSvg(Star)').props().checked).toBe(taskMook.favorite);
    });

    test('Edit have should be empty initialy', () => {
        expect(result.find('withSvg(Edit)').props().checked).toBe(state.checkedEdit);
    });

    test('Edit have should change state checked', () => {
        result.setState(() => ({
            checkedEdit: checkedEditChange,
        }));

        expect(result.state()).toEqual(mutateState);
        expect(result.find('withSvg(Edit)').props().checked).toBe(checkedEditChange);

        result.setState(() => ({
            checkedEdit: false,
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('withSvg(Edit)').props().checked).toBe(state.checkedEdit);
    });
});
