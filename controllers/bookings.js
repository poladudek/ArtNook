const bookingService = require('../services/bookings');

const bookingsController = {
  createBooking: async (req, res) => {
    try {
      const userId = req.user.id;
      const { screening_id, seat_number } = req.body;
      const result = await bookingService.createBooking(userId, screening_id, seat_number);
      res.status(201).json({ success: true, booking_id: result.id });
    } catch (err) {
      if (err.status === 409) return res.status(409).json({ success: false, message: err.message });
      if (err.message === 'Screening not found') return res.status(404).json({ success: false, message: err.message });
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  getMyBookings: async (req, res) => {
    try {
      const userId = req.user.id;
      const bookings = await bookingService.getMyBookings(userId);
      res.json(bookings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const userId = req.user.id;
      const bookingId = req.params.id;
      await bookingService.cancelBooking(bookingId, userId);
      res.json({ success: true });
    } catch (err) {
      if (err.status === 404) return res.status(404).json({ success: false, message: err.message });
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};

module.exports = bookingsController;