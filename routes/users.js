const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { emailRegular } = require("../utils/constants");
const { editUserData, getMeUser } = require("../controllers/users");

router.get("/me", getMeUser);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      email: Joi.string()
        .pattern(emailRegular)
        .required()
    })
  }),
  editUserData
);

module.exports = router;
