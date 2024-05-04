const router = require("express").Router();
const studentAnswerController = require("../controllers/studentAnswersController");
const { checkAccessToken } = require("../controllers/middleware");

//get the list of all answers of a students for a specific test
router.get(
  "/:participationId",
  checkAccessToken,
  studentAnswerController.getAllAnswersByExamId
);

//add answers of student for a specific test
router.post(
  "/:participationId",
  checkAccessToken,
  studentAnswerController.addAnswers
);

module.exports = router;
