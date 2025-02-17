const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET, // Ensure this exists in your .env file
        { expiresIn: "1d" }
    );
};


const register = async (req, res) => {
  const { name, email, password, role = "user" } = req.body; // role defaults to user

  // Only allow admin creation if the user has the proper authorization (this can be modified for your use case)
  if (role === "admin" && req.user && req.user.role !== "admin") {
    return res.status(403).json({ message: "Only an admin can create an admin user" });
  }

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role, // Role can be 'user' or 'admin'
    });

    // Generate token for the new user
    const token = generateToken(newUser);

    res.status(201).json({ 
      message: "User registered successfully", 
      token, 
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } 
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error during registration" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate token with user role
    const token = generateToken(user);

    res.status(200).json({
      token,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error during login" });
  }
};


module.exports = { register, login };
