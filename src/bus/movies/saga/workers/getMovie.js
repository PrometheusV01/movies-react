import { put, call } from 'redux-saga/effects';

// instruments
import { moviesActions } from 'bus/movies/actions';
import { getMovie } from 'api/methods/movies';
import { uiActions } from 'bus/ui/actions';

const BASE_PATH = ['movies', 'movie', 'get'];

export function* getMovieWorker ({ payload: id }) {

    yield put(uiActions.changeUiLoaderFlag({
        status: { loading: true, error: false, message: null, completed: false },
        path:   BASE_PATH,
    }));

    try {
        const movie = yield call(getMovie, { pathParams: { id }});

        yield put(moviesActions.getMovieSuccess(movie));
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

        yield put(uiActions.changeUiLoaderFlag({ status: true, path: [...BASE_PATH, 'error']}));
        yield put(uiActions.changeUiLoaderFlag({ status: message, path: [...BASE_PATH, 'message']}));
    } finally {
        yield put(uiActions.changeUiLoaderFlag({ status: false, path: [...BASE_PATH, 'loading']}));
        yield put(uiActions.changeUiLoaderFlag({ status: true, path: [...BASE_PATH, 'completed']}));
    }
}
