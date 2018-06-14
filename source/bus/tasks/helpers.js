import { fromJS } from 'immutable';

export function fetchTask (task) {
    const tasks = fromJS(task);

    localStorage.setItem('tasks', JSON.stringify(tasks.toJS()));

    return tasks;
}

export function createTask (state, task) {
    const tasks = state.unshift(fromJS(task));

    localStorage.setItem('tasks', JSON.stringify(tasks.toJS()));

    return tasks;
}

export function removeTask (state, id) {
    const tasks = state.filter((taskOld) => taskOld.get('id') !== id);

    localStorage.setItem('tasks', JSON.stringify(tasks.toJS()));

    return tasks;
}

export function changeTask (state, task) {
    const tasks = state.map((taskOld) =>
        fromJS(task[fromJS(task).map((taskNew) =>
            taskNew.get('id')).indexOf(taskOld.get('id'))]) || taskOld);

    localStorage.setItem('tasks', JSON.stringify(tasks.toJS()));

    return tasks;
}
