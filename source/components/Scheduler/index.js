// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import FlipMove from 'react-flip-move';

//Component
import Checkbox from '../../theme/assets/Checkbox';
import Spinner from '../../components/Spinner';
import Task from '../Task';

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
        changeTask: PropTypes.func.isRequired,
        createTask: PropTypes.func.isRequired,
        fetching:   PropTypes.bool.isRequired,
        removeTask: PropTypes.func.isRequired,
        tasks:      PropTypes.array.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            newTask: '',
            search:  '',
        };
    }

    shouldComponentUpdate (nextProps) {
        const { fetching } = this.props;

        if (fetching === nextProps.fetching) {
            return true;
        }

        return false;
    }

    changeNewTask = (event) => {
        this.setState({ newTask: event.target.value });
    };

    searchTask = (event) => {
        this.setState({ search: event.target.value });
    };

    submitNewTask = (event) => {
        event.preventDefault();
        const { newTask } = this.state;
        const { createTask } = this.props;

        if (newTask && newTask.length <= 50) {
            createTask(newTask);
            this.setState({ newTask: '' });
        }
    };

    handleClickCheckBox = (tasks, checkedCompletedAll) => {
        const { changeTask } = this.props;

        if (!checkedCompletedAll) {
            const changedTask = tasks.map((task) => {
                return { ...task, completed: true };
            });

            changeTask(changedTask);
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
        const { tasks, changeTask, removeTask, fetching } = this.props;
        const { newTask, search } = this.state;

        const processedTask = sortTask(searchTask(tasks, search));
        const checkedCompletedAll = getCheckedCompletedAll(processedTask);

        const renderTask = processedTask.map((task) => (
            <Transition
                key = { task.id }
                timeout = { { enter: duration * 1000, exit: duration * 1000 } }
                onEnter = { this.onEnterAnimation(task) }
                onExit = { this.onExitAnimation }>
                <Task
                    changeTask = { changeTask }
                    removeTask = { removeTask }
                    task = { task }
                />
            </Transition>
        ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner spin = { fetching } />
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
                        <form onSubmit = { this.submitNewTask } >
                            <input
                                placeholder = 'Новая задача'
                                type = 'text'
                                value = { newTask }
                                onChange = { this.changeNewTask }
                            />
                            <button type = 'submit'>
                                Добавить задачу
                            </button>
                        </form>
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
