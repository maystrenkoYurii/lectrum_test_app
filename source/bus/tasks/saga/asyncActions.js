import { asyncTypes } from "./asyncTypes";

export const postsActionsAsync = Object.freeze({
    createTaskAsync: (comment) => ({
        type:    asyncTypes.CREATE_TASK_ASYNC,
        payload: comment,
    }),
    removeTaskAsync: (id) => ({
        type:    asyncTypes.REMOVE_TASK_ASYNC,
        payload: id,
    }),
});
