const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { addUser } = require('../controllers/users');
const { emailRegular } = require('../utils/constants');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(emailRegular),
    password: Joi.string().required().min(3),
  }),
}), addUser);

module.exports = router;
