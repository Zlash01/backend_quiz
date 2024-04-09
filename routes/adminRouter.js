const adminController = require("../controllers/adminController");
const router = require("express").Router();

// //POST /api/admin/login
router.post("/login", adminController.login);

//GET /api/admin/exams
router.get("/exams", adminController.getExams);

//POST /api/admin/exams
router.post("/exams", adminController.addExam);

//PUT /api/admin/exams/:id
router.put("/exams/:id", adminController.updateExam);

//DELETE /api/admin/exams/:id
router.delete("/exams/:id", adminController.deleteExam);

//GET /api/admin/users
router.get("/users", adminController.getUsers);

//POST /api/admin/users
router.post("/users", adminController.addUser);

//PUT /api/admin/users/:id
router.put("/users/:id", adminController.updateUser);

//DELETE /api/admin/users/:id
router.delete("/users/:id", adminController.deleteUser);

//GET /api/admin/user/stats
router.get("/user/stats", adminController.getAllStats);

module.exports = router;
