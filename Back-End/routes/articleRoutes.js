const express = require('express');
const articleController = require('../controllers/articleController');
const adminController = require('../controllers/adminController');
// const multer = require('../middlewares/multer-config');

const articleRouter = express.Router();

articleRouter.get('/articles/:id', articleController.getArticleById);
articleRouter.get('/articles', articleController.getAllArticles);
articleRouter.post('/articles', (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    articleController.addArticle(request, response, adminSession);
  });
});
articleRouter.put('/articles/:id', (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    articleController.updateArticle(request, response, adminSession);
  });
});
articleRouter.delete('/articles/:id', (request, response) => {
  let adminSession = {};
  adminController.getAdministratorSession(request, response, (adminInfos) => {
    adminSession = adminInfos;
    articleController.deleteArticle(request, response, adminSession);
  });
});

module.exports = articleRouter;
