const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticketType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tickets",
    timestamps: true,
  }
);

(async () => {
  try {
    await Ticket.sync({ force: true });
    console.log("Ticket table created successfully");
  } catch (error) {
    console.error("Unable to create Ticket table:", error);
  }
})();

module.exports = Ticket;

  