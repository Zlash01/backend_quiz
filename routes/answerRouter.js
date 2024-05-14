const answerController = require("../controllers/answerController");
const { checkAccessToken, checkAdmin } = require("../controllers/middleware");
const router = require("express").Router();

// GET /questions/:questionId/answers: Get all answers for a specific question.
router.get(
  "/:questionId",
  checkAccessToken,
  answerController.getAllAnswersByQuestionId
);

// POST /questions/:questionId/answers: Create a new answer for a specific question (admin only).
router.post("/", checkAccessToken, checkAdmin, answerController.createAnswer);

// GET /answers/:id: Get details of a specific answer by ID.
router.get(
  "/id/:id",
  checkAccessToken,
  checkAdmin,
  answerController.getAnswerById
);

// PUT /answers/:id: Update details of a specific answer by ID (admin only).
router.put(
  "/id/:id",
  checkAccessToken,
  checkAdmin,
  answerController.updateAnswerById
);

// DELETE /answers/:id: Delete a specific answer by ID (admin only).
router.delete(
  "/id/:id",
  checkAccessToken,
  checkAdmin,
  answerController.deleteAnswerById
);

module.exports = router;
