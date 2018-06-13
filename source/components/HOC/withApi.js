// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//bus
import { tasksActions } from '../../bus/tasks/actions';
import { uiActions } from '../../bus/ui/actions';
import { postsActionsAsync } from '../../bus/tasks/saga/asyncActions';

export const withApi = (Enchanced) => {
    const mapStateToProps = (state) => {
        return {
            editTask:   state.ui.get('editTask'),
            isFetching: state.ui.get('isFetching'),
            tasks:      state.tasks,
        };
    };

    const mapDispathToProps = (dispatch) => {
        return {
            actions: bindActionCreators(
                {
                    ...uiActions,
                    ...tasksActions,
                    ...postsActionsAsync,
                },
                dispatch
            ),
        };
    };

    @connect(mapStateToProps, mapDispathToProps)
    class WithApi extends Component {

        static propTypes = {
            actions:    PropTypes.object.isRequired,
            editTask:   PropTypes.object.isRequired,
            isFetching: PropTypes.bool.isRequired,
            tasks:      PropTypes.object.isRequired,
        };

        static defaultProps = {
            isFetching: false,
            editTask:   {},
            tasks:      {},
            actions:    {
                fetchTasks:       () => {},
                removeTaskAsync:  () => {},
                createTaskAsync:  () => {},
                changeTaskAsync:  () => {},
                setEditTaskState: () => {},
            },
        };

        componentDidMount () {
            const { actions } = this.props;

            actions.fetchTasks();
        }

        render () {
            return (
                <Enchanced { ...this.props } />
            );
        }
    }

    return WithApi;
};
