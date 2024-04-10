const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/submit/", userController.submitExam);
router.get("/result/:id", userController.viewResults);

router.get("/all", userController.getAllUsers);
router.post("/verify", userController.verifyUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/get/:id", userController.getUserById);
router.get("/get/username/:username", userController.getUserByName);

module.exports = router;
