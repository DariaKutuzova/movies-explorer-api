const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (request, response, next) => Movie
  .find({})
  .populate('owner')
  .then((movies) => response.send(movies))
  .catch(next);

const deleteMovie = (request, response, next) => {
  Movie.findById(request.params.id)
    .orFail(new NotFoundError(`Карточки не существует`))
    .then((movie) => {
      if (movie.owner.toString() === request.user._id) {
        return movie.remove()
          .then(() => response.send(movie));
      }

      return next(new ForbiddenError('Недостаточно прав для выполнения операции'));
    })
    .catch(next);
};

const createMovie = (request, response, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = request.body;
  console.log(request.body);
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: request.user._id,
  })
    .then((movie) => response.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else next(err);
    });
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
