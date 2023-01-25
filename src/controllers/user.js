const models = require("../configs/models/index");
const controllerUsers = {};
const bcrypt = require("bcrypt");

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
    return res
      .status(400)
      .json({
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

module.exports = controllerUsers;
