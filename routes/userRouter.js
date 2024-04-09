const userController = require("../controllers/userController");
const router = require("express").Router();

// POST user/api/add
router.post("/add", userController.addUser);

// GET user/api/all
router.get("/all", userController.getAllUsers);

// POST user/api/verify
router.post("/verify", userController.verifyUser);

// PUT user/api/update/:id
router.put("/update/:id", userController.updateUser);

// DELETE user/api/delete/:id
router.delete("/delete/:id", userController.deleteUser);

// GET user/api/get/:id
router.get("/get/:id", userController.getUserById);

// GET user/api/get/username/:username
router.get("/get/username/:username", userController.getUserByName);

module.exports = router;
