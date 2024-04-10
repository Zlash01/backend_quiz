const db = require("../models");

const Exam = db.exams;
const User = db.users;
const Submission = db.submissions;
const Schedule = db.exam_schedules;

//POST /api/admin/login
const login = async (req, res) => {
  try {
    const admin = await User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
        is_admin: 1,
      },
    });
    if (admin) {
      res.status(200).send(admin);
    } else {
      res.status(404).send({ message: "Admin not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//GET /api/admin/exams
const getExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({});
    res.status(200).send(exams);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//POST /api/admin/exams
const addExam = async (req, res) => {
  try {
    let examData = {
      exam_name: req.body.exam_name,
      description: req.body.exam_description,
      is_scheduled: req.body.exam_is_scheduled,
    };

    const exam = await Exam.create(examData);

    if (
      req.body.exam_is_scheduled &&
      req.body.start_time &&
      req.body.end_time
    ) {
      // Create a new schedule and link it to the exam
      const newSchedule = await Schedule.create({
        exam_id: exam.exam_id,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
      });

      // Update the schedule's exam_id with the newly created exam's ID
      await Schedule.update(
        { exam_id: exam.exam_id },
        { where: { schedule_id: newSchedule.schedule_id } }
      );
    }

    res.status(201).send(exam);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//PUT /api/admin/exams/:id
const updateExam = async (req, res) => {
  try {
    let updateFields = {
      exam_name: req.body.exam_name,
      description: req.body.exam_description,
      is_scheduled: req.body.exam_is_scheduled,
    };

    if (req.body.exam_is_scheduled && req.body.exam_scheduled_id) {
      updateFields.scheduled_id = req.body.scheduled_id;
    }
    const exam = await Exam.update(updateFields, {
      where: {
        exam_id: req.params.id,
      },
    });

    res.status(200).send({ message: "Exam updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//DELETE /api/admin/exams/:id
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.destroy({
      where: {
        exam_id: req.params.id,
      },
    });
    res.status(200).send({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//GET /api/admin/users
const getUsers = async (req, res) => {
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
//POST /api/admin/users
const addUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      is_admin: req.body.is_admin,
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//PUT /api/admin/users/:id
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
    res.send({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    res.send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//GET /api/admin/user/stats
async function getAllStats(req, res) {
  try {
    const avgScores = await Submission.findAll({
      attributes: [
        "exam_id",
        [Sequelize.fn("AVG", Sequelize.col("score")), "avg_exam_score"],
      ],
      group: ["exam_id"],
      include: [
        {
          model: Exam,
          attributes: ["name"],
        },
      ],
    });

    const numTimesTaken = await Submission.findAll({
      attributes: [
        "user_id",
        "exam_id",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "num_times_taken"],
      ],
      group: ["user_id", "exam_id"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Exam,
          attributes: ["name"],
        },
      ],
    });

    const avgAllExams = await Submission.findOne({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("score")), "avg_all_exam_score"],
      ],
    });

    res.status(200).json({ avgScores, numTimesTaken, avgAllExams });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  login,
  getExams,
  addExam,
  updateExam,
  deleteExam,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getAllStats,
};
