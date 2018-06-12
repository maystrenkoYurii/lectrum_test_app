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
        changeTask: PropTypes.func,
        removeTask: PropTypes.func,
        task:       PropTypes.object,
    };

    static defaultProps = {
        task:       {},
        changeTask: null,
        removeTask: null,
    };

    constructor (props) {
        super(props);
        this.taskInput = React.createRef();
        this.state = {
            checkedEdit: false,
        };
    }

    shouldComponentUpdate (nextProps, nextState) {
        const { task } = this.props;
        const { checkedEdit } = this.state;

        if (task.get('id') !== nextProps.task.get('id')
            || task.get('message') !== nextProps.task.get('message')
            || task.get('completed') !== nextProps.task.get('completed')
            || task.get('favorite') !== nextProps.task.get('favorite')
            || task.get('created') !== nextProps.task.get('created')
            || task.get('modified') !== nextProps.task.get('modified')
            || checkedEdit !== nextState.checkedEdit) {
            return true;
        }

        return false;
    }

    componentDidUpdate () {
        const { checkedEdit } = this.state;

        if (checkedEdit && this.taskInput.current) {
            this.taskInput.current.focus();
        }
    }

    handleClickCheckBox = () => {
        const { changeTask, task } = this.props;
        const taskObject = task.removeAll(['completed']).toJS();

        changeTask({ ...taskObject, completed: !task.get('completed') });
    };

    handleClickStar = () => {
        const { changeTask, task } = this.props;
        const taskObject = task.removeAll(['favorite']).toJS();

        changeTask({ ...taskObject, favorite: !task.get('favorite') });
    };

    handleClickEdit = () => {
        this.setState(({ checkedEdit }) => ({
            checkedEdit: !checkedEdit,
        }));
    };

    handleChangeTextTask = (event) => {
        const { changeTask, task } = this.props;
        const taskObject = task.removeAll(['message']).toJS();

        if (event.keyCode === 13) {

            this.handleClickEdit();
            changeTask({ ...taskObject, message: event.target.value });
        } else if (event.keyCode === 27) {
            this.handleClickEdit();
        }
    };

    render () {
        const { task, removeTask } = this.props;
        const { checkedEdit } = this.state;

        const taskStyle = classNames(Styles.task, {
            [Styles.completed]: task.get('completed'),
        });

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
                        disabled = { !checkedEdit }
                        ref = { this.taskInput }
                        type = 'text'
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
                        checked = { checkedEdit }
                        className = { Styles.item }
                        color1 = '#3b8ef3'
                        onClick = { this.handleClickEdit }
                    />
                    <Remove
                        color1 = '#3b8ef3'
                        onClick = { () => removeTask(task.get('id')) }
                    />
                </div>
            </section>
        );
    }
}

export default Task;
