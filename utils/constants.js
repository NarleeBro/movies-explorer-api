const urlRegular = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const emailRegular = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const ErrorsCode = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  Conflict: 409,
  InternalServerError: 500,
};

const Messages = {
  Unauthorized: 'Неправильные почта или пароль',
  BadRequest: 'Некорректный _id фильма',
  MovieNotFound: 'Фильм с _id не найден.',
  MovieForbiddenError: 'Фильм другого пользователя!',
  UserConflict: 'Пользователь с таким email уже зарегистрирован',
  UserNotFound: 'Пользователь по указанному _id не найден',
  PageNotFound: 'Страница не найдена',
  InternalServerError: 'Внутренняя ошибка сервера',
  BadValidator: 'Введите URL',
  BadValidatorEmail: 'Введите верный email',
};

module.exports = {
  urlRegular, emailRegular, ErrorsCode, Messages,
};
