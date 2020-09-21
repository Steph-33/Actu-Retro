const express = require('express');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

const orderRouter = express.Router();

// Route pour récupérer la commande
orderRouter.get('/orders/:id', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    orderController.getOrderById(request, response, userSession);
  });
});

// Route pour créer la commande
orderRouter.post('/orders', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    orderController.addOrder(request, response, userSession);
  });
});

// Route pour mettre à jour la commande
orderRouter.put('/orders/:id', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    orderController.updateOrder(request, response, userSession);
  });
});

// Route pour effacer la commande
orderRouter.delete('/orders', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    orderController.deleteOrder(request, response, userSession);
  });
});

module.exports = orderRouter;
