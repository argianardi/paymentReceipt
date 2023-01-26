const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router.post("/transaksi", controllers.transaksi.post);

module.exports = router;
