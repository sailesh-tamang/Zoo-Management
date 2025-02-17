const express = require('express');
const {
  createFeedingSchedule,
  getAllFeedingSchedules,
  getFeedingScheduleById,
  updateFeedingSchedule,
  deleteFeedingSchedule
} = require('../controllers/feedingScheduleController');
const { verifyToken,verifyRole,verifyAdmin } = require("../middleware/authMiddleware");


const router = express.Router();

// Feeding Schedule routes
router.post('/',verifyToken, createFeedingSchedule); // Create a new feeding schedule
router.get('/',verifyToken, getAllFeedingSchedules); // Get all feeding schedules
router.get('/:id',verifyToken, getFeedingScheduleById); // Get a feeding schedule by ID
router.put('/:id',verifyToken, updateFeedingSchedule); // Update a feeding schedule by ID
router.delete('/:id',verifyToken, deleteFeedingSchedule); // Delete a feeding schedule by ID

module.exports = router;
