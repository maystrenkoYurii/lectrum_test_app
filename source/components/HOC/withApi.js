// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//bus
import { tasksActions } from '../../bus/tasks/actions';
import { postsActionsAsync } from '../../bus/tasks/saga/asyncActions';

export const withApi = (Enchanced) => {
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
    class WithApi extends Component {

        static propTypes = {
            actions:    PropTypes.object.isRequired,
            isFetching: PropTypes.bool.isRequired,
            tasks:      PropTypes.object.isRequired,
        };

        static defaultProps = {
            isFetching: false,
            tasks:      {},
            actions:    {
                fetchTasks:      () => {},
                removeTaskAsync: () => {},
                createTaskAsync: () => {},
                changeTaskAsync: () => {},
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
