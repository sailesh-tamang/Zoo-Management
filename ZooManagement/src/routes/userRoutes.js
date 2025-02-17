const express = require('express');

// Import user controller and the middlewares
const { 
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/userController');  // Destructure and import the functions

const { verifyToken,verifyRole,verifyAdmin } = require("../middleware/authMiddleware");


const router = express.Router();

// Define your routes with the required middlewares and controller functions
router.post("/", verifyToken, createUser);  // Create a new user
router.get("/", verifyToken, getAllUsers);  // Get all users
router.get("/:id", verifyToken, getUserById);  // Get a specific user by ID
router.put("/:id", verifyToken, updateUserById);  // Update a user
router.delete("/:id", verifyToken,deleteUserById);  // Delete a user

module.exports = router;
