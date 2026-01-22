const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user")
const { authenticateToken } = require("../middleware/auth");

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/me", authenticateToken, userController.getMe);

module.exports = userRouter;
