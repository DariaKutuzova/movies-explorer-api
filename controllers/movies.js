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
  // eslint-disable-next-line func-names
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail,
  } = request.body;
  console.log(request.body);
  Movie.create({
    // eslint-disable-next-line func-names
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, owner: request.user._id,
  })
    .then((movie) => response.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else next(err);
    });
};

// const setLike = (request, response, next) => {
//   Card.findByIdAndUpdate(
//     request.params.cardId,
//     { $addToSet: { likes: request.user._id } }, // добавить _id в массив, если его там нет
//     { new: true },
//   )
//     .then((card) => {
//       if (!card) {
//         next(new NotFoundError('Карточка не найдена'));
//       }
//       return response.status(200).send(card);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError(`${Object.values(err.errors)
//         .map((error) => error.message).join(', ')}`));
//       } else if (err.message === 'NotFound') {
//         next(new NotFoundError('Передан несуществующий _id карточки.'));
//       } else next(err);
//     });
// };
//
// const deleteLike = (request, response, next) => {
//   console.log(request.user);
//
//   Card.findByIdAndUpdate(
//     request.params.cardId,
//     { $pull: { likes: request.user._id } }, // убрать _id из массива
//     { new: true },
//   )
//     .orFail(() => new NotFoundError('Карточка не найдена'))
//     .then((card) => response.status(200).send(card))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError(`${Object.values(err.errors)
//         .map((error) => error.message).join(', ')}`));
//       } else next(err);
//     });
// };

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
  // setLike,
  // deleteLike,
};
