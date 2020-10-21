// instruments
import BaseApiClass from 'api/BaseApiClass';

export const searchMovies = (params = {}) => new BaseApiClass({
    url:    'movies/search',
    method: 'POST',
    ...params,
})._load();

export const getMovie = (params = {}) => new BaseApiClass({
    url:    'movies/{:id}',
    method: 'GET',
    ...params,
})._load();

export const deleteMovie = (params = {}) => new BaseApiClass({
    url:    'movies/{:id}',
    method: 'DELETE',
    ...params,
})._load();

export const createMovie = (params = {}) => new BaseApiClass({
    url:    'movies',
    method: 'POST',
    ...params,
})._load();
