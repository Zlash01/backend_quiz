const db = require("../models");

const StudentAnswer = db.student_answer;
const Participation = db.student_exam_participation;

//get the list of all answers of a students for a specific test
const getAllAnswersByExamId = async (req, res) => {
  try {
    const { participationId } = req.params;

    const answers = await StudentAnswer.findAll({
      where: { participation_id: participationId },
    });

    res.status(200).json(answers);
  } catch (error) {
    console.error("Error getting answers:", error);
    res.status(500).json({ error: "Failed to get answers" });
  }
};

const addAnswers = async (req, res) => {
  try {
    const { participationId } = req.params;
    const { answers } = req.body;
    const participation = await Participation.findByPk(participationId);

    if (!participation) {
      return res.status(404).json({ error: "Participation not found" });
    }

    const newAnswers = [];
    for (const answer of answers) {
      const { answer_id, question_id } = answer;
      const newAnswer = await StudentAnswer.create({
        answer_id,
        question_id,
        participation_id: participationId,
      });
      newAnswers.push(newAnswer);
    }

    res.status(201).json(newAnswers);
  } catch (error) {
    console.error("Error adding answers:", error);
    res.status(500).json({ error: "Failed to add answers" });
  }
};

module.exports = {
  getAllAnswersByExamId,
  addAnswers,
};
