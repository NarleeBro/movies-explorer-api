const router = require('express').Router();
const { login, addUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { loginValidator, addUserValidator } = require('../utils/validation');
const { Messages } = require('../utils/constants');

router.use('/signup', addUserValidator, addUser);
router.use('/signin', loginValidator, login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(Messages.PageNotFound));
});

module.exports = router;
