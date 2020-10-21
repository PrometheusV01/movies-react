import { Map } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';

// instruments
import { moviesActions as actions } from './actions';

const initialState = Map({
    search: {
        results: {
            movies: [],
            limit:  null,
            count:  null,
        },
        values: null,
        page:   null,
        order:  'asc',
    },

    movie: null,

    addModal: false,
});

export default handleActions({
    [actions.setAddModal]:         (state, { payload: bool }) => state.set('addModal', bool),
    [actions.searchMoviesSuccess]: (state, { payload: results }) => state.setIn(['search', 'results'], results),
    [actions.setMoviesPage]:       (state, { payload: page }) => state.setIn(['search', 'page'], page),
    [actions.setMoviesValues]:     (state, { payload: values }) => state.setIn(['search', 'values'], values),
    [actions.setMoviesOrder]:      (state, { payload: order }) => state.setIn(['search', 'order'], order),

    [combineActions(
        actions.getMovieSuccess,
        actions.deleteMovieSuccess,
        actions.clearMovie)
    ]: (state, { payload: movie }) => state.set('movie', movie),

}, initialState);
