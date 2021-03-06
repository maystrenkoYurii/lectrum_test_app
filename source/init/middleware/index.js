import { createLogger } from 'redux-logger';

import createSagaMiddleware from 'redux-saga';

export const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

export const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const dev = process.env.NODE_ENV === 'development';

if (dev) {
    middleware.push(logger);
}

export { dev, middleware };
