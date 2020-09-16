const models = require('../models');
const express = require('express');
require('express-async-errors');

const ConflictError = require('../utils/errors/conflict');

module.exports = {
  addNewProduct: async (request, response, adminSession) => {
    const newProduct = {
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      quantity: request.body.quantity,
      picture: request.body.picture,
      administrator_id: adminSession.id,
    };
    for (const key in newProduct) {
      if (newProduct[key] == null) {
        return response.status(400).json({
          error: `Le champs ${key} n'est pas renseigné ❌`,
        });
      }
    }
    const newProductFound = await models.NewProduct.findOne({
      attributes: ['name'],
      where: { name: newProduct.name },
    });
    if (!newProductFound) {
      const newProduct = await models.NewProduct.create({
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        quantity: request.body.quantity,
        picture: request.body.picture,
        administrator_id: adminSession.id,
      });
      if (newProduct) {
        return response.status(201).json({
          id: newProduct.id,
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          quantity: newProduct.quantity,
          picture: newProduct.picture,
        });
      } else {
        return response.status(401).json({
          error: "Impossible d'ajouter un produit. ❌",
        });
      }
    } else {
      return response.status(400).json({
        error: 'Un produit existe déjà avec un nom identique. ❌',
      });
      throw new ConflictError(
        'Mauvaise Requête',
        'Un article existe déjà avec un titre similaire. ❌'
      );
    }
  },
  getNewProductById: (request, response) => {
    models.NewProduct.findOne({
      attributes: ['id', 'name', 'description', 'price', 'quantity', 'picture'],
      where: { id: request.params.id },
    })
      .then((newProductFound) => {
        return response.status(200).json({
          id: newProductFound.id,
          name: newProductFound.name,
          description: newProductFound.description,
          price: newProductFound.price,
          quantity: newProductFound.quantity,
          picture: newProductFound.picture,
        });
      })
      .catch((err) => {
        response.status(404).json({
          error: "Aucun produit n'a été trouvé avec cet identifiant. ❌",
        });
      });
  },
  getAllNewProducts: (request, response) => {
    models.NewProduct.findAll({
      attributes: ['id', 'name', 'description', 'price', 'quantity', 'picture'],
    }).then((newProducts) => {
      response.status(201).json(newProducts);
    });
  },
};
