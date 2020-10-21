import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { history } from './../history';
import createSagaMiddleware from 'redux-saga';

const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middleware = [
    routerMiddleware,
    sagaMiddleware
].filter((o) => o);

export { middleware, sagaMiddleware };
