import { combineReducers } from 'redux';

import { tasksReducer as tasks } from '../bus/tasks/reducers';
import { uiReducer as ui } from '../bus/ui/reducers';

export const rootReducer = combineReducers({
    ui,
    tasks,
});
