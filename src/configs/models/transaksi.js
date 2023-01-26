const Sequelize = require("sequelize");
const db = require("../database/database");

const transaksi = db.define(
  "transaksi",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_perusahaan: { type: Sequelize.INTEGER, allowNull: false },
    id_barang: { type: Sequelize.INTEGER, allowNull: false },
    total_barang: { type: Sequelize.INTEGER, allowNull: false },
    grand_total: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  { freezeTableName: true }
);

db.sync({ alter: true })
  .then(() => {
    console.log("Transaksi table  created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Transaksi table:", error.message);
  });

module.exports = transaksi;
