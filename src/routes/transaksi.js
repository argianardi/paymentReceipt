const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

router.post(
  "/transaksi",
  validateAuth.isAuthenticated,
  controllers.transaksi.post
);
router.get(
  "/transaksi",
  validateAuth.isAuthenticated,
  controllers.transaksi.getAll
);
router.get(
  "/export-csv",
  validateAuth.isAuthenticated,
  controllers.transaksi.exportCSV
);

module.exports = router;
