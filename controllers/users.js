const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { ErrorsCode, Messages } = require('../utils/constants');

const { JWT_SECRET } = process.env;

module.exports.editUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: 'true', runValidators: true },
  )
    .orFail()
    .then((user) => res.status(ErrorsCode.OK).send(user))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError(Messages.UserConflict));
      } else if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(Messages.BadRequest));
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(Messages.UserNotFound));
      } else {
        next(error);
      }
    });
};

module.exports.addUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    email,
    password: hash,
  })
    .then((user) => res.status(ErrorsCode.Created).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError(Messages.UserConflict));
      } else if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(Messages.BadRequest));
      } else {
        next(error);
      }
    }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getMeUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => res.status(ErrorsCode.OK).send(users))
    .catch(next);
};
