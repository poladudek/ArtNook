const movieModel = require("../models/movies")

const movieService = {
    getAllMovies: async () => {
        return await movieModel.getAllMovies();
    }
}

module.exports = movieService;
