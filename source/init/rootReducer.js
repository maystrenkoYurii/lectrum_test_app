import { combineReducers } from 'redux';

import { tasksReducer as tasks } from '../bus/tasks/reducers';
import { uiReducer as ui } from '../bus/ui/reducers';
import { formReducer as forms } from '../bus/forms/reducers';

export const rootReducer = combineReducers({
    ui,
    tasks,
    forms,
});
