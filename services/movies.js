const movieModel = require("../models/movies");

const movieService = {
  getAllMovies: async () => {
    return await movieModel.getAllMovies();
  },

  createMovie: async (movie) => {
    return await movieModel.createMovie(movie);
  },

  updateMovie: async (id, movie) => {
    return await movieModel.updateMovie(id, movie);
  },

  deleteMovie: async (id) => {
    return await movieModel.deleteMovie(id);
  }
}

module.exports = movieService;
