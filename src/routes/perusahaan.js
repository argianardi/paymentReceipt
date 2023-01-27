const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

router.post(
  "/perusahaan",
  validateAuth.isAuthenticated,
  controllers.perusahaan.post
);
router.get(
  "/perusahaan",
  validateAuth.isAuthenticated,
  controllers.perusahaan.getAll
);

module.exports = router;
