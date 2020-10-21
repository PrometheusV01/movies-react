import { all } from 'redux-saga/effects';
// instruments
import { moviesWatchers as movies } from 'bus/movies/saga/watchers';

const mapper = (wathcers) => Object.values(wathcers).map((wathcer) => wathcer());

export function* rootSaga () {
    yield all([
        ...mapper(movies)
    ]);
}
