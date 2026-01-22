const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, bookingsController.createBooking);
router.get('/mine', authenticateToken, bookingsController.getMyBookings);
router.delete('/:id', authenticateToken, bookingsController.cancelBooking);

module.exports = router;