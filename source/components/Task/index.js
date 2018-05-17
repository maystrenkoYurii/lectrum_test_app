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

    shouldComponentUpdate (nextProps) {
        const { task } = this.props;

        if (task.id !== nextProps.id || task.message !== nextProps.message
            || task.completed !== nextProps.completed || task.favorite !== nextProps.favorite
            || task.created !== nextProps.created || task.modified !== nextProps.modified) {
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

        changeTask({ ...task, completed: !task.completed });
    };

    handleClickStar = () => {
        const { changeTask, task } = this.props;

        changeTask({ ...task, favorite: !task.favorite });
    };

    handleClickEdit = () => {
        this.setState(({ checkedEdit }) => ({
            checkedEdit: !checkedEdit,
        }));
    };

    handleChangeTextTask = (event) => {
        const { changeTask, task } = this.props;

        if (event.keyCode === 13) {

            this.handleClickEdit();
            changeTask({ ...task, message: event.target.value });
        } else if (event.keyCode === 27) {
            this.handleClickEdit();
        }
    };

    render () {
        const { task, removeTask } = this.props;
        const { checkedEdit } = this.state;

        const taskStyle = classNames(Styles.task, {
            [Styles.completed]: task.completed,
        });

        return (
            <section className = { taskStyle }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { task.completed }
                        className = { Styles.complete }
                        color1 = '#3b8ef3'
                        color2 = '#fff'
                        onClick = { this.handleClickCheckBox }
                    />
                    <input
                        defaultValue = { task.message }
                        disabled = { !checkedEdit }
                        ref = { this.taskInput }
                        type = 'text'
                        onKeyDown = { this.handleChangeTextTask }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { task.favorite }
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
                        onClick = { () => removeTask(task.id) }
                    />
                </div>
            </section>
        );
    }
}

export default Task;
