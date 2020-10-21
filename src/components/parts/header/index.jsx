import React, { useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

//instruments
import book from 'routes/book';
import { moviesActions as actions } from 'bus/movies/actions';


//styles
import Styles from './styles.scss';

const PAGES = [
    {
        text: 'Main',
        url:  book.main.path,
    }
];

export const Header = () => {
    const dispatch = useDispatch();

    const handleOpenModal = useCallback(() => dispatch(actions.setAddModal(true)), []);

    return (
        <header className = { Styles.root }>
            <Link className = { Styles.logo } to = { book.main.path } >MoviesStore</Link>
            <nav className = { Styles.nav } >
                { PAGES.map(({ text, url }, idx) => {
                    return (
                        <NavLink
                            activeClassName = { Styles.active }
                            className = { Styles.navItem }
                            key = { idx }
                            to = { url }>
                            { text }
                        </NavLink>
                    );
                }) }
            </nav>
            <Button inverted color = 'violet' content = 'Add movie' onClick = { handleOpenModal } />
        </header>
    );
};
