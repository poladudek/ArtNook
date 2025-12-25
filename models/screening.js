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
        await db.query(`DELETE FROM Screenings WHERE id=${id}`);
    },
    getScreeningById: async (id) => {
        screening = db.query(`SELECT screening FROM Screenings WHERE screening.id = ${id}`);
        return screening;
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