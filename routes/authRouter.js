const authController = require("../controllers/authenticationController");
const router = require("express").Router();

// POST /api/auth/login
router.post("/login", authController.verifyUser);

// POST /api/auth/register
router.post("/register", authController.registerUser);

module.exports = router;
