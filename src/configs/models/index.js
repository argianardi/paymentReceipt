const models = {};
const user = require("./user");
const perusahaan = require("./perusahaan");

models.user = user;
models.perusahaan = perusahaan;

module.exports = models;
