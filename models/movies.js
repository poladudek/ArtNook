const db = require('../config/db');
MovieModel = {
    isMovie: async (movie_id) => {
        const [movie] = await db.query(`SELECT * FROM Movies WHERE id=?`, [movie_id]);
        return movie[0];
    },
    getAllMovies: async ({ page = 1, per_page = 10 } = {}) => {
        const [movies] = await db.query('SELECT * FROM Movies ORDER BY created_at DESC');
        return { data: movies};
    }, 
    createMovie: async ({ title, description, duration, img_path }) => {
        const [result] = await db.query(
            `INSERT INTO Movies (title, description, duration, img_path, created_at) VALUES (?, ?, ?, ?, NOW())`,
            [title, description, duration, img_path]
        );
        return result;
    },
    updateMovie: async (id, { title, description, duration, img_path }) => {
        return await db.query(
            `UPDATE Movies SET title = ?, description = ?, duration = ?, img_path = ? WHERE id = ?`,
            [title, description, duration, img_path, id]
        );
    },
    deleteMovie: async (id) => {
        return await db.query(`DELETE FROM Movies WHERE id=?`, [id]);
    }
}

module.exports = MovieModel;