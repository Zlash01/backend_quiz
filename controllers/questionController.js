const db = require("../models");
const { get } = require("../routes/userRouter");
const Question = db.question;
const Answer = db.answer;
const Exam = db.exam;

getAllQuestionsByExamId = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { exam_id: req.params.examId },
    });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Failed to get questions" });
  }
};

getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).send({ message: "Question not found" });
    }
    res.status(200).send(question);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getQuestionWithAnswers = async (req, res) => {
  try {
    //get question from examid then get answers from questionid
    const examId = req.params.examId;
    const exam = await Exam.findByPk(examId);
    const returnData = [];
    if (!exam) {
      return res.status(404).send({ message: "Exam not found" });
    }
    const questions = await Question.findAll({
      where: { exam_id: examId },
    });

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answers = await Answer.findAll({
        where: { question_id: question.id },
      });
      question.dataValues.answers = answers;

      returnData.push({
        question: question,
      });
    }
    res.status(200).send(returnData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getOneQuestionWithAnswers = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).send({ message: "Question not found" });
    }
    const answers = await Answer.findAll({
      where: { question_id: question.id },
    });
    question.dataValues.answers = answers;
    res.status(200).send(question);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Create and Save a new Question
const createQuestion = async (req, res) => {
  try {
    const { question_text, exam_id } = req.body;
    const newQuestion = await Question.create({
      question_text,
      exam_id,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Failed to create question" });
  }
};

updateQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).send({ message: "Question not found" });
    }
    question.question_text = req.body.question_text;
    question.exam_id = req.body.exam_id;
    await question.save();
    res.status(200).send(question);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

deleteQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).send({ message: "Question not found" });
    }
    await question.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createQuestion,
  updateQuestionById,
  deleteQuestionById,
  getQuestionById,
  getAllQuestionsByExamId,
  getQuestionWithAnswers,
  getOneQuestionWithAnswers,
};
