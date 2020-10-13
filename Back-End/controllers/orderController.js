const models = require('../models');
const express = require('express');
require('express-async-errors');
const jwtUtils = require('../utils/jwt.utils');

const ConflictError = require('../utils/errors/conflict');

module.exports = {
  // Ajout d'une commande
  addOrder: async (request, response, userId) => {
    const order = {
      date_of_order: request.body.date_of_order,
      products: request.body.products,
      total_price: request.body.total_price,
    };
    for (const key in order) {
      if (order[key] == null) {
        return response.status(400).json({
          error: `Le champs ${key} n'est pas renseigné ❌`,
        });
      }
    }
    const orderCreated = await models.Order.create({
      date_of_order: request.body.date_of_order,
      total_price: request.body.total_price,
      user_id: userId,
    });
    const productsToAdd = order.products.map((product) => {
      return {
        order_id: orderCreated.id,
        new_product_id: product.id,
        quantity: product.quantity,
      };
    });
    await models.OrderNewProduct.bulkCreate(productsToAdd);
    const newOrder = await models.Order.findByPk(orderCreated.id, {
      include: [
        {
          model: models.NewProduct,
          as: 'products',
          through: { attributes: [] },
        },
      ],
    });
    if (orderCreated) {
      return response.status(201).json(newOrder);
    } else {
      return response.status(401).json({
        error: "Impossible d'ajouter une commande. ❌",
      });
    }
  },
  // Récupérer une commande par son Id
  getOrderById: (request, response, userId) => {
    models.Order.findOne({
      attributes: ['id', 'date_of_order', 'total_price', 'user_id'],
      where: { id: request.params.id },
    })
      .then((orderFound) => {
        return response.status(200).json({
          id: orderFound.id,
          date_of_order: orderFound.date_of_order,
          total_price: orderFound.total_price,
          user_id: userId,
        });
      })
      .catch(() => {
        response.status(404).json({
          error: "Aucune commande n'a été trouvée avec cet identifiant. ❌",
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
