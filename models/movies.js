const db = require('../config/db');
MovieModel = {
    isMovie: async (movie_id) => {
        const [movie] = await db.query(`SELECT * FROM Movies WHERE id=?`, [movie_id]);
        return movie[0];
    },
    getAllMovies: async () => {
        const [movies] = await db.query(`SELECT * FROM Movies`);
        return movies;
    }
}

module.exports = MovieModel;