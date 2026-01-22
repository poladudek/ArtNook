const express = require("express");
const movieRouter = express.Router();
const movieController = require("../controllers/movies")
const { authenticateToken, authorizeAdmin } = require("../middleware/auth");

movieRouter.get("/", movieController.getAllMovies); 
movieRouter.post("/", authenticateToken, authorizeAdmin, movieController.createMovie);
movieRouter.put("/:id", authenticateToken, authorizeAdmin, movieController.updateMovie);
movieRouter.delete("/:id", authenticateToken, authorizeAdmin, movieController.deleteMovie);

module.exports = movieRouter;