const Ticket = require('../models/ticket');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { ticketType, price, quantity } = req.body;
    const newTicket = await Ticket.create({ ticketType, price, quantity });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a ticket by ID
exports.updateTicket = async (req, res) => {
  try {
    const { ticketType, price, quantity } = req.body;
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    ticket.ticketType = ticketType || ticket.ticketType;
    ticket.price = price || ticket.price;
    ticket.quantity = quantity || ticket.quantity;
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    await ticket.destroy();
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

