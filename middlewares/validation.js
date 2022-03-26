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
    id: Joi.string().required().hex().length(24),
  }),
});

const validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
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
    nameRU: Joi.string().min(2).max(200).required(),
    nameEN: Joi.string().min(2).max(200).required(),
    country: Joi.string().min(2).max(100).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(1500).required(),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.number().integer().required(),
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
