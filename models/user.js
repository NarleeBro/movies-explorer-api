const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const { Messages } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля - 2'],
      maxlength: [30, 'Масимальная длина поля - 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      unique: true,
      validate: {
        validator(email) {
          return /^\S+@\S+\.\S+$/.test(email);
        },
        message: Messages.BadValidatorEmail,
      },
    },
    password: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthorizedError(Messages.Unauthorized);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnAuthorizedError(Messages.Unauthorized);
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
