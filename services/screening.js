const screeningModel = require('../models/screening');
const movieModel = require('../models/movies');

const screeningService = {
  getAllScreenings: async (opts) => {
    return await screeningModel.getAllScreenings(opts);
  }, 

  createScreening: async (data) => {
    const db = require('../config/db');
    let {movie_id, room_id, room_name, start_time} = data;

    if (!movie_id) throw new Error('Należy podać movie_id');

    const movie = await movieModel.isMovie(movie_id);
    if (!movie){
      throw new Error('Podany film nie istnieje');
    }


    if (!room_id && room_name) {
      const [rows] = await db.query('SELECT id FROM Rooms WHERE room_name = ?', [room_name]);
      if (rows && rows.length) {
        room_id = rows[0].id;
      } else {
        const [res] = await db.query('INSERT INTO Rooms (room_name, seats_total) VALUES (?, ?)', [room_name, 30]);
        room_id = res.insertId;
      }
    }

    if (!room_id) throw new Error('room_id or room_name is required');

    const is_room_used = await screeningModel.isRoomUsed(movie_id, room_id, start_time);
    if (is_room_used){
      throw new Error('Sala jest już zajęta w podanym terminie.');
    }
    await screeningModel.createScreening(movie_id, room_id, start_time);

  },

  deleteScreening: async (id) => {
    await screeningModel.deleteScreening(id);
  },

  getScreeningById: async (id) => {
    return await screeningModel.getScreeningById(id);
  },


  reserveSeat: async (screeningId, seatNumber, userId) => {
    const bookingService = require('./bookings');
    return await bookingService.createBooking(userId, screeningId, seatNumber);
  },

  getFullScreeningInfoById: async (movie_id) => {
    return await screeningModel.getFullScreeningInfoById(movie_id);
  }
};

module.exports = screeningService;
