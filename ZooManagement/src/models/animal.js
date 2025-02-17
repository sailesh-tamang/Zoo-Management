const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Animal = sequelize.define(
  "Animal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    habitat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "animals",
    timestamps: true,
  }
);

(async () => {
  try {
    await Animal.sync({ force: true });
    console.log("Animal table created successfully");
  } catch (error) {
    console.error("Unable to create Animal table:", error);
  }
})();

module.exports = Animal;
