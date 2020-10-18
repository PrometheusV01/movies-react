import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Instruments
import { history } from './history';

const appReducer = combineReducers({
	router: connectRouter(history),
});

export const rootReducer = (state, action) => appReducer(state, action);
