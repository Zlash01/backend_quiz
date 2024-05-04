const examController = require("../controllers/examController");
const { checkAccessToken, checkAdmin } = require("../controllers/middleware");
const router = require("express").Router();

// GET /exams: Get a list of all available exams.
router.get("/", checkAccessToken, examController.getAllExams);

// POST /exams: Create a new exam (admin only).
router.post("/", checkAccessToken, checkAdmin, examController.createExam);

// GET /exams/:id: Get details of a specific exam by ID.
router.get("/:id", checkAccessToken, examController.getExamById);

// PUT /exams/:id: Update details of a specific exam by ID (admin only).
router.put("/:id", checkAccessToken, checkAdmin, examController.updateExamById);

// DELETE /exams/:id: Delete a specific exam by ID (admin only).
router.delete(
  "/:id",
  checkAccessToken,
  checkAdmin,
  examController.deleteExamById
);

module.exports = router;
