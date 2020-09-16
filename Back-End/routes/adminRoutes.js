const express = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = express.Router();

adminRouter.post('/admin/register/', adminController.register);
adminRouter.post('/admin/login/', adminController.login);

module.exports = adminRouter;
