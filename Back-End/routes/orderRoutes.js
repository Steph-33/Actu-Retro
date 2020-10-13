const express = require('express');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const jwtUtils = require('../utils/jwt.utils')

const orderRouter = express.Router();

// Route pour récupérer la commande
orderRouter.get('/orders/:id', jwtUtils.authenticateJWT, (request, response) => {
  const userId = request.user.userId;
  orderController.getOrderById(request, response, userId);
});

// Route pour créer la commande
orderRouter.post('/orders', jwtUtils.authenticateJWT, async (request, response) => {
  const userId = request.user.userId;
  orderController.addOrder(request, response, userId);
});

module.exports = orderRouter;
