const { checkAccessToken, checkAdmin } = require("../controllers/middleware");
const questionController = require("../controllers/questionController");
const router = require("express").Router();

// GET /exams/:examId/questions: Get all questions for a specific exam.
router.get(
  "/exam/:examId",
  checkAccessToken,
  questionController.getAllQuestionsByExamId
);

// GET /questions/:id: Get details of a specific question by ID.
router.get("/:id", checkAccessToken, questionController.getQuestionById);

// POST /questions/:examId: Create a new question for a specific exam (admin only).
router.post(
  "/",
  checkAccessToken,
  checkAdmin,
  questionController.createQuestion
);

// PUT /questions/:id: Update details of a specific question by ID (admin only).
router.put(
  "/:id",
  checkAccessToken,
  checkAdmin,
  questionController.updateQuestionById
);

// DELETE /questions/:id: Delete a specific question by ID (admin only).
router.delete("/:id", questionController.deleteQuestionById);

router.get(
  "/all-question/:examId",
  checkAccessToken,
  questionController.getQuestionWithAnswers
);

router.get(
  "/single-question/:id",
  checkAccessToken,
  questionController.getOneQuestionWithAnswers
);

module.exports = router;
