const controllers = {};
const user = require("./user");
const perusahaan = require("./perusahaan");
const barang = require("./barang");

controllers.user = user;
controllers.perusahaan = perusahaan;
controllers.barang = barang;

module.exports = controllers;
