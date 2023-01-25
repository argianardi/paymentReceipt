const controllers = {};
const user = require("./user");
const perusahaan = require("./perusahaan");

controllers.user = user;
controllers.perusahaan = perusahaan;

module.exports = controllers;
