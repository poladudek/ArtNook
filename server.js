const express = require('express');
const path = require('path');
const cors = require('cors'); // allows connection between backend and frontend running on different ports
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const screeningRoutes = require('./routes/screening');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/user');
const bookingsRoutes = require('./routes/bookings');
app.use('/api/screenings', screeningRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api', userRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/images', express.static(path.join(__dirname, 'views/images'))); // Allows to display images on frontend

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
