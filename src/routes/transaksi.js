const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router.post("/transaksi", controllers.transaksi.post);
router.get("/transaksi", controllers.transaksi.getAll);
router.get("/export-csv", controllers.transaksi.exportCSV);

module.exports = router;
