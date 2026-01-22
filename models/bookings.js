const db = require('../config/db');

const BookingModel = {
  createBooking: async (user_id, screening_id, seat_number) => {
    try {
      const [result] = await db.query(
        `INSERT INTO Bookings (user_id, screening_id, seat_number) VALUES (?, ?, ?)`,
        [user_id, screening_id, seat_number]
      );
      return result.insertId;
    } catch (err) {
      if (err && err.code === 'ER_DUP_ENTRY') { // MySQL error code
        const e = new Error('Seat is already booked');
        e.code = 'SEAT_TAKEN';
        throw e;
      }
      throw err;
    }
  },

  getBookingsByUser: async (user_id) => {
    const [rows] = await db.query(
      `SELECT b.id, b.seat_number, b.status, b.created_at, sc.id AS screening_id, sc.start_time, sc.end_time, r.room_name, m.title AS movie_title
      FROM Bookings b
      JOIN Screenings sc ON b.screening_id = sc.id
      JOIN Rooms r ON sc.room_id = r.id
      JOIN Movies m ON sc.movie_id = m.id
      WHERE b.user_id = ? AND b.status = 'active'
      ORDER BY b.created_at DESC`,
      [user_id]
    );
    return rows;
  },

  cancelBooking: async (booking_id, user_id) => {
    const [result] = await db.query(
      `UPDATE Bookings SET status = 'cancelled' WHERE id = ? AND user_id = ? AND status = 'active'`,
      [booking_id, user_id]
    );
    return result.affectedRows > 0;
  },

  getBookedSeatsByScreening: async (screening_id) => {
    const [rows] = await db.query(
      `SELECT seat_number FROM Bookings WHERE screening_id = ? AND status = 'active'`,
      [screening_id]
    );
    return rows.map(r => r.seat_number);
  }
};

module.exports = BookingModel;