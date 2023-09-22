const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

module.exports.getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Фильм другого пользователя!');
      }
      Movie.deleteOne(movie)
        .orFail()
        .then(() => {
          res.status(200).send({ message: 'Фильм удален' });
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.DocumentNotFoundError) {
            next(
              new NotFoundError(
                `Фильм с _id: ${req.params.movieId} не найдена.`,
              ),
            );
          } else if (error instanceof mongoose.Error.CastError) {
            next(
              new BadRequestError(
                `Некорректный _id фильма: ${req.params.movieId}`,
              ),
            );
          } else {
            next(error);
          }
        });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        next(
          new NotFoundError(`Фильм с _id: ${req.params.movieId} не найден.`),
        );
      } else {
        next(error);
      }
    });
};
