import { put, call } from 'redux-saga/effects';
import { replace } from 'connected-react-router';

// instruments
import { moviesActions } from 'bus/movies/actions';
import { deleteMovie } from 'api/methods/movies';
import { uiActions } from 'bus/ui/actions';
import book from 'routes/book';


const BASE_PATH = ['movies', 'movie', 'delete'];

export function* deleteMovieWorker ({ payload: id }) {

    yield put(uiActions.changeUiLoaderFlag({
        status: { loading: true, error: false, message: null, completed: false },
        path:   BASE_PATH,
    }));

    try {
        yield call(deleteMovie, { pathParams: { id }});

        yield put(replace(book.main.path));
        // yield put(moviesActions.deleteMovieSuccess());
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
