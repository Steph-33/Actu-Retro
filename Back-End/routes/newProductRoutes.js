const express = require('express');
const newProductController = require('../controllers/newProductController');
const adminController = require('../controllers/adminController');
const multer = require('../middlewares/multer-config');

const newProductRouter = express.Router();

newProductRouter.get(
  '/newproducts/:id',
  newProductController.getNewProductById
);
newProductRouter.get('/newproducts', newProductController.getAllNewProducts);
newProductRouter.post('/newproducts', multer, (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    newProductController.addNewProduct(request, response, adminSession);
  });
});
newProductRouter.put('/newproducts/:id', multer, (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    newProductController.updateNewProduct(request, response, adminSession);
  });
});
newProductRouter.delete('/newproducts/:id', (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    newProductController.deleteNewProduct(request, response, adminSession);
  });
});

module.exports = newProductRouter;
