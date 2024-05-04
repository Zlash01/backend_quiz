const db = require("../models");
const { get } = require("../routes/userRouter");

const Exam = db.exam;

// Create and Save a new Exam
const createExam = async (req, res) => {
  try {
    const { name, join_anytime, duration, description, start_time, end_time } =
      req.body;
    const newExam = await Exam.create({
      name,
      join_anytime,
      duration,
      description,
      start_time,
      end_time,
    });
    res.status(201).json(newExam);
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ error: "Failed to create exam" });
  }
};

getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll();
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error getting exams:", error);
    res.status(500).json({ error: "Failed to get exams" });
  }
};

getExamById = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) {
      return res.status(404).send({ message: "Exam not found" });
    }
    res.status(200).send(exam);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

updateExamById = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) {
      return res.status(404).send({ message: "Exam not found" });
    }
    exam.name = req.body.name;
    exam.join_anytime = req.body.join_anytime;
    exam.duration = req.body.duration;
    exam.description = req.body.description;
    exam.start_time = req.body.start_time;
    exam.end_time = req.body.end_time;
    await exam.save();
    res.status(200).send(exam);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

deleteExamById = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) {
      return res.status(404).send({ message: "Exam not found" });
    }
    await exam.destroy();
    res.status(200).send({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExamById,
  deleteExamById,
};
