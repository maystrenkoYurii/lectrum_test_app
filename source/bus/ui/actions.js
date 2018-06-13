import { types } from './types';

export const uiActions = Object.freeze({
    emitError: (error, meta = null) => ({
        type:    types.EMIT_ERROR,
        payload: error,
        error:   true,
        meta,
    }),
    setFetchingState: (state) => ({
        type:    types.SET_FETCHING_STATE,
        payload: state,
    }),
    setEditTaskState: (state) => ({
        type:    types.SET_EDIT_TASK_STATE,
        payload: state,
    }),
});
