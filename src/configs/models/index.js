const models = {};
const user = require("./user");
const perusahaan = require("./perusahaan");
const barang = require("./barang");

models.user = user;
models.perusahaan = perusahaan;
models.barang = barang;

module.exports = models;
