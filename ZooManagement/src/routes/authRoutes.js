
const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware"); // Corrected "middleware" to "middlewares"

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (Example)
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "User profile data", user: req.user });
});

router.get("/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router; // ✅ Correct export

