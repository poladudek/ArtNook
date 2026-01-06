const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user")

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;
