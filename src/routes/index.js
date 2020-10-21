import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

//components
import { MainLayout } from 'layouts/main';

//instruments
import book from './book';

export default hot(() => {
    return (
        <MainLayout>
            <Switch>
                <Route exact path = '/' render = { () => <Redirect to = { book.main.path } /> } />
                { Object.keys(book).map((name) => {
                    const { path, key, page: Page, exact } = book[name];

                    return (
                        <Route
                            exact = { exact }
                            key = { key }
                            path = { path }
                            render = { () => <Page /> }
                        />
                    );
                }) }
            </Switch>
        </MainLayout>
    );
});
