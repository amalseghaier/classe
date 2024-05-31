const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const classeRoutes = require('./route/classeRoute');
const { sequelize } = require('./model/classeModel'); 

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(cors());

// Monter les routes du département sur l'application
app.use('/classe', classeRoutes);

// Port d'écoute du serveur
const PORT = process.env.PORT || 3008;

sequelize.sync().then(() => {
  console.log('User model synced with database');

  // Démarrage du serveur
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error syncing User model:', error);
});