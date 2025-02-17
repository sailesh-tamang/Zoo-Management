require('dotenv').config(); 
const express = require('express');

const User = require("./models/user");
const Animal = require("./models/animal");
const Ticket = require("./models/ticket");
const FeedingSchedule=require("./models/feedingSchedule");
const PettingRidingArea=require("./models/PettingRidingArea");
//const { connection } = require('./database/db');

const cors = require("cors");

const { connection } = require('./database/db');

// Import route files (commented out for now)
const authRoutes = require('./routes/authRoutes');

//const adminRoutes = require('./routes/adminRoutes');
//const userRoutes = require("./routes/userRoutes");
const animalRoutes = require("./routes/animalRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");
const feedingScheduleRoutes = require("./routes/FeedingScheduleRoutes");
const pettingRidingAreaRoutes = require("./routes/PettingRidingAreaRoutes");







const app = express();
const PORT = 5001;
console.log("Starting server...");

app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
  credentials: true                // Allow credentials like cookies or authorization headers
}));

// Middleware
app.use(express.json()); 
// Authentication routes
//app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users",userRoutes);
app.use("/api/animals",animalRoutes);
app.use("/api/feedingSchedules", feedingScheduleRoutes);
app.use("/api/pettingRidingArea", pettingRidingAreaRoutes);




// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Establish database connection
connection(); 