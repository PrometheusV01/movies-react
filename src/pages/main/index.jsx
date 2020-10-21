import React, { useMemo, useCallback } from 'react';
import { Pagination, Segment, Grid, Message } from 'semantic-ui-react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link, generatePath } from 'react-router-dom';

//components
import { SearchMoviesForm } from 'components/forms/searchMovies';
import { moviesActions as actions } from 'bus/movies/actions';
import { SortDropdown } from './controls/sortDropdown';

//instruments
import book from 'routes/book';

//styles
import Styles from './styles.scss';

export default () => {
    const { ui, results, page } = useSelector((state) => ({
        ui:      state.ui.getIn(['movies', 'search']),
        results: state.movies.getIn(['search', 'results']),
        page:    state.movies.getIn(['search', 'page']),
    }), shallowEqual);
    const { movies, count, limit } = results;

    const totalPages = useMemo(() => Math.ceil(count / limit), [count, limit]);
    const isShowPagination = useMemo(() => Boolean(totalPages && totalPages > 1), [totalPages]);

    //methods
    const dispatch = useDispatch();

    const handleChangePage = useCallback((...[, { activePage }]) => {
        dispatch(actions.setMoviesPage(activePage));
        dispatch(actions.searchMovies());
    }, []);

    return (
        <div className = { Styles.root } >
            <h2 className = { 'page-title' } >Movies list</h2>
            <Segment basic loading = { ui.loading } >

                <Grid>
                    <Grid.Row>
                        <Grid.Column width = { 6 } >
                            <SearchMoviesForm />
                        </Grid.Column>
                        <Grid.Column width = { 10 } >
                            { ui.error && <Message error content = { ui.message } /> }
                            { ui.completed && !ui.error && (
                                <>
                                    { !movies.length && <Message warning content = { 'Movies not found' } /> }
                                    { Boolean(movies.length) && (
                                        <div>
                                            <SortDropdown />
                                            <ul className = { Styles.list } >
                                                { movies.map(({ title, _id, stars }) => {
                                                    return (
                                                        <li className = { Styles.listItem } key = { _id } >
                                                            <Link to = { generatePath(book.movie.path, { id: _id }) } >
                                                                { title }: { stars }
                                                            </Link>
                                                        </li>
                                                    );
                                                }) }
                                            </ul>
                                            { isShowPagination && (
                                                <Pagination
                                                    boundaryRange = { 0 }
                                                    defaultActivePage = { page }
                                                    ellipsisItem = { null }
                                                    firstItem = { null }
                                                    lastItem = { null }
                                                    siblingRange = { 1 }
                                                    totalPages = { totalPages }
                                                    onPageChange = { handleChangePage }
                                                />
                                            ) }
                                        </div>
                                    ) }
                                </>
                            ) }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </div>
    );
};
