import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Scheduler } from './';
import tasksMook from '../../instruments/tasks.json';

configure({ adapter: new Adapter() });


const props = {
    changeTask: jest.fn(),
    createTask: jest.fn(),
    fetching:   false,
    removeTask: jest.fn(),
    tasks:      tasksMook,
};

const state = {
    newTask: '',
    search:  '',
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

    test('Should have 2 input element', () => {
        expect(result.find('input')).toHaveLength(2);
    });

    test('Should have 1 form element', () => {
        expect(result.find('form')).toHaveLength(1);
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

    test('Should input change value', () => {
        expect(result.find('form').find('input').props().value).toBe(state.newTask);

        result.setState(() => ({
            newTask: 'FFF',
        }));

        expect(result.find('form').find('input').props().value).toBe('FFF');

        result.setState(() => ({
            newTask: '',
        }));

        expect(result.find('form').find('input').props().value).toBe(state.newTask);
    });
});
