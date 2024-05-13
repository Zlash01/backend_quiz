const { checkAccessToken, checkStudent } = require("../controllers/middleware");
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
  "/exams/submit/:participationId",
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

module.exports = router;
