const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

// Define the FeedingSchedule model
const FeedingSchedule = sequelize.define(
  "FeedingSchedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cageNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    morningTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eveningTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "feeding_schedules",
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Sync the model with the database
(async () => {
  try {
    await FeedingSchedule.sync();  // Don't use `force: true` unless necessary in production
    console.log("FeedingSchedule table  successfully");
  } catch (error) {
    console.error("Unable to sync FeedingSchedule table:", error);
  }
})();

module.exports = FeedingSchedule;
