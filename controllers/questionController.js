const db = require("../models");
const Question = db.questions;

//GET /api/exams/:id/questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: {
        exam_id: req.params.id,
      },
    });
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//POST /api/exams/:id/questions/submit
const submitQuestions = async (req, res) => {
  try {
    let questions = req.body.questions;
    questions = questions.map((question) => {
      return {
        exam_id: req.params.id,
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        correct_option: question.correct_option,
      };
    });

    const createdQuestions = await Question.bulkCreate(questions);
    res.status(201).send(createdQuestions);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getQuestions,
  submitQuestions,
};
