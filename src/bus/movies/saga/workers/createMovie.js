import { call, put } from 'redux-saga/effects';

// instruments
import { moviesActions } from 'bus/movies/actions';
import { createMovie } from 'api/methods/movies';

export function* createMovieWorker ({ payload }) {
    const { values, formik } = payload;

    try {
        const movie = yield call(createMovie, { bodyParams: values });

        yield put(moviesActions.createMovieSuccess(movie));
        yield call(formik.resetForm);
        yield call(formik.setStatus, { success: true, message: 'Movie is created' });
    } catch (error) {
        const { status } = error.msg || {};

        let message = null;

        switch (status) {
            case 400: {
                message = 'Validation error';

                break;
            }
            default: message = 'Server error';
        }

        yield call(formik.setStatus, { error: true, message });
        yield put(moviesActions.createMovieFail(error));
    } finally {
        yield call(formik.setSubmitting, false);
    }
}
