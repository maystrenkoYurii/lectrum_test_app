export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function getFavorite (tasks) {
    return [...tasks.filter((task) => task.favorite)];
}

export function getNotCompleted (tasks) {
    return [...tasks.filter((task) => !task.completed)];
}

export function getAllTask (tasks, usedTask) {
    return [...tasks.filter((task) => !usedTask.includes(task))];
}

export function sortTask (tasks) {
    let notCompleted = getNotCompleted(tasks);
    let completed = getAllTask(tasks, notCompleted);
    const notCompletedFavorite = getFavorite(notCompleted);
    const completedFavorite = getFavorite(completed);

    notCompleted = getAllTask(notCompleted, notCompletedFavorite);
    completed = getAllTask(completed, completedFavorite);

    return [...notCompletedFavorite, ...notCompleted, ...completedFavorite, ...completed];
}

export function searchTask (tasks, search) {
    return [...tasks.filter((task) => task.message.includes(search.toLocaleLowerCase() || search.toLocaleUpperCase()))];
}

export function getCheckedCompletedAll (tasks) {
    return tasks.filter((task) => task.completed).length === tasks.length;
}
