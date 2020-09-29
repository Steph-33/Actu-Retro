const models = require('../models');
const express = require('express');
require('express-async-errors');

const ConflictError = require('../utils/errors/conflict');

module.exports = {
  // Ajout d'une commande
  addOrder: async (request, response, userSession) => {
    const order = {
      date_of_order: request.body.date_of_order,
      total_price: request.body.total_price,
      user_id: userSession.id,
    };
    for (const key in order) {
      if (order[key] == null) {
        return response.status(400).json({
          error: `Le champs ${key} n'est pas renseigné ❌`,
        });
      }
    }
    const orderFound = await models.Order.findOne({
      attributes: ['id'],
      where: { id: order.user_id },
    });
    if (!orderFound) {
      const order = await models.Order.create({
        date_of_order: request.body.date_of_order,
        total_price: request.body.total_price,
        user_id: userSession.id,
      });
      if (order) {
        return response.status(201).json({
          id: order.id,
          date_of_order: order.date_of_order,
          total_price: order.total_price,
        });
      } else {
        return response.status(401).json({
          error: "Impossible d'ajouter une commande. ❌",
        });
      }
    } else {
      return response.status(400).json({
        error: 'Une commande existe déjà pour cet utilisateur. ❌',
      });
      throw new ConflictError(
        'Mauvaise Requête',
        'Un panier existe déjà avec un id identique. ❌'
      );
    }
  },
  // Récupérer une commande par son Id
  getOrderById: (request, response, userSession) => {
    models.Order.findOne({
      attributes: ['id', 'date_of_order', 'total_price', 'user_id'],
      where: { id: request.params.id },
    })
      .then((orderFound) => {
        return response.status(200).json({
          id: orderFound.id,
          date_of_order: orderFound.date_of_order,
          total_price: orderFound.total_price,
          user_id: userSession.id,
        });
      })
      .catch(() => {
        response.status(404).json({
          error: "Aucune commande n'a été trouvée avec cet identifiant. ❌",
        });
      });
  },
  // Mettre à jour une commande
  updateOrder: (request, response, userSession) => {
    const order = {
      id: request.params.id,
      date_of_order: request.body.date_of_order,
      total_price: request.body.total_price,
      user_id: userSession.id,
    };
    models.Order.update(order, { where: { id: request.params.id } })
      .then(() => {
        response.status(201).json({
          message: 'Votre commande a été mise à jour avec succès ! ',
        });
      })
      .catch(() => {
        response.status(400).json({
          error: "Votre commande n'a pas pu être mise à jour. ❌",
        });
      });
  },
  // Effacer une commande
  deleteOrder: (request, response, userSession) => {
    models.Order.destroy({ where: { user_id: userSession.id } })
      .then(() => {
        response.status(201).json({
          message: 'Votre commande a été supprimée avec succès ! ',
        });
      })
      .catch(() => {
        response.status(400).json({
          error: "Votre commande n'a pas pu être supprimée. ❌",
        });
      });
  },
};