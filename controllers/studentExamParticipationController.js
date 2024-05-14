const db = require("../models");
const Participation = db.student_exam_participation;
const User = db.user;
const Exam = db.exam;
const Question = db.question;
const StudentAnswer = db.student_answer;
const Answer = db.answer;

//start a new exam participation for a student
const startExamParticipation = async (req, res) => {
  try {
    const { examId } = req.params;
    const { id } = res.locals.user;

    // Check if user_id and exam_id exist in the database
    const user = await User.findByPk(id);
    const exam = await Exam.findByPk(examId);
    const total_questions = await Question.findAll({
      where: { exam_id: examId },
    });

    if (!user || !exam || total_questions.length === 0) {
      return res.status(404).json({ error: "User or exam not found" });
    }

    const participation = await Participation.create({
      user_id: id,
      exam_id: examId,
      total_questions: total_questions.length,
      start_time: new Date(), // Set start_time to current time
      end_time: null, // Set end_time to null initially
    });

    res.status(201).json(participation);
  } catch (error) {
    console.error("Error starting exam participation:", error);
    res.status(500).json({ error: "Failed to start exam participation" });
  }
};

//end exam participation for a student
const submitExamParticipation = async (req, res) => {
  try {
    const participationId = req.params.id;
    console.log(participationId);
    const participation = await Participation.findByPk(participationId);

    if (!participation) {
      return res.status(404).json({ error: "Participation not found" });
    }

    participation.end_time = new Date(); // Set end_time to current time

    const studentAnswers = await StudentAnswer.findAll({
      where: { participation_id: participationId },
      attributes: ["id", "question_id", "answer_id"],
    });

    if (!studentAnswers.length) {
      return res
        .status(404)
        .json({ error: "No answers found for this participation" });
    }

    const result = [];
    const uniqueAnswers = new Set();

    for (let sa of studentAnswers) {
      if (uniqueAnswers.has(sa.answer_id)) {
        continue;
      }

      const answer = await Answer.findOne({
        where: { id: sa.answer_id, is_correct: true },
        attributes: ["answer_text"],
      });

      if (answer) {
        const question = await Question.findOne({
          where: { id: sa.question_id },
          attributes: ["question_text"],
        });

        result.push({
          student_answer_id: sa.id,
          question_text: question ? question.question_text : null,
          answer_text: answer.answer_text,
          question_id: sa.question_id,
          answer_id: sa.answer_id,
        });

        uniqueAnswers.add(sa.answer_id);
      }
    }

    participation.correct_answers = result.length;
    //end here

    await participation.save();

    res.status(200).json(participation);
  } catch (error) {
    console.error("Error ending exam participation:", error);
    res.status(500).json({ error: "Failed to end exam participation" });
  }
};

const getCorrectStudentAnswers = async (req, res) => {
  try {
    const participationId = req.params.id;

    if (!participationId) {
      return res.status(400).json({ error: "Participation ID is required" });
    }

    const studentAnswers = await StudentAnswer.findAll({
      where: { participation_id: participationId },
      attributes: ["id", "question_id", "answer_id"],
    });

    if (!studentAnswers.length) {
      return res
        .status(404)
        .json({ error: "No answers found for this participation" });
    }

    const result = [];
    const uniqueAnswers = new Set();

    for (let sa of studentAnswers) {
      if (uniqueAnswers.has(sa.answer_id)) {
        continue;
      }

      const answer = await Answer.findOne({
        where: { id: sa.answer_id, is_correct: true },
        attributes: ["answer_text"],
      });

      if (answer) {
        const question = await Question.findOne({
          where: { id: sa.question_id },
          attributes: ["question_text"],
        });

        result.push({
          student_answer_id: sa.id,
          question_text: question ? question.question_text : null,
          answer_text: answer.answer_text,
          question_id: sa.question_id,
          answer_id: sa.answer_id,
        });

        uniqueAnswers.add(sa.answer_id);
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching correct student answers:", error);
    return res.status(500).json({
      error: "An error occurred while fetching correct student answers",
    });
  }
};

const getAllExamParticipation = async (req, res) => {
  try {
    const user_id = req.params.id;
    const allExams = await Participation.findAll({
      where: {
        user_id: user_id, // Use user_id from req.params.id
      },
    });

    res.status(200).json({ success: true, data: allExams });
  } catch (error) {
    console.error("Error fetching exam participations:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getStatisticParticipation = async (req, res) => {
  try {
    let exams = await Participation.findAll({});
    const statisticExams = [];
    for (let i = 0; i < exams.length; i++) {
      let exam = await Exam.findOne({
        where: { id: exams[i].exam_id },
      });
      let user = await User.findOne({
        where: { id: exams[i].user_id },
      });
      let totalQuestions = exams[i].total_questions;
      let correctAnswers = exams[i].correct_answers;
      let score = (correctAnswers / totalQuestions) * 10;
      statisticExams.push({
        user,
        exam,
        score,
        start_time: exams[i].start_time,
        end_time: exams[i].end_time,
      });
    }

    res.status(200).json({
      success: true,
      count: statisticExams.length,
      data: statisticExams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = {
  startExamParticipation,
  submitExamParticipation,
  getAllExamParticipation,
  getStatisticParticipation,
  getCorrectStudentAnswers,
};
