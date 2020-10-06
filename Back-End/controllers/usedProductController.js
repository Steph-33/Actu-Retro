const models = require('../models');
const express = require('express');
require('express-async-errors');

const ConflictError = require('../utils/errors/conflict');

module.exports = {
  addUsedProduct: async (request, response, userSession) => {
    console.log('userSession : ', userSession);
    const usedProduct = {
      date_of_announcement: request.body.date_of_announcement,
      name: request.body.name,
      state: request.body.state,
      description: request.body.description,
      price: request.body.price,
      image: `${request.protocol}://${request.get('host')}/images/${
        request.file.filename
      }`,
      location: request.body.location,
      contact: request.body.contact,
      user_id: userSession.id,
    };
    for (const key in usedProduct) {
      if (usedProduct[key] == null) {
        return response.status(400).json({
          error: `Le champs ${key} n'est pas renseigné ❌`,
        });
      }
    }
    const usedProductFound = await models.UsedProduct.findOne({
      attributes: ['name', 'user_id'],
      where: { name: usedProduct.name, user_id: usedProduct.user_id },
    });
    if (!usedProductFound) {
      const usedProduct = await models.UsedProduct.create({
        date_of_announcement: request.body.date_of_announcement,
        name: request.body.name,
        state: request.body.state,
        description: request.body.description,
        price: request.body.price,
        image: `${request.protocol}://${request.get('host')}/images/${
          request.file.filename
        }`,
        location: request.body.location,
        contact: request.body.contact,
        user_id: userSession.id,
      });
      if (usedProduct) {
        return response.status(201).json({
          id: usedProduct.id,
          name: usedProduct.name,
          description: usedProduct.description,
          price: usedProduct.price,
          contact: usedProduct.contact,
          user_id: usedProduct.user_id,
        });
      } else {
        return response.status(401).json({
          error: "Impossible d'ajouter un produit. ❌",
        });
      }
    } else {
      return response.status(400).json({
        error:
          'Un produit existe déjà avec un nom identique et sous le même identifiant. ❌',
      });
      throw new ConflictError(
        'Mauvaise Requête',
        'Un produit existe déjà avec un nom identique et sous le même identifiant. ❌'
      );
    }
  },
  getUsedProductById: (request, response) => {
    models.UsedProduct.findOne({
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'image',
        'contact',
        'user_id',
      ],
      where: { id: request.params.id },
    })
      .then((usedProductFound) => {
        return response.status(200).json({
          id: usedProductFound.id,
          name: usedProductFound.name,
          description: usedProductFound.description,
          price: usedProductFound.price,
          image: usedProductFound.image,
          contact: usedProductFound.contact,
          user_id: usedProductFound.user_id,
        });
      })
      .catch(() => {
        response.status(404).json({
          error: "Aucun produit n'a été trouvé avec cet identifiant. ❌",
        });
      });
  },
  getAllUsedProducts: (request, response) => {
    models.UsedProduct.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'image',
        'contact',
        'user_id',
      ],
    }).then((usedProducts) => {
      response.status(201).json(usedProducts);
    });
  },
};
