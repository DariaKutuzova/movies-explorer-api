const router = require('express').Router();
const {
  validationLogin,
  validationUser,
} = require('../middlewares/validation');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', validationLogin, login);
router.post('/signup', validationUser, createUser);

module.exports = router;
