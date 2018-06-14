import { asyncTypes } from "./asyncTypes";

export const postsActionsAsync = Object.freeze({
    createTaskAsync: (comment) => ({
        type:    asyncTypes.CREATE_TASK_ASYNC,
        payload: comment,
    }),
    changeTaskAsync: (task) => ({
        type:    asyncTypes.CHANGE_TASK_ASYNC,
        payload: task,
    }),
    removeTaskAsync: (id) => ({
        type:    asyncTypes.REMOVE_TASK_ASYNC,
        payload: id,
    }),
});
