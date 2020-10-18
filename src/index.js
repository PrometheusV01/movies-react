// Core
import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

//Instruments
import store from 'init/store';
import { history } from 'init/history';

// css
import 'semantic-ui-css/semantic.min.css';
import 'assets/styles/global.scss';

const root = document.getElementById('root');

render(
    <Provider store = { store }>
        <ConnectedRouter history = { history }>
            <div>Hello</div>
        </ConnectedRouter>
    </Provider>,
    root
);
