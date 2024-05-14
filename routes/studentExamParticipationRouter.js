const {
  checkAccessToken,
  checkStudent,
  checkAdmin,
} = require("../controllers/middleware");
const studentExamParticipationController = require("../controllers/studentExamParticipationController");
const router = require("express").Router();

// POST /exams/participations/:examId/start: Start a new exam participation for a student.
router.post(
  "/exams/:examId/start",
  checkAccessToken,
  checkStudent,
  studentExamParticipationController.startExamParticipation
);

// PUT /exams/submit: Submit an exam participation by providing the answers.
router.put(
  "/exams/submit/:id",
  checkAccessToken,
  checkStudent,
  studentExamParticipationController.submitExamParticipation
);

router.get(
  "/exams/results/:id",
  checkAccessToken,
  checkStudent,
  studentExamParticipationController.getAllExamParticipation
);

router.get(
  "/statistic",
  checkAccessToken,
  checkAdmin,
  studentExamParticipationController.getStatisticParticipation
);

router.get(
  "/correct-answers/:id",
  checkAccessToken,
  studentExamParticipationController.getCorrectStudentAnswers
);

module.exports = router;
