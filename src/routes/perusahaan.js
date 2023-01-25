const express = require("express"); //import express
const router = express.Router(); //include express router
const controllers = require("../controllers/index"); //import projects controllers

router.post("/perusahaan", controllers.perusahaan.post);

module.exports = router;
