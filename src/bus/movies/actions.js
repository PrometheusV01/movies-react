import { createActions } from 'redux-actions';

export const moviesActions = createActions({
    SET_ADD_MODAL: (bool) => bool,

    SEARCH_MOVIES:         () => void 0,
    SEARCH_MOVIES_SUCCESS: (results) => results,
    SEARCH_MOVIES_FAIL:    (error) => error,

    SET_MOVIES_PAGE:   (page) => page,
    SET_MOVIES_VALUES: (values) => values,
    SET_MOVIES_ORDER:  (order) => order,

    GET_MOVIE:         (id) => id,
    GET_MOVIE_SUCCESS: (movie) => movie,
    GET_MOVIE_FAIL:    (error) => error,

    DELETE_MOVIE:         (id) => id,
    DELETE_MOVIE_SUCCESS: () => null,
    DELETE_MOVIE_FAIL:    (error) => error,

    CLEAR_MOVIE: () => null,

    CREATE_MOVIE:         (values, formik) => ({ values, formik }),
    CREATE_MOVIE_SUCCESS: (movie) => movie,
    CREATE_MOVIE_FAIL:    (error) => error,

}, { prefix: 'MOVIES' });
