import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
// import { uiActions } from '@otpusk/tourscaner/dist/bus/ui/actions';

// instruments
import { uiActions as actions } from './actions';

const initialState = Map({
    movies: {
        search: { loading: false, error: false, message: null, completed: false },
        movie:  {
            get:    { loading: false, error: false, message: null, completed: false },
            delete: { loading: false, error: false, message: null, completed: false },
        },
    },

});

export default handleActions({
    [actions.changeUiLoaderFlag]: (state, { payload }) => {
        const { path, status } = payload;

        return state.setIn(path, status);
    },
}, initialState);
