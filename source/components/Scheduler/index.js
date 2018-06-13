// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { Form } from 'react-redux-form';

//Component
import Checkbox from '../../theme/assets/Checkbox';
import Spinner from '../../components/Spinner';
import Task from '../Task';
import Input from '../Input';

//HOK
import { withApi } from '../../components/HOC/withApi';

//herpers
import { sortTask, searchTask, getCheckedCompletedAll } from '../../instruments/helpers';

//Style
import Styles from './styles.m.css';

export class Scheduler extends Component {

    static propTypes = {
        actions:    PropTypes.object.isRequired,
        editTask:   PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        search:     PropTypes.string.isRequired,
        tasks:      PropTypes.object.isRequired,
    };

    constructor () {
        super();
        this.searchTask = ::this._searchTask;
        this.handleSubmitNewTask = ::this._handleSubmitNewTask;
        this.handleClickCheckBox = ::this._handleClickCheckBox;
    }

    // shouldComponentUpdate (nextProps) {
    //     const { isFetching, editTask, tasks } = this.props;
    //
    //     console.log('SS ' + );
    //
    //     if (isFetching !== nextProps.isFetching
    //         || editTask.get('isEditTask') !== nextProps.editTask.get('isEditTask')
    //         || !tasks.equals(nextProps.tasks)) {
    //         return true;
    //     }
    //
    //     return false;
    // }

    _searchTask (event) {
        const { actions } = this.props;

        actions.setSearch(event.target.value);
    }

    _handleSubmitNewTask (data) {
        const { actions } = this.props;

        if (data.newTask && data.newTask.length <= 50) {
            actions.createTaskAsync(data.newTask);
            actions.reset('forms.newTask');
        }
    }

    _handleClickCheckBox (tasks, checkedCompletedAll) {
        const { actions } = this.props;

        if (!checkedCompletedAll) {
            const changedTask = tasks.map((task) => {
                const taskObject = task.removeAll(['completed']).toJS();

                return { ...taskObject, completed: true };
            });

            actions.changeTaskAsync(changedTask);
        }
    }

    render () {
        const { tasks, actions, isFetching, editTask, search } = this.props;

        const processedTask = sortTask(searchTask(tasks, search));
        const checkedCompletedAll = getCheckedCompletedAll(processedTask);

        const renderTask = processedTask.map((task) => (
            <Task
                actions = { actions }
                editTask = { editTask }
                key = { task.get('id') }
                task = { task }
            />
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
                                    duration = { 400 }
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
