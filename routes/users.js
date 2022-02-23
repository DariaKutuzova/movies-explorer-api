const router = require('express').Router();
const {
  validationUpdateUser,
} = require('../middlewares/validation');

const {
  patchUser,
  getUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', validationUpdateUser, patchUser);

module.exports = router;
