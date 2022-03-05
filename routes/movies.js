const router = require('express').Router();
const { validationMovie, validationIdMovie } = require('../middlewares/validation');

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validationMovie, createMovie);
router.delete('/movies/:movieId', validationIdMovie, deleteMovie);

module.exports = router;
