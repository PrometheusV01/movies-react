import React, { memo, useMemo, useCallback } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

//instruments
import { moviesActions as actions } from 'bus/movies/actions';

const OPTIONS = [
    { icon: 'sort alphabet down', text: 'Sort by alphabet', value: 'asc' },
    { icon: 'sort alphabet up', text: 'Sort by alphabet', value: 'desc' }
];

export const SortDropdown = memo(() => {
    const { order } = useSelector((state) => ({
        order: state.movies.getIn(['search', 'order']),
    }), shallowEqual);
    const sortOption = useMemo(() => OPTIONS.find(({ value }) => value === order), [order]);

    //methods
    const dispatch = useDispatch();

    const handleChange = useCallback((...[, { value }]) => {
        dispatch(actions.setMoviesOrder(value));
        dispatch(actions.searchMovies());
    }, []);

    return (
        <Dropdown
            floating
            direction = 'left'
            icon = 'chevron down'
            options = { OPTIONS }
            pointing = 'top left'
            trigger = {
                <span>
                    <Icon name = { sortOption.icon } />
                    <span>{ sortOption.text }</span>
                </span>
            }
            value = { order }
            onChange = { handleChange }
        />
    );
});
