const Animal = require('../models/animal');

// Create a new animal
exports.createAnimal = async (req, res) => {
  try {
    const { name, species, age, habitat } = req.body;
    const newAnimal = await Animal.create({ name, species, age, habitat });
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all animals
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.findAll();
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get an animal by ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an animal by ID
exports.updateAnimal = async (req, res) => {
  try {
    const { name, species, age, habitat } = req.body;
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });

    animal.name = name || animal.name;
    animal.species = species || animal.species;
    animal.age = age || animal.age;
    animal.habitat = habitat || animal.habitat;
    await animal.save();
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an animal by ID
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });

    await animal.destroy();
    res.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
