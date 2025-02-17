const User = require("../models/user"); // Import the User model

// Create User
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Error creating user" });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from DB
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Error fetching users" });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;  // <-- Use 'id' instead of 'userId'
  
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, error: "Error fetching user" });
  }
};

// Update User
exports.updateUserById = async (req, res) => {
  const { id } = req.params;  // <-- Use 'id' instead of 'userId'
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Error updating user" });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  
  // Parse the id to ensure it's a valid integer
  const userId = parseInt(id, 10);

  // Check if the parsed id is valid
  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    console.log("Parsed User ID:", userId);  // Log parsed ID to check
    
    const user = await User.findByPk(userId);
    if (!user) {
      console.log("User not found:", userId);  // Log if user not found
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Error deleting user" });
  }
};
