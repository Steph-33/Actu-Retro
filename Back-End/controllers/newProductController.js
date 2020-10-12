const models = require('../models');
const express = require('express');
require('express-async-errors');

const ConflictError = require('../utils/errors/conflict');

module.exports = {
  // Ajouter un nouveau produit
  addNewProduct: async (request, response) => {
    const newProduct = {
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      quantity: request.body.quantity,
      image: `${request.protocol}://${request.get('host')}/images/${
        request.file.filename
      }`,
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
        image: `${request.protocol}://${request.get('host')}/images/${
          request.file.filename
        }`,
      });
      if (newProduct) {
        return response.status(201).json({
          id: newProduct.id,
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          quantity: newProduct.quantity,
          image: newProduct.image,
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
  // Récupérer un nouveau produit par son Id
  getNewProductById: (request, response) => {
    models.NewProduct.findOne({
      attributes: ['id', 'name', 'description', 'price', 'quantity', 'image'],
      where: { id: request.params.id },
    })
      .then((newProductFound) => {
        return response.status(200).json({
          id: newProductFound.id,
          name: newProductFound.name,
          description: newProductFound.description,
          price: newProductFound.price,
          quantity: newProductFound.quantity,
          image: newProductFound.image,
        });
      })
      .catch(() => {
        response.status(404).json({
          error: "Aucun produit n'a été trouvé avec cet identifiant. ❌",
        });
      });
  },
  //Récupérer tous les nouveaux produits
  getAllNewProducts: (request, response) => {
    if(request.params.limit == 'null' || request.params.limit == undefined || request.params.limit == ""){
      request.params.limit = 9;
    }
    models.NewProduct.findAll({
      attributes: ['id', 'name', 'description', 'price', 'quantity', 'image'],
      limit : parseInt(request.params.limit),
    }).then((newProducts) => {
      

      response.status(201).json(newProducts);
    });
  },
  // Mettre à jour un nouveau produit
  updateNewProduct: (request, response, userSession) => {
    const newProduct = {
      id: request.params.id,
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      quantity: request.body.quantity,
      image: `${request.protocol}://${request.get('host')}/images/${
        request.file.filename
      }`,
    };
    models.NewProduct.update(newProduct, { where: { id: request.params.id } })
      .then(() => {
        response.status(201).json({
          message: 'Votre produit a été modifié avec succès ! ',
        });
      })
      .catch(() => {
        response.status(400).json({
          error: "Votre produit n'a pas pu être modifié. ❌",
        });
      });
  },
  // Effacer un nouveau produit
  deleteNewProduct: (request, response) => {
    models.NewProduct.destroy({ where: { id: request.params.id } })
      .then(() => {
        response.status(201).json({
          message: 'Votre produit a été supprimé avec succès ! ',
        });
      })
      .catch(() => {
        response.status(400).json({
          error: "Votre produit n'a pas pu être supprimé. ❌",
        });
      });
  },
};
