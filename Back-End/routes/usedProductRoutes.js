const express = require('express');
const usedProductController = require('../controllers/usedProductController');
const jwtUtils = require('../utils/jwt.utils')
const multer = require('../middlewares/multer-config');

const usedProductRouter = express.Router();

// Récupérer un produit d'occasion par son id
usedProductRouter.get(
  '/usedproducts/:id',
  usedProductController.getUsedProductById
);

// Récupération de l'ensemble des produits d'occasion
usedProductRouter.get(
  '/usedproducts',
  usedProductController.getAllUsedProducts
);

// Récupération des produits d'occasion avec une limite de nombre
usedProductRouter.get('/allusedproducts/:limit', usedProductController.getAllUsedProducts);

// Ajout d'un produit d'occasion
usedProductRouter.post('/usedproducts', jwtUtils.authenticateJWT, multer, async (request, response) => {
  console.log("request.user",request.user);
  const userId = request.user.userId;
  usedProductController.addUsedProduct(request, response, userId);
});

// Mise à jour d'un produit d'occasion
usedProductRouter.put('/usedproducts/:id', jwtUtils.authenticateJWT, multer, async (request, response) => {
  console.log("request.user",request.user);
  const userId = request.user.userId;
  usedProductController.updateUsedProduct(request, response, userId);
});

// Suppression d'un produit d'occasion
usedProductRouter.delete('/usedproducts/:id', jwtUtils.authenticateJWT, async(request, response) => {
  const userId = request.user.userId;
  usedProductController.deleteUsedProduct(request, response, userId);
});

module.exports = usedProductRouter;
