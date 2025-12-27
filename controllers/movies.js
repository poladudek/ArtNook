const movieService = require("../services/movies");

const movieController = {
    getAllMovies: async (req, res) => {
        try {
            const movies = await movieService.getAllMovies();

            const moviesWithRelativeImg = movies.map(movie => ({
                id: movie.id,
                title: movie.title,
                description: movie.description,
                duration: movie.duration,
                img_path: `images/movie_posters/id${movie.id}.jpg`
            }));

            res.json(moviesWithRelativeImg);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to get movies' });
        }
    }
}

module.exports = movieController;
