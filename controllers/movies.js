const movieService = require("../services/movies");

const movieController = {
    getAllMovies: async (req, res) => {
        try {
            const result = await movieService.getAllMovies({});
            const movies = result.data || [];

            const moviesWithImg = movies.map(movie => ({
                id: movie.id,
                title: movie.title,
                description: movie.description,
                duration: movie.duration,
                img_path: `images/movie_posters/id${movie.id}.jpg`,
                created_at: movie.created_at
            }));

            res.json({data: moviesWithImg});
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to get movies' });
        }
    },

    createMovie: async (req, res) => {
        try {
            const { title, description, duration, img_path } = req.body;
            if (!title || !description || !duration) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const result = await movieService.createMovie({ title, description, duration, img_path });
            res.status(201).json({ success: true, id: result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create movie' });
        }
    },

    updateMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, duration, img_path } = req.body;
            if (!title || !description || !duration) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            await movieService.updateMovie(id, { title, description, duration, img_path });
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update movie' });
        }
    },

    deleteMovie: async (req, res) => {
        try {
            const id = req.params.id;
            await movieService.deleteMovie(id);
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete movie' });
        }
    }
}

module.exports = movieController;
