const { Messages } = require('../utils/constants');

const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500
      ? Messages.InternalServerError
      : message,
  });
  next();
};

module.exports = errorHandler;
