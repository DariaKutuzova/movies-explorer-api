const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require("../errors/BadRequestError");

const validationUrl = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Невалидный URL');
  }
  return value;
};

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationIdMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

const validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationMovie = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().min(2).max(30),
    nameEN: Joi.string().min(2).max(30),
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number(),
    year: Joi.string().min(2).max(30),
    description: Joi.string().min(2).max(200),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validationLogin,
  validationUser,
  validationIdMovie,
  validationUpdateUser,
  validationMovie,
  validationUrl,
};
