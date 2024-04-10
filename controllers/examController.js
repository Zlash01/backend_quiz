const db = require("../models");
const Exam = db.exam;

const addExam = async (req, res) => {
  try {
    const exam = await Exam.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.send(exam);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
