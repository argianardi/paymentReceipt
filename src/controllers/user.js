const models = require("../configs/models/index");
const controllerUsers = {};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
controllerUsers.register = async (req, res) => {
  const { nama, username, email, password } = req.body;
  if (!(nama && username && email && password)) {
    return res.status(400).json({
      false: false,
      message: "Bad Request: some input are required",
    });
  }

  const user = await models.user.findAll({
    where: { username },
  });

  if (user.length > 0) {
    return res.status(400).json({
      success: false,
      message: "The username is already registered!!",
    });
  } else {
    // encrypt password
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = await bcrypt.hashSync(password, salt);

    try {
      const user = await models.user.create({
        nama,
        username,
        email,
        password: passwordHashed,
      });
      res.status(201).json({
        success: false,
        message: "Registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

// login
controllerUsers.login = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400).json({
      success: false,
      message: "Bad request: some input are required",
    });
  }

  try {
    const user = await models.user.findAll({
      where: { username },
    });
    if (user.length > 0) {
      const comparePassword = bcrypt.compareSync(password, user[0].password);
      if (comparePassword) {
        const secret = process.env.JWT_SECRET_KEY || "secret";
        const token = jwt.sign(
          { id: user[0].id, username: user[0].username },
          secret,
          {
            expiresIn: "2h",
          }
        );

        if (token) {
          res.status(200).json({
            success: true,
            message: "Login success",
            data: {
              token: token,
              username: user[0].username,
              id: user[0].id,
            },
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Bad request: password doesn't match",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Bad request: the User not registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      //   "Internal server error",
    });
  }
};

module.exports = controllerUsers;
