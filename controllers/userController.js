const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { get } = require("../routes/userRouter");

const User = db.user;

const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 86400 * 1000, // 24 hours in milliseconds
    });

    res.locals.user = user;
    const userObject = user.toJSON();
    res.status(200).send({ ...userObject, accessToken: token });
  } catch (err) {
    res.clearCookie("accessToken");
    res.status(500).send({ message: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      name: req.body.name,
      role: "student",
      class: req.body.class,
      student_id: req.body.student_id,
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { role: "student" } });

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    res.status(200).send(res.locals.user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(res.locals.user.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.email = req.body.email;
    user.name = req.body.name;
    user.class = req.body.class;
    user.student_id = req.body.student_id;

    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.email = req.body.email;
    user.name = req.body.name;
    user.class = req.body.class;
    user.student_id = req.body.student_id;

    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  verifyUser,
  registerUser,
  getUserById,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  updateUserById,
  deleteUserById,
};
