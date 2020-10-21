import { takeEvery } from 'redux-saga/effects';


//instruments
import { moviesActions as actions } from 'bus/movies/actions';
import { searchMoviesWorker } from './workers/searchMovies';
import { getMovieWorker } from './workers/getMovie';
import { deleteMovieWorker } from './workers/deleteMovie';
import { createMovieWorker } from './workers/createMovie';

export const moviesWatchers = Object.freeze({
    * searchMoviesWatcher () {
        yield takeEvery([actions.searchMovies, actions.createMovie], searchMoviesWorker);
    },
    * getMovieWatcher () {
        yield takeEvery(actions.getMovie, getMovieWorker);
    },
    * deleteMovieWatcher () {
        yield takeEvery(actions.deleteMovie, deleteMovieWorker);
    },
    * createMovieWatcher () {
        yield takeEvery(actions.createMovie, createMovieWorker);
    },

});
