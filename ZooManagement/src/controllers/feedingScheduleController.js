const FeedingSchedule = require('../models/feedingSchedule'); // Adjust based on your model location

// Create a new feeding schedule
exports.createFeedingSchedule = async (req, res) => {
  try {
    const { cageNumber, morningTime, eveningTime } = req.body;
    const newFeedingSchedule = await FeedingSchedule.create({ cageNumber, morningTime, eveningTime });
    res.status(201).json(newFeedingSchedule);
  } catch (error) {
    console.error('Error creating feeding schedule:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all feeding schedules
exports.getAllFeedingSchedules = async (req, res) => {
  try {
    const feedingSchedules = await FeedingSchedule.findAll();
    res.json(feedingSchedules);
  } catch (error) {
    console.error('Error fetching feeding schedules:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a feeding schedule by ID
exports.getFeedingScheduleById = async (req, res) => {
  try {
    const feedingSchedule = await FeedingSchedule.findByPk(req.params.id);
    if (!feedingSchedule) return res.status(404).json({ error: 'Feeding schedule not found' });
    res.json(feedingSchedule);
  } catch (error) {
    console.error('Error fetching feeding schedule:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a feeding schedule by ID
exports.updateFeedingSchedule = async (req, res) => {
  try {
    const { cageNumber, morningTime, eveningTime } = req.body;
    const feedingSchedule = await FeedingSchedule.findByPk(req.params.id);
    if (!feedingSchedule) return res.status(404).json({ error: 'Feeding schedule not found' });

    feedingSchedule.cageNumber = cageNumber || feedingSchedule.cageNumber;
    feedingSchedule.morningTime = morningTime || feedingSchedule.morningTime;
    feedingSchedule.eveningTime = eveningTime || feedingSchedule.eveningTime;
    await feedingSchedule.save();
    res.json(feedingSchedule);
  } catch (error) {
    console.error('Error updating feeding schedule:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a feeding schedule by ID
exports.deleteFeedingSchedule = async (req, res) => {
  try {
    const feedingSchedule = await FeedingSchedule.findByPk(req.params.id);
    if (!feedingSchedule) return res.status(404).json({ error: 'Feeding schedule not found' });

    await feedingSchedule.destroy();
    res.json({ message: 'Feeding schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting feeding schedule:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
