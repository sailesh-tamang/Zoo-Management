const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Users = sequelize.define(
  "Users",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);


(async () => {
  try{
      await Users.sync({force:true});
      console.log('User table created successfully');
  }catch(error){
      console.error('Unable to create User table:', error);
  }
})();

module.exports =Users;

