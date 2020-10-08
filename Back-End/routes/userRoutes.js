const express = require('express');
const userController = require('../controllers/userController');
const multer = require('../middlewares/multer-config');

const userRouter = express.Router();

userRouter.post('/user/register/', multer, userController.register);
userRouter.post('/user/login/', userController.login);

module.exports = userRouter;
