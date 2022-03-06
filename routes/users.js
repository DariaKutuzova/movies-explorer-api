const router = require('express').Router();
const {
  validationUpdateUser,
} = require('../middlewares/validation');

const {
  patchUser,
  getUserMe,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.patch('/users/me', validationUpdateUser, patchUser);

module.exports = router;
