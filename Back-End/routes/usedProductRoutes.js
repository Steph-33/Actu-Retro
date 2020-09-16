const express = require('express');
const usedProductController = require('../controllers/usedProductController');
const userController = require('../controllers/userController');

const usedProductRouter = express.Router();

usedProductRouter.get(
  '/usedproducts/:id',
  usedProductController.getUsedProductById
);
usedProductRouter.get(
  '/usedproducts',
  usedProductController.getAllUsedProducts
);
usedProductRouter.post('/usedproducts', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    usedProductController.addUsedProduct(request, response, userSession);
  });
});

module.exports = usedProductRouter;
