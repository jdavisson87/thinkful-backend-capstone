const knex = require('../db/connection');

function list() {
  return knex('movies').select('*');
}

function inTheaters() {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('m.*')
    .where({ 'mt.is_showing': true })
    .groupBy('m.movie_id');
}

function read(movieId) {
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}

function listTheatersShowingMovie(movieId) {
  return knex('movies_theaters as mt')
    .join('theaters as t', 'mt.theater_id', 't.theater_id')
    .select('*')
    .where({ movie_id: movieId, is_showing: true });
}

module.exports = {
  list,
  inTheaters,
  read,
  listTheatersShowingMovie,
};
