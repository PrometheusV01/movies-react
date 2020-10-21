import React, { useEffect, useCallback } from 'react';
import { Button, Loader, Message } from 'semantic-ui-react';
import { matchPath } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

//instruments
import { moviesActions as actions } from 'bus/movies/actions';
import { uiActions } from 'bus/ui/actions';
import book from 'routes/book';

//styles
import Styles from './styles.scss';

const DELETE_PATH = ['movies', 'movie', 'delete'];

export default () => {
    const { ui, deleteUi, movie } = useSelector((state) => ({
        ui:       state.ui.getIn(['movies', 'movie', 'get']),
        deleteUi: state.ui.getIn(['movies', 'movie', 'delete']),
        movie:    state.movies.get('movie'),
    }), shallowEqual);
    const { params: { id }} =  matchPath(window.location.pathname, { path: book.movie.path, exact: true });

    //methods
    const dispatch = useDispatch();

    const handleDelete = useCallback(() => dispatch(actions.deleteMovie(id)), []);

    useEffect(() => {
        dispatch(actions.getMovie(id));

        return () => {
            dispatch(actions.clearMovie());
            dispatch(uiActions.changeUiLoaderFlag({
                status: { loading: false, error: false, message: null, completed: false },
                path:   DELETE_PATH,
            }));
        };
    }, []);

    return (
        <div className = { Styles.root } >
            { ui.loading && <Loader active inline = 'centered' /> }
            { ui.error && <Message error content = { ui.message } /> }
            { ui.completed && !ui.error && movie && (
                <>
                    <h2 className = { 'page-title' } >{ movie.title }</h2>
                    <div className = { Styles.wrapper } >
                        <div className = { Styles.card } >
                            <ul>
                                <li><b>Release year</b> <span>{ movie.releaseYear }</span></li>
                                <li><b>Format</b> <span>{ movie.format }</span></li>
                                <li><b>Starts</b> <span>{ movie.stars }</span></li>
                            </ul>
                            <div className = { Styles.deleteBlock } >
                                <Button
                                    inverted
                                    color = 'red'
                                    content = 'Delete'
                                    disabled = { deleteUi.loading }
                                    icon = 'trash'
                                    loading = { deleteUi.loading }
                                    onClick = { handleDelete }
                                />
                                { deleteUi.error && <Message error content = { ui.message } /> }
                            </div>
                        </div>
                    </div>
                </>
            ) }
        </div>
    );
};
