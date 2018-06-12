// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

//Component
import Checkbox from '../../theme/assets/Checkbox';
import Spinner from '../../components/Spinner';
import Task from '../Task';

//HOK
import { withApi } from '../../components/HOC/withApi';

//bus
import { tasksActions } from '../../bus/tasks/actions';
import { postsActionsAsync } from '../../bus/tasks/saga/asyncActions';

//herpers
import { sortTask, searchTask, getCheckedCompletedAll } from '../../instruments/helpers';
import Animation from './animation';

//Style
import Styles from './styles.m.css';

const duration = 0.4;

const mapStateToProps = (state) => {
    return {
        isFetching: state.ui.get('isFetching'),
        tasks:      state.tasks,
    };
};

const mapDispathToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                ...tasksActions,
                ...postsActionsAsync,
            },
            dispatch
        ),
    };
};

@connect(mapStateToProps, mapDispathToProps)
export class Scheduler extends Component {

    static propTypes = {
        actions:    PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        tasks:      PropTypes.array.isRequired,
    };

    static defaultProps = {
        isFetching: false,
        tasks:      [],
        actions:    {
            fetchTasks:      () => {},
            removeTaskAsync: () => {},
            createTaskAsync: () => {},
            changeTaskAsync: () => {},
        },
    };

    constructor (props) {
        super(props);
        this.state = {
            newTask: '',
            search:  '',
        };
    }

    componentDidMount () {
        this.props.actions.fetchTasks();
    }

    shouldComponentUpdate (nextProps) {
        const { isFetching } = this.props;

        /*if (isFetching === nextProps.isFetching) {
            return true;
        }*/

        return true;
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
        const { actions } = this.props;

        if (newTask && newTask.length <= 50) {
            actions.createTaskAsync(newTask);
            this.setState({ newTask: '' });
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
        const { tasks, actions, isFetching } = this.props;
        const { newTask, search } = this.state;

        const processedTask = sortTask(searchTask(tasks, search));
        const checkedCompletedAll = getCheckedCompletedAll(processedTask);

        const renderTask = processedTask.map((task) => (
            <Transition
                key = { task.get('id') }
                timeout = { { enter: duration * 1000, exit: duration * 1000 } }
                onEnter = { this.onEnterAnimation(task) }
                onExit = { this.onExitAnimation }>
                <Task
                    changeTask = { actions.changeTaskAsync }
                    removeTask = { actions.removeTaskAsync }
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
