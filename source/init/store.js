import { createStore, applyMiddleware, compose } from 'redux';
import { sagaMiddleware, dev, middleware } from './middleware';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = dev && devtools ? devtools : compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);
