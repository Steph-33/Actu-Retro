const express = require('express');
const articleController = require('../controllers/articleController');
const adminController = require('../controllers/adminController');
const multer = require('../middlewares/multer-config');

const articleRouter = express.Router();

// Récupération d'un article par son id
articleRouter.get('/articles/:id', articleController.getArticleById);

// Récupération de l'ensemble des articles
articleRouter.get('/articles', articleController.getAllArticles);

// Ajout d'un article
articleRouter.post('/articles', multer, (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    articleController.addArticle(request, response, adminSession);
  });
});

// Mise à jour d'un article
articleRouter.put('/articles/:id', multer, (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    articleController.updateArticle(request, response, adminSession);
  });
});

// Suppression d'un article
articleRouter.delete('/articles/:id', (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    articleController.deleteArticle(request, response, adminSession);
  });
});

module.exports = articleRouter;
