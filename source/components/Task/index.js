// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

//Component
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

//Style
import Styles from './styles.m.css';

class Task extends Component {

    static propTypes = {
        actions:  PropTypes.object.isRequired,
        editTask: PropTypes.object.isRequired,
        task:     PropTypes.object,
    };

    static defaultProps = {
        task: {},
    };

    constructor (props) {
        super(props);
        this.taskInput = React.createRef();
        this.handleClickCheckBox = ::this._handleClickCheckBox;
        this.handleClickStar = ::this._handleClickStar;
        this.handleClickEdit = ::this._handleClickEdit;
        this.handleChangeTextTask = ::this._handleChangeTextTask;
    }

    shouldComponentUpdate (nextProps) {
        const { task, editTask } = this.props;

        if (task.get('id') !== nextProps.task.get('id')
            || task.get('message') !== nextProps.task.get('message')
            || task.get('completed') !== nextProps.task.get('completed')
            || task.get('favorite') !== nextProps.task.get('favorite')
            || task.get('created') !== nextProps.task.get('created')
            || task.get('modified') !== nextProps.task.get('modified')
            || editTask.get('isEditTask') !== nextProps.editTask.get('isEditTask')) {
            return true;
        }

        return false;
    }

    componentDidUpdate () {
        const { editTask } = this.props;

        if (editTask.get('isEditTask') && this.taskInput.current) {
            this.taskInput.current.focus();
        }
    }

    _handleClickCheckBox () {
        const { actions, task } = this.props;
        const taskObject = task.removeAll(['completed']).toJS();

        actions.changeTaskAsync({ ...taskObject, completed: !task.get('completed') });
    }

    _handleClickStar () {
        const { actions, task } = this.props;
        const taskObject = task.removeAll(['favorite']).toJS();

        actions.changeTaskAsync({ ...taskObject, favorite: !task.get('favorite') });
    }

    _handleClickEdit () {
        const { actions, editTask, task } = this.props;
        const id = task.get('id');

        actions.setEditTaskState({ id, isEditTask: !editTask.get('isEditTask') });
    }

    _handleChangeTextTask (event) {
        const { actions, task } = this.props;
        const taskObject = task.removeAll(['message']).toJS();

        if (event.keyCode === 13) {

            this.handleClickEdit();
            actions.changeTaskAsync({ ...taskObject, message: event.target.value });
        } else if (event.keyCode === 27) {
            this.handleClickEdit();
        }
    }

    render () {
        const { task, actions, editTask } = this.props;

        const taskStyle = classNames(Styles.task, {
            [Styles.completed]: task.get('completed'),
        });

        const isEditTask = editTask.get('isEditTask') && editTask.get('id') === task.get('id');

        return (
            <section className = { taskStyle }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { task.get('completed') }
                        className = { Styles.complete }
                        color1 = '#3b8ef3'
                        color2 = '#fff'
                        onClick = { this.handleClickCheckBox }
                    />
                    <input
                        defaultValue = { task.get('message') }
                        disabled = { !isEditTask }
                        ref = { this.taskInput }
                        type = 'text'
                        onBlur = { (input) => input.target.value = task.get('message') }
                        onKeyDown = { this.handleChangeTextTask }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { task.get('favorite') }
                        className = { Styles.item }
                        color1 = '#3b8ef3'
                        onClick = { this.handleClickStar }
                    />
                    <Edit
                        checked = { isEditTask }
                        className = { Styles.item }
                        color1 = '#3b8ef3'
                        onClick = { this.handleClickEdit }
                    />
                    <Remove
                        color1 = '#3b8ef3'
                        onClick = { () => actions.removeTaskAsync(task.get('id')) }
                    />
                </div>
            </section>
        );
    }
}

export default Task;
