const db = require('../config/db');
ScreeningModel = {
    getAllScreenings: async () => {
       const [all_screenings] = await db.query('SELECT * from Screenings');
        return all_screenings;
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
    const [screening] = await db.query(
      'SELECT * FROM Screenings WHERE id = ?', [id]);
    return screening[0];
    },
    updateScreening: async (id, new_data) =>
    {
        return;
    },
    reserveSeat: async(screeningId, seatNumber) =>{
        return;
    }

}

module.exports = ScreeningModel;