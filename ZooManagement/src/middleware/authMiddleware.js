const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Auth Header Received:", authHeader); // Debugging log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token is required or invalid format" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token); // Debugging log

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error("Token Verification Failed:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // Proceed if admin
  }
  return res.status(403).json({ message: "Access denied, admin only" });
};

// Middleware to verify user's role
const verifyRole = (roles) => {
  return (req, res, next) => {
    // Check if the user's role is in the allowed roles list
    if (roles.includes(req.user.role)) {
      return next(); // Proceed if role matches
    }

    return res.status(403).json({ message: "Access denied for this role" });
  };
};

module.exports = { verifyToken, verifyAdmin, verifyRole };
