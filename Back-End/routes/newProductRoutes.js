const express = require('express');
const newProductController = require('../controllers/newProductController');
const adminController = require('../controllers/adminController');
const multer = require('../middlewares/multer-config');

const newProductRouter = express.Router();

// Récupération d'un produit neuf par son id
newProductRouter.get(
  '/newproducts/:id',
  newProductController.getNewProductById
);

// Récupération de la totalité des produits neufs
newProductRouter.get('/newproducts/', newProductController.getAllNewProducts);

// Récupération des produits limité à un nombre
newProductRouter.get('/allnewproducts/:limit', newProductController.getAllNewProducts);

// Ajout d'un nouveau produit
newProductRouter.post('/newproducts', multer, (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    newProductController.addNewProduct(request, response, adminSession);
  });
});

// Mise à jour d'un nouveau produit
newProductRouter.put('/newproducts/:id', multer, (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    newProductController.updateNewProduct(request, response, adminSession);
  });
});

// Suppression d'un nouveau produit
newProductRouter.delete('/newproducts/:id', (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    newProductController.deleteNewProduct(request, response, adminSession);
  });
});

module.exports = newProductRouter;
