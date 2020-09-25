const models = require('../models');
const express = require('express');
require('express-async-errors');

const ConflictError = require('../utils/errors/conflict');

module.exports = {
  // Ajouter un article
  addArticle: async (request, response) => {
    const article = {
      title: request.body.title,
      content: request.body.content,
      author: request.body.author,
      image: request.body.image,
    };

    for (const key in article) {
      if (article[key] == null) {
        return response.status(400).json({
          error: `Le champs ${key} n'est pas renseigné ❌`,
        });
      }
    }
    const articleFound = await models.Article.findOne({
      attributes: ['title'],
      where: { title: article.title },
    });
    if (!articleFound) {
      const newArticle = await models.Article.create({
        title: request.body.title,
        content: request.body.content,
        author: request.body.author,
        image: request.body.image,
      });
      if (newArticle) {
        return response.status(201).json({
          id: newArticle.id,
          title: newArticle.title,
          content: newArticle.content,
          author: newArticle.author,
          image: newArticle.image,
        });
      } else {
        return response.status(401).json({
          error: "Impossible d'ajouter un article ❌",
        });
      }
    } else {
      return response.status(400).json({
        error: 'Un article existe déjà avec un titre similaire. ❌',
      });
      throw new ConflictError(
        'Mauvaise Requête',
        'Un article existe déjà avec un titre similaire. ❌'
      );
    }
  },
  // Récupérer un article par son Id
  getArticleById: (request, response) => {
    models.Article.findOne({
      attributes: ['id', 'title', 'content', 'author', 'image'],
      where: { id: request.params.id },
    })
      .then((articleFound) => {
        return response.status(200).json({
          id: articleFound.id,
          title: articleFound.title,
          content: articleFound.content,
          author: articleFound.author,
          image: articleFound.image,
        });
      })
      .catch(() => {
        response.status(404).json({
          error: "Aucun article n'as été trouvé avec cet id ❌",
        });
      });
  },
  // Récupérer tous les articles
  getAllArticles: (request, response) => {
    models.Article.findAll({
      attributes: ['id', 'title', 'content', 'author', 'image'],
    }).then((articles) => {
      response.status(201).json(articles);
    });
  },
  // Mettre à jour un article
  updateArticle: (request, response) => {
    const article = {
      id: request.params.id,
      title: request.body.title,
      content: request.body.content,
      author: request.body.author,
      image: request.body.image,
    };
    models.Article.update(article, { where: { id: request.params.id } })
      .then(() => {
        response.status(201).json({
          message: 'Votre article a été mis à jour avec succès ! ',
        });
      })
      .catch(() => {
        response.status(400).json({
          error: "Votre article n'a pas pu être mis à jour. ❌",
        });
      });
  },
  // Effacer une commande
  deleteArticle: (request, response) => {
    models.Article.destroy({ where: { id: request.params.id } })
      .then(() => {
        response.status(201).json({
          message: 'Votre article a été supprimé avec succès ! ',
        });
      })
      .catch(() => {
        response.status(400).json({
          error: "Votre article n'a pas pu être supprimé. ❌",
        });
      });
  },
};
