const db = require("../models");

const User = db.users;
const Submission = db.submissions;

const submitExam = async (req, res) => {
  try {
    // Save the submission to the database
    const submission = await Submission.create({
      user_id: req.body.user_id,
      exam_id: req.body.exam_id,
      score: req.body.score,
      submited_at: new Date(),
    });

    // Respond with the newly created submission
    res.status(201).json(submission);
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ error: "Failed to submit exam" });
  }
};

const viewResults = async (req, res) => {
  try {
    // Find all submissions for the user
    const submissions = await Submission.findAll({
      where: { user_id: req.params.id },
    });

    // Respond with the submissions
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error viewing results:", error);
    res.status(500).json({ error: "Failed to view results" });
  }
};

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
  getAllUsers,
  verifyUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByName,
  viewResults,
  submitExam,
};
