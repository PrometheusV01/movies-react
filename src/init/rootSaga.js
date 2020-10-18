import { all } from 'redux-saga/effects';
// instruments
// import { authWatchers as auth } from 'bus/auth/saga/watchers';
// import { uiWatchers as ui } from 'bus/ui/saga/watchers';

// const mapper = (wathcers) => Object.values(wathcers).map((wathcer) => wathcer());

export function* rootSaga () {
    yield all([
        // ...mapper(auth),
        // ...mapper(ui)
    ]);
}
