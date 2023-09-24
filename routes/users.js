const router = require('express').Router();
const { editUserData, getMeUser } = require('../controllers/users');
const { editUserDataValidator } = require('../utils/validation');

router.get('/me', getMeUser);

router.patch('/me', editUserDataValidator, editUserData);

module.exports = router;
