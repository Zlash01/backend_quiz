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
    const participationId = req.params.participationId;
    const participation = await Participation.findByPk(participationId);

    if (!participation) {
      return res.status(404).json({ error: "Participation not found" });
    }

    participation.end_time = new Date(); // Set end_time to current time

    //Claude you start here
    const correctAnswers = await Answer.findAll({
      where: { is_correct: true },
      attributes: ["id"],
      raw: true,
    });

    const studentAnswers = await StudentAnswer.findOne({
      where: { id: participationId },
      attributes: ["answer_id"],
      raw: true,
    });

    let correctCount = 0;
    const correctAnswerIds = correctAnswers.map((answer) => answer.id);

    if (
      studentAnswers.answer_id &&
      correctAnswerIds.includes(studentAnswers.answer_id)
    ) {
      correctCount++;
    }

    participation.correct_answers = correctCount;
    //end here

    await participation.save();

    res.status(200).json(participation);
  } catch (error) {
    console.error("Error ending exam participation:", error);
    res.status(500).json({ error: "Failed to end exam participation" });
  }
};

module.exports = {
  startExamParticipation,
  submitExamParticipation,
};
