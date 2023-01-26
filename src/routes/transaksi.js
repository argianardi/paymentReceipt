const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router.post("/transaksi", controllers.transaksi.post);
router.get("/transaksi", controllers.transaksi.getAll);
module.exports = router;
