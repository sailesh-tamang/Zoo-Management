const express = require('express');
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');

const { verifyToken,verifyRole,verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();


// Ticket routes
router.post('/',verifyToken, createTicket); // Create a new ticket
router.get('/',verifyToken, getAllTickets); // Get all tickets
router.get('/:id',verifyToken, getTicketById); // Get a ticket by ID
router.put('/:id',verifyToken, updateTicket); // Update a ticket by ID
router.delete('/:id',verifyToken, deleteTicket); // Delete a ticket by ID

module.exports = router;
