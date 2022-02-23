const router = require('express').Router();
const { validationMovie, validationIdMovie } = require('../middlewares/validation');

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/cards');

router.get('/', getMovies);
router.post('/', validationMovie, createMovie);
router.delete('/:movieId', validationIdMovie, deleteMovie);

module.exports = router;
