const mongoose = require('mongoose');
const { urlRegular } = require('../utils/constants');
const { Messages } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, "Поле 'country' должно быть заполнено!"],
    },
    director: {
      type: String,
      required: [true, "Поле 'director' должно быть заполнено!"],
    },
    duration: {
      type: String,
      required: [true, "Поле 'duration' должно быть заполнено!"],
    },
    year: {
      type: String,
      required: [true, "Поле 'year' должно быть заполнено!"],
    },
    description: {
      type: String,
      required: [true, "Поле 'description' должно быть заполнено!"],
    },
    image: {
      type: String,
      required: [true, 'Поле "image" должно быть заполнено'],
      validate: {
        validator(v) {
          return urlRegular.test(v);
        },
        message: Messages.BadValidator,
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле "trailerLink" должно быть заполнено'],
      validate: {
        validator(v) {
          return urlRegular.test(v);
        },
        message: Messages.BadValidator,
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" должно быть заполнено'],
      validate: {
        validator(v) {
          return urlRegular.test(v);
        },
        message: Messages.BadValidator,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, "Поле 'movieId' должно быть заполнено!"],
    },
    nameRU: {
      type: String,
      required: [true, "Поле 'nameRU' должно быть заполнено!"],
    },
    nameEN: {
      type: String,
      required: [true, "Поле 'nameEN' должно быть заполнено!"],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
