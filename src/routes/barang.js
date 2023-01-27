const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

router.post("/barang", validateAuth.isAuthenticated, controllers.barang.post);
router.get("/barang", validateAuth.isAuthenticated, controllers.barang.getAll);

module.exports = router;
