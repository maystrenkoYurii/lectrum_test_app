// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import FlipMove from 'react-flip-move';
import { Form, Errors, Control } from 'react-redux-form';

//Component
import Checkbox from '../../theme/assets/Checkbox';
import Spinner from '../../components/Spinner';
import Task from '../Task';
import Input from '../Input';

//HOK
import { withApi } from '../../components/HOC/withApi';

//herpers
import { sortTask, searchTask, getCheckedCompletedAll } from '../../instruments/helpers';
import Animation from './animation';

//Style
import Styles from './styles.m.css';

const duration = 0.4;

export class Scheduler extends Component {

    static propTypes = {
        actions:    PropTypes.object.isRequired,
        editTask:   PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        search:     PropTypes.string.isRequired,
        tasks:      PropTypes.object.isRequired,
    };

    shouldComponentUpdate (nextProps) {
        const { isFetching, editTask } = this.props;

        if (/*isFetching !== nextProps.isFetching
            || */editTask.get('isEditTask') !== nextProps.editTask.get('isEditTask')) {
            return true;
        }

        return false;
    }

    searchTask = (event) => {
        const { actions } = this.props;

        actions.setSearch(event.target.value);
    };

    handleSubmitNewTask = (data) => {
        const { actions } = this.props;

        if (data.newTask && data.newTask.length <= 50) {
            actions.createTaskAsync(data.newTask);
            actions.reset('forms.newTask');
        }
    };

    handleClickCheckBox = (tasks, checkedCompletedAll) => {
        const { actions } = this.props;

        if (!checkedCompletedAll) {
            const changedTask = tasks.map((task) => {
                const taskObject = task.removeAll(['completed']).toJS();

                return { ...taskObject, completed: true };
            });

            actions.changeTaskAsync(changedTask);
        }
    };

    onEnterAnimation = (task) => (element) => {
        if (task.added) {
            Animation.open(element, duration);
        } else {
            Animation.show(element, duration);
        }
    };

    onExitAnimation = (element) => {
        Animation.close(element, duration);
    };

    render () {
        const { tasks, actions, isFetching, editTask, search } = this.props;

        const processedTask = sortTask(searchTask(tasks, search));
        const checkedCompletedAll = getCheckedCompletedAll(processedTask);

        const renderTask = processedTask.map((task) => (
            <Transition
                key = { task.get('id') }
                timeout = { { enter: duration * 1000, exit: duration * 1000 } }
                onEnter = { this.onEnterAnimation(task) }
                onExit = { this.onExitAnimation }>
                <Task
                    actions = { actions }
                    editTask = { editTask }
                    task = { task }
                />
            </Transition>
        ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner spin = { isFetching } />
                <main>
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <input
                            placeholder = 'Поиск'
                            onChange = { this.searchTask }
                        />
                    </header>
                    <section>
                        <Form
                            className = { Styles.form }
                            model = 'forms.newTask'
                            onSubmit = { this.handleSubmitNewTask }>
                            <Input
                                className = { Styles.input }
                                id = 'forms.newTask.newTask'
                                model = 'forms.newTask.newTask'
                                placeholder = 'Новая задача'
                                type = 'text'
                            />
                            <button type = 'submit'>
                                Добавить задачу
                            </button>
                        </Form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <FlipMove
                                    duration = { duration * 1000 }
                                    easing = 'ease-out'>
                                    { renderTask }
                                </FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <div>
                            <Checkbox
                                checked = { checkedCompletedAll }
                                color1 = '#000'
                                color2 = '#fff'
                                onClick = { () => this.handleClickCheckBox(processedTask, checkedCompletedAll) }
                            />
                        </div>
                        <span className = { Styles.completeAllTasks }>
                            Все задачи виполнени
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}

export default withApi(Scheduler);
