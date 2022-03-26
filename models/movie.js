const mongoose = require('mongoose');
const { validationUrl } = require("../middlewares/validation");

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 200,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 200,
  },
  country: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 100,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1500,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validationUrl,
      message: 'Поле link не прошло валидацию',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: validationUrl,
      message: 'Поле link не прошло валидацию',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validationUrl,
      message: 'Поле link не прошло валидацию',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  //  id подправить, когда будет серв с фильмами
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
