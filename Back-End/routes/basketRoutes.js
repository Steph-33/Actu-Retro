const express = require('express');
const basketController = require('../controllers/basketController');
const userController = require('../controllers/userController');

const basketRouter = express.Router();

// Route pour récupérer le panier de produits
basketRouter.get('/baskets/:id', basketController.getBasketById);

// Route pour créer le panier de produits
basketRouter.post('/baskets', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    basketController.addBasket(request, response, userSession);
  });
});

// Route pour mettre à jour le panier de produits
basketRouter.put('/baskets/:id', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    basketController.updateBasket(request, response, userSession);
  });
});

// Route pour effacer un panier de produits
basketRouter.delete('/baskets', (request, response) => {
  let userSession = {};
  userController.getUserSession(request, response, (userInfos) => {
    userSession = userInfos;
    basketController.deleteBasket(request, response, userSession);
  });
});

module.exports = basketRouter;
