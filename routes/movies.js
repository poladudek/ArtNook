const express = require("express");
const movieRouter = express.Router();
const movieController = require("../controllers/movies")

movieRouter.get("/", movieController.getAllMovies); 

module.exports = movieRouter;