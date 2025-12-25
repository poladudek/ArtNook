const screeningModel = require('../models/screening');

const ScreeningService = {
  getAllScreenings: async () => {
    return await screeningModel.getAllScreenings();
  },

  createScreening: async (data) => {

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
  }
};

module.exports = ScreeningService;
