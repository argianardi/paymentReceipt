const express = require("express"); //import express
const router = express.Router(); //include express router
const controllers = require("../controllers/index"); //import projects controllers

router.post("/barang", controllers.barang.post);
router.get("/barang", controllers.barang.getAll);

module.exports = router;
