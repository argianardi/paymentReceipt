const Sequelize = require("sequelize");
const db = require("../database/database");

const perusahaan = db.define(
  "perusahaan",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    nama_perusahaan: { type: Sequelize.STRING(225), allowNull: false },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  { freezeTableName: true }
);

db.sync({ alter: true })
  .then(() => {
    console.log("Perusahaan table  created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Perusahaan table:", error.message);
  });

module.exports = perusahaan;
