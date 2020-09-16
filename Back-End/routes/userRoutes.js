const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/user/register/', userController.register);
userRouter.post('/user/login/', userController.login);

module.exports = userRouter;
