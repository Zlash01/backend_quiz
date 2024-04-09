const db = require("../models");
const User = db.users;

//api/auth/login
const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//api/auth/register
const registerUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    }); //check if user already exists
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      is_admin: req.body.is_admin,
    });
    res.send(newUser);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
