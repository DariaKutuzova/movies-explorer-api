const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require("../errors/BadRequestError");
// const mongoose = require("mongoose");

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

// const validationIdUser = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().alphanum().length(24),
//   }),
// });

const validationIdMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

// const validationUser = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(20),
//     avatar: Joi.string().custom(validationUrl),
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// });

// const validationLogin = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// });

const validationMovie = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().min(2).max(30),
    nameEN: Joi.string().min(2).max(30),
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number().min(2).max(30),
    year: Joi.string().min(2).max(30),
    description: Joi.string().min(2).max(200),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.string().alphanum().length(24),
  }),
});

// function validationLink(v) {
//   return /^(https?:\/\/)?(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?$/.test(v);
// }

module.exports = {
  // validationLogin,
  // validationUser,
  // validationIdUser,
  validationIdMovie,
  validationUpdateUser,
  validationMovie,
  // validationLink,
  validationUrl,
};
