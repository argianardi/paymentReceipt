const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router.post("/register", controllers.user.register);
router.post("/login", controllers.user.login);

module.exports = router;
