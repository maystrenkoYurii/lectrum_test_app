// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as formActions } from 'react-redux-form';

//bus
import { tasksActions } from '../../bus/tasks/actions';
import { uiActions } from '../../bus/ui/actions';
import { postsActionsAsync } from '../../bus/tasks/saga/asyncActions';

export const withApi = (Enchanced) => {
    const mapStateToProps = (state) => {
        return {
            editTask:   state.ui.get('editTask'),
            search:     state.ui.get('search'),
            isFetching: state.ui.get('isFetching'),
            tasks:      state.tasks,
        };
    };

    const mapDispathToProps = (dispatch) => {
        return {
            actions: bindActionCreators(
                {
                    ...formActions,
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
            search:     PropTypes.string.isRequired,
            tasks:      PropTypes.object.isRequired,
        };

        static defaultProps = {
            isFetching: false,
            search:     '',
            editTask:   {},
            tasks:      {},
            actions:    {
                fetchTasks:       () => {},
                removeTaskAsync:  () => {},
                createTaskAsync:  () => {},
                changeTaskAsync:  () => {},
                setEditTaskState: () => {},
                setSearch:        () => {},
                reset:            () => {},
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
