import { combineForms } from 'react-redux-form';

export const formReducer = combineForms(
    {
        newTask: {
            newTask: '',
        },
    },
    'forms',
);
