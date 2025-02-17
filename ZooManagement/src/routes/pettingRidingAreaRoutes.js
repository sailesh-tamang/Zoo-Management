const express = require("express");
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/pettingRidingController");

const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Petting/Riding Area Routes with Authentication Middleware
router.get("/", verifyToken, getAllBookings); // Get all bookings
router.get("/:id", verifyToken, getBookingById); // Get booking by ID
router.post("/", verifyToken, createBooking); // Create a new booking
router.put("/:id", verifyToken, updateBooking); // Update a booking
router.delete("/:id", verifyToken, deleteBooking); // Delete a booking

module.exports = router;

