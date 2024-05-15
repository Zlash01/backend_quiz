const db = require("../models");

const StudentAnswer = db.student_answer;
const Participation = db.student_exam_participation;
const Question = db.question;
const Answer = db.answer;

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

const getStudentAnswerResults = async (req, res) => {
  try {
    let participationId = req.params.id;
    const existParticipation = await Participation.findOne({
      where: { id: participationId },
    });
    if (!existParticipation) {
      return res.status(404).json({ message: "Error" });
    }
    let studentAnswers = await StudentAnswer.findAll({
      where: { participation_id: participationId },
    });
    if (!studentAnswers) {
      return res.status(404).json({ message: "Result not found" });
    }
    const processedResults = new Map(); // Use a Map instead of a Set

    for (let i = 0; i < studentAnswers.length; i++) {
      let question = await Question.findOne({
        where: { id: studentAnswers[i].question_id },
      });
      let choices = await Answer.findAll({
        where: { question_id: question.id },
      });
      let correctAnswer;
      let answer;
      choices.forEach((choice) => {
        if (choice.is_correct) {
          correctAnswer = choice;
        }
        if (choice.id == studentAnswers[i].answer_id) {
          answer = choice;
        }
      });
      const result = {
        choices,
        question,
        answer,
        correctAnswer,
      };

      // Check if the question already exists in the Map
      if (!processedResults.has(question.id)) {
        processedResults.set(question.id, result); // Add the unique object to the Map
      }
    }

    // Convert the Map values to an array before returning the response
    const processedResultsArray = Array.from(processedResults.values());
    return res.status(200).json({
      success: true,
      count: studentAnswers.length,
      data: processedResultsArray,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

module.exports = {
  getAllAnswersByExamId,
  addAnswers,
  getStudentAnswerResults,
};
