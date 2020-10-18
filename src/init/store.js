import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { sagaMiddleware } from './middleware';


const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnchancers = __DEV__ ? devtools : compose;

const store = createStore(
    rootReducer,
    composeEnchancers(
        applyMiddleware(
            sagaMiddleware
        )
    )
);

sagaMiddleware.run(rootSaga);

export default store;
