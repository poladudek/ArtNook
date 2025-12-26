const screeningModel = require('../models/screening');
const movieModel = require('../models/movies');

const screeningService = {
  getAllScreenings: async () => {
    return await screeningModel.getAllScreenings();
  },

  createScreening: async (data) => {
    const {movie_id, room_id, start_time} = data;
    const movie = await movieModel.isMovie(movie_id);
    if (!movie){
      throw new Error('Movie is not in table');
    }
    
    const is_room_used = await screeningModel.isRoomUsed(movie_id, room_id, start_time);
    if (is_room_used){
      throw new Error('Room is already in use');
    }
    await screeningModel.createScreening(movie_id, room_id, start_time);

  },

  deleteScreening: async (id) => {
    await screeningModel.deleteScreening(id);
  },

  getScreeningById: async (id) => {
    return await screeningModel.getScreeningById(id);
  },

  updateScreening: async (id, newData) => {
    await screeningModel.updateScreening(id, newData);
  },

  reserveSeat: async (screeningId, seatNumber) => {
    const is_reserved = await screeningModel.checkIfSeatReserved(screeningId, seatNumber);
    if (is_reserved) {
      throw new Error('Seat is already reserved');
    }
    await screeningModel.reserveSeat(screeningId, seatNumber);
    return {message: `Seat ${seatNumber} reserved successfully`};
  },

  getFullScreeningInfoById: async (movie_id) => {
    return await screeningModel.getFullScreeningInfoById(movie_id);
  }
};

module.exports = screeningService;
