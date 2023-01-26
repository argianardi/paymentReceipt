const controllers = {};
const user = require("./user");
const perusahaan = require("./perusahaan");
const barang = require("./barang");
const transaksi = require("./transaksi");

controllers.user = user;
controllers.perusahaan = perusahaan;
controllers.barang = barang;
controllers.transaksi = transaksi;

module.exports = controllers;
