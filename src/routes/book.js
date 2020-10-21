//pages
import MainPage from 'pages/main';
import MoviePage from 'pages/movie';

export default Object.freeze({
    main: {
        path:  '/movies',
        page:  MainPage,
        key:   'main',
        exact: true,
    },
    movie: {
        path:  '/movies/:id',
        page:  MoviePage,
        key:   'movie',
        exact: true,
    },
});
