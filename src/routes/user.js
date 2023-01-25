const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router.post("/register", controllers.user.register);

module.exports = router;
