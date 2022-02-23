const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (request, response, next) => Movie
  .find({})
  .populate('owner')
  .then((movies) => response.status(200).send(movies))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else next(err);
  });

const deleteMovie = (request, response, next) => {
  Movie.findById(request.params.movieId)
    .orFail(new NotFoundError(`Карточки не существует`))
    .then((movie) => {
      // мб это не нужно, посмотреть удалить
      if (movie.owner.toString() !== request.user._id) {
        next(new ForbiddenError('Недостаточно прав для выполнения операции'));
      }
      Movie.findByIdAndDelete(request.params.movieId)
        .then(() => response.status(200).send(movie))
        .catch(next);
    })
    .catch(next);
};

const createMovie = (request, response, next) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = request.body;
  console.log(request.body);
  Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: request.user._id,
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
