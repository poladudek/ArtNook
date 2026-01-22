const BookingModel = require('../models/bookings');
const screeningModel = require('../models/screening');

const bookingService = {
  createBooking: async (user_id, screening_id, seat_number) => {
    const screening = await screeningModel.getScreeningById(screening_id);
    if (!screening) {
      throw new Error('Screening not found');
    }

    try {
      const bookingId = await BookingModel.createBooking(user_id, screening_id, seat_number);
      return { id: bookingId };
    } catch (err) {
      if (err && err.code === 'SEAT_TAKEN') {
        const e = new Error('Miejsce jest już zajęte.');
        e.status = 409;
        throw e;
      }
      throw err;
    }
  },

  getMyBookings: async (user_id) => {
    return await BookingModel.getBookingsByUser(user_id);
  },

  cancelBooking: async (booking_id, user_id) => {
    const ok = await BookingModel.cancelBooking(booking_id, user_id);
    if (!ok) {
      const e = new Error('Rezerwacja nie została znaleziona lub nie można jej anulować.');
      e.status = 404;
      throw e;
    }
    return true;
  }
};

module.exports = bookingService;