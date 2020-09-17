const models = require('../models');
const express = require('express');
require('express-async-errors');

const ConflictError = require('../utils/errors/conflict');

module.exports = {
  addBasket: async (request, response, userSession) => {
    const basket = {
      quantity: request.body.quantity,
      total_price: request.body.total_price,
      user_id: userSession.id,
    };
    for (const key in basket) {
      if (basket[key] == null) {
        return response.status(400).json({
          error: `Le champs ${key} n'est pas renseigné ❌`,
        });
      }
    }
    const basketFound = await models.Basket.findOne({
      attributes: ['id'],
      where: { id: basket.user_id },
    });
    if (!basketFound) {
      const basket = await models.Basket.create({
        quantity: request.body.quantity,
        total_price: request.body.total_price,
        user_id: userSession.id,
      });
      if (basket) {
        return response.status(201).json({
          id: basket.id,
          quantity: basket.quantity,
          total_price: basket.total_price,
        });
      } else {
        return response.status(401).json({
          error: "Impossible d'ajouter un panier. ❌",
        });
      }
    } else {
      return response.status(400).json({
        error: 'Un panier existe déjà pour cet utilisateur. ❌',
      });
      throw new ConflictError(
        'Mauvaise Requête',
        'Un panier existe déjà avec un id identique. ❌'
      );
    }
  },
  getBasketById: (request, response, userSession) => {
    models.Basket.findOne({
      attributes: ['id', 'quantity', 'total_price', 'user_id'],
      where: { id: request.params.id },
    })
      .then((basketFound) => {
        return response.status(200).json({
          id: basketFound.id,
          quantity: basketFound.quantity,
          total_price: basketFound.total_price,
          user_id: userSession.id,
        });
      })
      .catch(() => {
        response.status(404).json({
          error: "Aucun panier n'a été trouvé avec cet identifiant. ❌",
        });
      });
  },
  updateBasket: async (request, response, userSession) => {
    const basket = {
      id: request.params.id,
      quantity: request.body.quantity,
      total_price: request.body.total_price,
      user_id: userSession.id,
    };
    await models.Basket.updateOne({ id: request.params.id }, basket)
      .then(() => {
        response.status(201).json({
          message: 'Votre panier a été mis à jour avec succès ! ',
        });
      })
      .catch(() => {
        response.status(400).json({
          error: "Votre panier n'a pas pu être mis à jour. ❌",
        });
      });
  },

  //   updateBasket: async (request, response, userSession) => {
  //     const basket = {
  //       id: request.params.id,
  //       quantity: request.body.quantity,
  //       total_price: request.body.total_price,
  //       user_id: userSession.id,
  //     };
  //     const basketFound = await models.Basket.findOne({
  //       attributes: ['id'],
  //       where: { id: basket.user_id },
  //     });
  //     if (basketFound) {
  //       const basket = await models.Basket.updateOne({
  //         quantity: request.body.quantity,
  //         total_price: request.body.total_price,
  //         user_id: userSession.id,
  //       });
  //       if (basket) {
  //         return response.status(201).json({
  //           id: basket.id,
  //           quantity: basket.quantity,
  //           total_price: basket.total_price,
  //         });
  //       } else {
  //         return response.status(401).json({
  //           error: 'Impossible de mettre à jour le panier. ❌',
  //         });
  //       }
  //     } else {
  //       return response.status(404).json({
  //         error: "Le panier que vous voulez mettre à jour n'existe pas. ❌",
  //       });
  //     }
  //   },
};
