const screeningService = require("../services/screening");

const screeningController = {
  getAllScreenings: async (req, res) => {
    const all_screenings = await screeningService.getAllScreenings();
    res.json(all_screenings);
  },

  createScreening: async (req, res) => {
    await screeningService.createScreening(req.body); // params are in header here we are using body
    res.json({ message: `Screening created correctly`});
  },

  deleteScreening: async (req, res) => {
    const id = req.params.id;
    await screeningService.deleteScreening(id);
    res.json({message: `Screening ${id} deleted correctly`});
  },

  getScreeningById: async (req, res) => {
    const id = req.params.id;
    const screening = await screeningService.getScreeningById(id);
    res.json(screening);
  },

  updateScreening: async (req, res) => {
    const id = req.params.id;
    const new_content = req.body;
    await screeningService.updateScreening(id, new_content);
    res.json({message: `Screenning ${id} updated correctly.`});
  },

  reserveSeat: async (req, res) => {
    const id = req.params.id;
    const seat_num = req.params.seat_num;
    await screeningService.reserveSeat(id, seat_num);
    res.json({message: `Seat ${seat_num} for screening with ID ${id} reserved correctly.`})
  },

  getFullScreeningInfoById: async (req, res) => {
    const movie_id = req.params.id;
    const screening = await screeningService.getFullScreeningInfoById(movie_id);
    res.json(screening);
  }
};

module.exports = screeningController;
