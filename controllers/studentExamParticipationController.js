const db = require("../models");
const { use } = require("../routes/userRouter");
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

const getExamParticipation = async (req, res) => {
  try {
    const participationId = req.params.id;
    const participation = await Participation.findByPk(participationId);

    if (!participation) {
      return res.status(404).json({ error: "Participation not found" });
    }
    const exam = await Exam.findByPk(participation.exam_id);
    const returnData = {
      participation_id: participation.id,
      exam_id: participation.exam_id,
      description: exam.description,
      exam_name: exam.name,
      duration: exam.duration,
      total_questions: participation.total_questions,
      correct_answers: participation.correct_answers,
    };

    res.status(200).json(returnData);
  } catch (error) {
    console.error("Error fetching exam participation:", error);
    res.status(500).json({ error: "Failed to fetch exam participation" });
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

    const returnData = [];
    for (let i = 0; i < allExams.length; i++) {
      const user = await User.findOne({
        where: { id: allExams[i].user_id },
      });
      const exam = await Exam.findOne({
        where: { id: allExams[i].exam_id },
      });

      returnData.push({
        participation_id: allExams[i].id,
        user_id: user.id,
        user_name: user.name,
        student_id: user.student_id,
        exam_id: exam.id,
        exam_name: exam.name,
        end_time: allExams[i].end_time,

        correct_answers: allExams[i].correct_answers,
        total_questions: allExams[i].total_questions,
      });
    }

    res.status(200).json({ success: true, data: returnData });
  } catch (error) {
    console.error("Error fetching exam participations:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getStatisticParticipation = async (req, res) => {
  try {
    const allExams = await Participation.findAll({});

    const returnData = [];
    for (let i = 0; i < allExams.length; i++) {
      const user = await User.findOne({
        where: { id: allExams[i].user_id },
      });
      const exam = await Exam.findOne({
        where: { id: allExams[i].exam_id },
      });

      returnData.push({
        participation_id: allExams[i].id,
        user_id: user.id,
        user_name: user.name,
        student_id: user.student_id,
        exam_id: exam.id,
        exam_name: exam.name,
        end_time: allExams[i].end_time,

        correct_answers: allExams[i].correct_answers,
        total_questions: allExams[i].total_questions,
      });
    }

    res.status(200).json({ success: true, data: returnData });
  } catch (error) {
    console.error("Error fetching exam participations:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  startExamParticipation,
  submitExamParticipation,
  getAllExamParticipation,
  getStatisticParticipation,
  getCorrectStudentAnswers,
  getExamParticipation,
};
