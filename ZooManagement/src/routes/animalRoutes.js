const express = require('express');
const {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal
} = require('../controllers/animalController')

const { verifyToken,verifyRole,verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Animal routes
router.post('/',verifyToken,verifyRole(["admin"]), createAnimal); // Create a new animal
router.get('/',verifyToken,verifyRole(["admin"]), getAllAnimals); // Get all animals
router.get('/:id',verifyToken,verifyRole(["admin"]), getAnimalById); // Get an animal by ID
router.put('/:id',verifyToken,verifyRole(["admin"]), updateAnimal); // Update an animal by ID
router.delete('/:id',verifyToken,verifyRole(["admin"]), deleteAnimal); // Delete an animal by ID

module.exports = router;

