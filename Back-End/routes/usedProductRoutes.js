const express = require('express');
const usedProductController = require('../controllers/usedProductController');
const userController = require('../controllers/userController');
const jwtUtils = require('../utils/jwt.utils')
const multer = require('../middlewares/multer-config');

const usedProductRouter = express.Router();

usedProductRouter.get(
  '/usedproducts/:id',
  usedProductController.getUsedProductById
);
usedProductRouter.get(
  '/usedproducts',
  usedProductController.getAllUsedProducts
);
usedProductRouter.get('/allusedproducts/:limit', usedProductController.getAllUsedProducts);

usedProductRouter.post('/usedproducts', jwtUtils.authenticateJWT, multer, async (request, response) => {
  console.log("request.user",request.user);
  const userId = request.user.userId;
  usedProductController.addUsedProduct(request, response, userId);
});

usedProductRouter.put('/usedproducts/:id', jwtUtils.authenticateJWT, multer, async (request, response) => {
  console.log("request.user",request.user);
  const userId = request.user.userId;
  usedProductController.updateUsedProduct(request, response, userId);
});

usedProductRouter.delete('/usedproducts/:id', jwtUtils.authenticateJWT, async(request, response) => {
  const userId = request.user.userId;
  usedProductController.deleteUsedProduct(request, response, userId);
});

module.exports = usedProductRouter;
