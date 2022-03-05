const router = require('express').Router();
const NotFoundError = require("../errors/NotFoundError");
const auth = require("../middlewares/auth");

router.use(require('./sign'));

router.use(auth);
router.use(require('./users'));
router.use(require('./movies'));

router.use((res, req, next) => {
  next(new NotFoundError('Страницы не существует'));
});
module.exports = router;
