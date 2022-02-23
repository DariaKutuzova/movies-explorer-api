const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require("../errors/NotFoundError");

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((res, req, next) => {
  next(new NotFoundError('Страницы не существует'));
});
module.exports = router;
