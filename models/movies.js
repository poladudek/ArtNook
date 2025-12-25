const db = require('../config/db');
MovieModel = {
    isMovie: async (movie_id) => {
        const [movie] = await db.query(`SELECT * FROM Movies WHERE id=?`, [movie_id]);
        return movie[0];
    }

}

module.exports = MovieModel;