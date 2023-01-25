const jwt = require("jsonwebtoken");

const validateAuth = {
  isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (verifiedToken) {
        next();
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }
  },
};

module.exports = validateAuth;
