const express = require('express');
const adminController = require('../controllers/adminController');
const jwtUtils = require('../utils/jwt.utils');
const { OK } = require('../utils/status_codes')

const adminRouter = express.Router();

adminRouter.get('/admin/me/', jwtUtils.authenticateJWT, async (request, response) => {
  const admin = await adminController.getAdministratorById(request.user.adminId);
    response.status(OK).json(admin);
  });

adminRouter.post('/admin/register/', adminController.register);
adminRouter.post('/admin/login/', adminController.login);

module.exports = adminRouter;
