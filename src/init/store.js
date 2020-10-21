import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { sagaMiddleware, middleware } from './middleware';


const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnchancers = __DEV__ ? devtools : compose;

const store = createStore(
    rootReducer,
    composeEnchancers(
        applyMiddleware(
            ...middleware
        )
    )
);

sagaMiddleware.run(rootSaga);

export default store;
