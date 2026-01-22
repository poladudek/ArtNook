const db = require('../config/db');
ScreeningModel = {
    getAllScreenings: async ({ page = 1, per_page = 10 } = {}) => {
       const [screenings] = await db.query(`
            SELECT s.id, s.start_time, s.end_time, r.room_name, m.title AS movie_title, m.id AS movie_id, m.duration
            FROM Screenings s
            JOIN Movies m ON s.movie_id = m.id
            JOIN Rooms r ON s.room_id = r.id
            ORDER BY s.start_time ASC
        `);
       return { data: screenings};
    }, 

    createScreening: async (movie_id, room_id, start_time) => {
        const [duration] = await db.query('SELECT duration FROM Movies WHERE id = ?', [movie_id]);
        const duration_in_min = duration[0].duration;
        const startDate = new Date(start_time);
        const endDate = new Date(startDate.getTime() + duration_in_min * 60000);

        await db.query( `INSERT INTO Screenings (movie_id, room_id, start_time, end_time)
        VALUES (?, ?, ?, ?)`, [movie_id, room_id, startDate, endDate]);
    },

    deleteScreening: async (id) => {
        await db.query(`DELETE FROM Screenings WHERE id= ?`, [id]);
    },

    getScreeningById: async (id) => {
        const [screeningRows] = await db.query('SELECT * FROM Screenings WHERE id = ?', [id]);
        if (!screeningRows || screeningRows.length === 0) return null;
        const screening = screeningRows[0];

        const [roomRows] = await db.query('SELECT seats_total, room_name FROM Rooms WHERE id = ?', [screening.room_id]);
        const seats_total = roomRows && roomRows.length ? roomRows[0].seats_total : 25;

        const [bookedRows] = await db.query('SELECT seat_number FROM Bookings WHERE screening_id = ? AND status = "active"', [id]);
        const bookedSeatNumbers = bookedRows.map(r => r.seat_number);

        const seats = bookedSeatNumbers.map(sn => ({ seat_number: sn, is_booked: true }));
        
        // Creates a new object ({} prevents modifying the original) that combines screening data with seats info
        return Object.assign({}, screening, { seats, seats_total, room_name: roomRows[0] ? roomRows[0].room_name : null });
    },

    isRoomUsed: async (movie_id, room_id, start_time) => {
    const [movie] = await db.query('SELECT duration FROM Movies WHERE id = ?', [movie_id]);

    const durationMinutes = movie[0].duration;
    const startDate = new Date(start_time);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

    const [colliding_movie] = await db.query(
        `
        SELECT *
        FROM Screenings
        WHERE room_id = ?
        AND start_time < ?
        AND end_time > ?
        LIMIT 1
        `,
        [room_id, endDate, startDate]);
    return colliding_movie.length > 0;
    },

    getFullScreeningInfoById: async (movie_id) => {
        const [screenings] = await db.query(`SELECT s.id, s.start_time, s.end_time, r.room_name, m.description, m.id AS movie_id, m.title, m.duration
            FROM Screenings s
            JOIN Movies m ON s.movie_id = m.id
            JOIN Rooms r ON s.room_id = r.id
            WHERE s.movie_id = ?`, [movie_id]);
        return screenings;

    }

}

module.exports = ScreeningModel;