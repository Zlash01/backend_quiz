const questionController = require("../controllers/questionController");
const router = require("express").Router();

//GET /api/exams/:id/questions
router.get("/:id/questions", questionController.getQuestions);

//POST /api/exams/:id/questions/submit
router.post("/:id/questions/submit", questionController.submitQuestions);

module.exports = router;
