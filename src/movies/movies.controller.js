const moviesService = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function movieIdExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await moviesService.read(movieId);
  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  return next({ status: 404, message: 'Movie cannot be found.' });
}

async function list(req, res) {
  if (req.query.is_showing) {
    res.send({ data: await moviesService.inTheaters() });
  } else {
    res.send({ data: await moviesService.list() });
  }
}

function read(req, res) {
  res.send({ data: res.locals.movie });
}

async function listTheatersShowing(req, res) {
  const data = await moviesService.listTheatersShowingMovie(
    res.locals.movie.movie_id
  );
  res.send({ data });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieIdExists), read],
  listTheatersShowing: [asyncErrorBoundary(movieIdExists), listTheatersShowing],
};
