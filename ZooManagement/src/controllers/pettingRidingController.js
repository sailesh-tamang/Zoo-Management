const PettingRidingArea = require("../models/PettingRidingArea");

// ✅ Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await PettingRidingArea.findAll();
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
  }
};

// ✅ Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await PettingRidingArea.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching booking", error: error.message });
  }
};

// ✅ Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { visitorName, contact, activityType, animalType, bookingDate, duration, price } = req.body;

    // Validate required fields
    if (!visitorName || !contact || !activityType || !animalType || !bookingDate || !duration || !price) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate activityType
    if (!["Petting", "Riding"].includes(activityType)) {
      return res.status(400).json({ success: false, message: "Invalid activity type. Must be 'Petting' or 'Riding'" });
    }

    const newBooking = await PettingRidingArea.create({ visitorName, contact, activityType, animalType, bookingDate, duration, price });
    res.status(201).json({ success: true, message: "Booking created successfully", data: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating booking", error: error.message });
  }
};

// ✅ Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { visitorName, contact, activityType, animalType, bookingDate, duration, price } = req.body;
    const booking = await PettingRidingArea.findByPk(req.params.id);
    
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    // Update only provided fields
    await booking.update({ visitorName, contact, activityType, animalType, bookingDate, duration, price });
    res.json({ success: true, message: "Booking updated successfully", data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating booking", error: error.message });
  }
};

// ✅ Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await PettingRidingArea.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    await booking.destroy();
    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting booking", error: error.message });
  }
};
