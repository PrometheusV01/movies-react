import { put, call, select } from 'redux-saga/effects';

// instruments
import { moviesActions } from 'bus/movies/actions';
import { searchMovies } from 'api/methods/movies';
import { uiActions } from 'bus/ui/actions';

export function* searchMoviesWorker () {
    const { values, page, order } = yield select(({ movies }) => ({
        values: movies.getIn(['search', 'values']),
        page:   movies.getIn(['search', 'page']),
        order:  movies.getIn(['search', 'order']),
    }));

    yield put(uiActions.changeUiLoaderFlag({
        status: { loading: true, error: false, message: null, completed: false },
        path:   ['movies', 'search'],
    }));

    try {
        const results = yield call(searchMovies, { bodyParams: { filters: values, page, order }});

        yield put(moviesActions.searchMoviesSuccess(results));
    } catch (error) {
        const { status } = error.msg || {};

        let message = null;

        switch (status) {
            case 404: {
                message = 'Error. Page not found';
                break;
            }
            default: message = 'Server error';
        }

        yield put(uiActions.changeUiLoaderFlag({ status: true, path: ['movies', 'search', 'error']}));
        yield put(uiActions.changeUiLoaderFlag({ status: message, path: ['movies', 'search', 'message']}));
    } finally {
        yield put(uiActions.changeUiLoaderFlag({ status: false, path: ['movies', 'search', 'loading']}));
        yield put(uiActions.changeUiLoaderFlag({ status: true, path: ['movies', 'search', 'completed']}));
    }
}
