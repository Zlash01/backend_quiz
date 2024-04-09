const db = require("../models");

const User = db.users;

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.update(
      {
        username: req.body.username,
        password: req.body.password,
        is_admin: req.body.is_admin,
      },
      {
        where: {
          user_id: req.params.id,
        },
      }
    );
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserByName = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        username: req.params.username,
      },
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  verifyUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByName,
};
