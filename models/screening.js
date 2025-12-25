const db = require('../config/db');
ScreeningModel = {
    getAllScreenings: async () => {
       const [all_screenings] = await db.query('SELECT * from Screenings');
        return all_screenings;
    },
    createScreening: async ()  => {
        return;
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