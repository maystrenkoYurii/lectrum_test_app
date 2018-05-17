// Core
import React, { Component } from 'react';

//api
import { url, token } from "../../config/api";

export const withApi = (Enchanced) =>
    class WithApi extends Component {

        constructor () {
            super();
            this.state = {
                fetching: false,
                tasks:    [],
            };
            this.fetchTask = ::this._fetchTask;
            this.createTask = ::this._createTask;
            this.changeTask = ::this._changeTask;
            this.removeTask = ::this._removeTask;
        }

        componentDidMount () {
            this.setOldTask();
            this.fetchTask();
        }

        setFetching = (state) => {
            this.setState({ fetching: state });
        };

        saveTaskLocal = (tasks) => {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        getTaskLocal = () => {
            return JSON.parse(localStorage.getItem('tasks'));
        };

        setOldTask = () => {
            const tasksOld = this.getTaskLocal();

            if (tasksOld) {
                this.setState({ tasks: tasksOld });
            }
        };

        async _fetchTask () {
            try {
                this.setFetching(true);
                const responce = await fetch(url, {
                    method:  'GET',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                });

                if (responce.status !== 200) {
                    throw new Error('Fetch failed');
                }
                const { data } = await responce.json();

                this.setFetching(false);

                this.setState(() => {
                    const newTasks = [...data];

                    this.saveTaskLocal(newTasks);

                    return { tasks: newTasks };
                });
            } catch (error) {
                this.setFetching(false);
                console.error(error);
            }
        }

        async _createTask (message) {
            try {
                this.setFetching(true);
                const responce = await fetch(url, {
                    method:  'POST',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                if (responce.status !== 200) {
                    throw new Error('Create failed');
                }

                const { data } = await responce.json();

                this.setFetching(false);

                this.setState(({ tasks }) => {
                    const newTasks = [{ added: true, ...data }, ...tasks];

                    this.saveTaskLocal(newTasks);

                    return { tasks: newTasks };
                });

            } catch (error) {
                this.setFetching(false);
                console.error(error);
            }
        }

        async _changeTask (task) {
            try {
                this.setFetching(true);
                const responce = await fetch(url, {
                    method:  'PUT',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Array.isArray(task) ? task: [task]),
                });

                if (responce.status !== 200) {
                    throw new Error('Change failed');
                }

                const { data } = await responce.json();

                this.setFetching(false);

                this.setState(({ tasks }) => {
                    const newTasks = tasks.map((taskOld) => data[data.map((taskNew) => taskNew.id).indexOf(taskOld.id)] || taskOld);

                    this.saveTaskLocal(newTasks);

                    return { tasks: newTasks };
                });
            } catch (error) {
                this.setFetching(false);
                console.error(error);
            }
        }

        async _removeTask (id) {
            try {
                this.setFetching(true);
                const responce = await fetch(`${url}/${id}`, {
                    method:  'DELETE',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                });

                if (responce.status !== 204) {
                    throw new Error('Delete filed');
                }

                this.setFetching(false);

                this.setState(({ tasks }) => {
                    const newTasks = tasks.filter((task) => task.id !== id);

                    this.saveTaskLocal(newTasks);

                    return { tasks: newTasks };
                });
            } catch (error) {
                this.setFetching(false);
                console.error(error);
            }
        }

        render () {

            return (
                <Enchanced
                    { ...this.state }
                    { ...this.props }
                    changeTask = { this.changeTask }
                    createTask = { this.createTask }
                    removeTask = { this.removeTask }
                />
            );
        }
    };
