const db = require("../models");
const { get } = require("../routes/userRouter");
const Answer = db.answer;
const Question = db.question;

//get all answers by question id
getAllAnswersByQuestionId = async (req, res) => {
  try {
    const answers = await Answer.findAll({
      where: { question_id: req.params.questionId },
    });
    res.status(200).json(answers);
  } catch (error) {
    console.error("Error getting answers:", error);
    res.status(500).json({ error: "Failed to get answers" });
  }
};

//create answer
createAnswer = async (req, res) => {
  try {
    const { answer_text, is_correct, question_id } = req.body;

    // Check if question_id exists
    const question = await Question.findOne({ where: { id: question_id } });
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const newAnswer = await Answer.create({
      answer_text,
      is_correct,
      question_id,
    });
    res.status(201).json(newAnswer);
  } catch (error) {
    console.error("Error creating answer:", error);
    res.status(500).json({ error: "Failed to create answer" });
  }
};

getAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).send({ message: "Answer not found" });
    }
    res.status(200).send(answer);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

updateAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).send({ message: "Answer not found" });
    }

    const { answer_text, is_correct, question_id } = req.body;

    // Check if question_id exists
    const question = await Question.findOne({ where: { id: question_id } });
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    answer.answer_text = answer_text;
    answer.is_correct = is_correct;
    answer.question_id = question_id;
    await answer.save();
    res.status(200).send(answer);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

deleteAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).send({ message: "Answer not found" });
    }
    await answer.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllAnswersByQuestionId,
  createAnswer,
  getAnswerById,
  updateAnswerById,
  deleteAnswerById,
};
