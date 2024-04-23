const express = require('express');
const router = express.Router();
const {
  getAllClasses,
  getClasseById,
  createClasse,
  updateClasse,
  deleteClasse,
} = require('../controller/classeController'); // Assurez-vous du bon chemin d'accès

// Routes CRUD pour les classes
router.get('/classes', getAllClasses);
router.get('/classes/:id', getClasseById);
router.post('/classes', createClasse);
router.put('/classes/:id', updateClasse);
router.delete('/classes/:id', deleteClasse);

module.exports = router;
