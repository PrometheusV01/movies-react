import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Instruments
import { history } from './history';

//reducers
import movies from 'bus/movies/reducer';
import ui from 'bus/ui/reducer';

const appReducer = combineReducers({
    router: connectRouter(history),
    movies,
    ui,
});

export const rootReducer = (state, action) => appReducer(state, action);
