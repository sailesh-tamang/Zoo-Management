const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db"); // Import Sequelize instance

const PettingRidingArea = sequelize.define(
  "PettingRidingArea",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    visitorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activityType: {
      type: DataTypes.ENUM("Petting", "Riding"),
      allowNull: false,
    },
    animalType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in minutes
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "petting_riding_area", // Explicit table name
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

(async () => {
  try {
    await PettingRidingArea.sync(); // Sync model with database
    console.log(" PettingRidingArea table created successfully.");
  } catch (error) {
    console.error(" Unable to create PettingRidingArea table:", error);
  }
})();

module.exports = PettingRidingArea;
