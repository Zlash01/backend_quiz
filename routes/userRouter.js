const userController = require("../controllers/userController");
const middlewares = require("../controllers/middleware.js");
const router = require("express").Router();

// POST /api/users/login
router.post("/login", userController.verifyUser);

// POST /api/users/register
router.post("/register", userController.registerUser);

// GET /users/find/:id: Get user details by ID.
router.get(
  "/find/:id",
  middlewares.checkAccessToken,
  middlewares.checkAdmin,
  userController.getUserById
);

// GET /users: Get all users.
router.get(
  "/",
  middlewares.checkAccessToken,
  middlewares.checkAdmin,
  userController.getAllUsers
);

//GET /users/current: Get current user details.
router.get(
  "/current",
  middlewares.checkAccessToken,
  userController.getCurrentUser
);

// PUT /users/current: Update current user details.
router.put(
  "/current",
  middlewares.checkAccessToken,
  middlewares.checkStudent,
  userController.updateCurrentUser
);

// PUT /users/:id: Update user details by ID.
router.put(
  "/:id",
  middlewares.checkAccessToken,
  middlewares.checkAdmin,
  userController.updateUserById
);

// DELETE /users/:id: Delete a user by ID.
router.delete(
  "/:id",
  middlewares.checkAccessToken,
  middlewares.checkAdmin,
  userController.deleteUserById
);

module.exports = router;
