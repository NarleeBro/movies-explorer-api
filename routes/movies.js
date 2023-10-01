const router = require('express').Router();
const {
  createMovies, getMovie, deleteMovie,
} = require('../controllers/movies');
const { createMoviesValidator, deleteMovieValidator } = require('../utils/validation');

router.get('/', getMovie);

router.delete('/:movieId', deleteMovieValidator, deleteMovie);

router.post('/', createMoviesValidator, createMovies);

module.exports = router;
