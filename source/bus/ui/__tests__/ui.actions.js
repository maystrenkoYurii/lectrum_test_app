import { uiActions } from "../actions";
import { types } from "../types";


describe('tasks actions', () => {
    test('EMIT_ERROR', () => {
        expect(uiActions.emitError({}, {})).toEqual({
            type:    types.EMIT_ERROR,
            payload: {},
            error:   true,
            meta:    {},
        });
    });
    test('SET_FETCHING_STATE', () => {
        expect(uiActions.setFetchingState(undefined)).toEqual({
            type:    types.SET_FETCHING_STATE,
            payload: undefined,
        });
    });
    test('SET_EDIT_TASK_STATE', () => {
        expect(uiActions.setEditTaskState(undefined)).toEqual({
            type:    types.SET_EDIT_TASK_STATE,
            payload: undefined,
        });
    });
    test('SET_SEARCH', () => {
        expect(uiActions.setSearch(undefined)).toEqual({
            type:    types.SET_SEARCH,
            payload: undefined,
        });
    });
});
