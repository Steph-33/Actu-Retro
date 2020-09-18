const express = require('express');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

const orderRouter = express.Router();

// Route pour récupérer le panier de produits
orderRouter.get('/orders/:id', orderController.getOrderById);

// Route pour créer le panier de produits
orderRouter.post('/orders', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    orderController.addOrder(request, response, userSession);
  });
});

// Route pour mettre à jour le panier de produits
orderRouter.put('/orders/:id', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    orderController.updateOrder(request, response, userSession);
  });
});

// Route pour effacer un panier de produits
orderRouter.delete('/orders', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    orderController.deleteOrder(request, response, userSession);
  });
});

module.exports = orderRouter;
