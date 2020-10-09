// Imports
const bcrypt = require('bcrypt');
const { request, response } = require('express');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
require('express-async-errors');

const BadRequest = require('../utils/errors/bad_request');
const ServerError = require('../utils/errors/server_error');
const ConflictError = require('../utils/errors/conflict');
const NotFoundError = require('../utils/errors/not_found_error');

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

// Contrôleurs
module.exports = {
  register: async (request, response) => {
    const administrator = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      password: request.body.password,
    };
    const checkEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const checkName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    for (const key in administrator) {
      if (administrator[key] == null) {
        throw new BadRequest(
          'Mauvaise Requête',
          `Le champs ${key} n'est pas renseigné ❌`
        );
      }
    }
    for (const key in administrator) {
      if (!isString(administrator[key])) {
        throw new BadRequest(
          'Mauvaise Requête',
          `Le champs ${key} n'est pas une chaîne de caractères ❌`
        );
      }
    }
    if (!checkName.test(administrator.firstname)) {
      throw new BadRequest(
        'Mauvaise Requête',
        `Le champ firstname est mal renseigné. Vous devez rentrer un prénom valide. ❌`
      );
    }
    if (!checkName.test(administrator.lastname)) {
      throw new BadRequest(
        'Mauvaise Requête',
        `Le champ lastname est mal renseigné. Vous devez rentrer un nom de famille valide. ❌`
      );
    }
    if (!checkEmail.test(administrator.email)) {
      throw new BadRequest(
        'Mauvaise Requête',
        `Le champ email est mal renseigné ex:hello@contact.com ❌`
      );
    }
    // TODO : check forms
    const adminFound = await models.Administrator.findOne({
      attributes: ['email'],
      where: { email: administrator.email },
    });
    if (!adminFound) {
      bcrypt.hash(administrator.password, 5, async (err, bcryptedPassword) => {
        const newAdministrator = await models.Administrator.create({
          firstname: administrator.firstname,
          lastname: administrator.lastname,
          email: administrator.email,
          password: bcryptedPassword,
        });
        if (newAdministrator) {
          return response.status(201).json({
            firstname: newAdministrator.firstname,
            lastname: newAdministrator.lastname,
            email: newAdministrator.email,
          });
        } else {
          throw new ServerError(
            'Erreur Serveur',
            "Impossible d'ajouter cet administrateur ❌"
          );
        }
      });
    } else {
      throw new ConflictError(
        'Mauvaise Requête',
        'Un administrateur possédant cet email existe déjà. ❌'
      );
    }
  },
  login: async (request, response) => {
    const adminInfos = {
      email: request.body.email,
      password: request.body.password,
    };
    for (const key in adminInfos) {
      if (adminInfos[key] == null) {
        throw new BadRequest(
          'Mauvaise Requête',
          `Le champs ${key} n'est pas renseigné ❌`
        );
      }
    }
    const adminFound = await models.Administrator.findOne({
      where: { email: adminInfos.email },
    });
    if (adminFound) {
      bcrypt.compare(
        adminInfos.password,
        adminFound.password,
        (errBycrypt, resBycrypt) => {
          const adminToken = {
            firstname: adminFound.firstname,
            lastname: adminFound.lastname,
            email: adminFound.email,
          };
          if (resBycrypt) {
            return response.status(200).json({
              token: jwtUtils.generateTokenForAdministrator(adminFound),
              administrator: adminToken,
            });
          }
          return response.status(403).json({
            error: 'Mot de passe incorrect ! ❌',
          });
        }
      );
    } else {
      throw new NotFoundError(
        'Ressource introuvable',
        "L'administrateur demandé n'existe pas ❌"
      );
    }
  },
  getAdministratorSession: async (request, response, cb) => {
    const headerAuth = request.headers['authorization'];
    const adminId = jwtUtils.getAdministratorId(headerAuth, response);
    if (adminId < 0) {
      throw new BadRequest(
        'Mauvaise Requête',
        "Erreur lors de la lecture de l'id de l'administrateur. ❌"
      );
    }
    const administrator = await models.Administrator.findOne({
      where: { id: adminId },
    });
    if (administrator) {
      return cb(administrator.dataValues);
    }
    throw new NotFoundError(
      'Ressource introuvable',
      'Vous devez être connecté pour accéder à cette ressource ❌'
    );
  },
  getAdministratorById : (id) => {
    return models.Administrator.findByPk(id);
  }
};
