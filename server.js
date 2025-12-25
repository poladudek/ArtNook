const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const screeningRoutes = require('./routes/screening');
app.use('/api/screenings', screeningRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
