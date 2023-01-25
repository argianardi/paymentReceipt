const Sequelize = require("sequelize");
const db = require("../database/database");

const user = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    nama: { type: Sequelize.STRING(225), allowNull: false },

    username: {
      type: Sequelize.STRING(225),
      allowNull: false,
      unique: "username",
    },

    email: { type: Sequelize.STRING(225), allowNull: false },

    password: { type: Sequelize.STRING(225), allowNull: false },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  { freezeTableName: true }
);

db.sync({ alter: true })
  .then(() => {
    console.log("User table  created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create user table:", error.message);
  });

module.exports = user;
