// Imports
require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let router = require('./routes');
let cors = require('cors');
let morgan = require('morgan');
const { notFoundHandler, errorLogger, errorHandler } = require('./middlewares');

// Instanciation du serveur
let server = express();

// Configuration de Body Parser
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Utilisation du logger
server.use(morgan('dev'));

// Configuration des routes
server.get('/', (request, response) => {
  response.send("Bienvenue sur ActuRetro, toute l'actualité du retrogaming");
});
server.use('/api/', router);

//Définition des Cors
server.use(cors());

// server.use((request, response, next) => {
//   response.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   response.setHeader('Access-Control-Allow-Origin', '*');
//   response.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   response.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// Gestion des erreurs
server.use('*', notFoundHandler);
server.use(errorLogger);
server.use(errorHandler);

// Lancement du serveur
let port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Le serveur est bien lancé sur le port ${port} 🚀`);
});
