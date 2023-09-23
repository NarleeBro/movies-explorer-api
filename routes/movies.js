const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegular } = require('../utils/constants');
const {
  createMovies, getMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegular),
    trailerLink: Joi.string().required().pattern(urlRegular),
    thumbnail: Joi.string().required().pattern(urlRegular),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovies);

module.exports = router;
