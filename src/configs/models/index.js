const models = {};
const user = require("./user");
const perusahaan = require("./perusahaan");
const barang = require("./barang");
const transaksi = require("./transaksi");

models.user = user;
models.perusahaan = perusahaan;
models.barang = barang;
models.transaksi = transaksi;

module.exports = models;
