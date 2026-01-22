const screeningService = require("../services/screening");

const screeningController = {
  getAllScreenings: async (req, res) => {
    const page = req.query.page || 1;
    const per_page = req.query.per_page || 12;
    const result = await screeningService.getAllScreenings({ page, per_page });
    res.json({ data: result.data, meta: { total: result.total, page: Number(page), per_page: Number(per_page), total_pages: Math.ceil(result.total / Number(per_page)) } });
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

  reserveSeat: async (req, res) => {
    try {
      const id = req.params.id;
      const seat_num = req.params.seat_num;
      const userId = req.user && req.user.id;
      if (!userId) return res.status(401).json({ message: 'Authentication required' });
      await screeningService.reserveSeat(id, seat_num, userId);
      res.json({ message: `Seat ${seat_num} for screening with ID ${id} reserved correctly.` });
    } catch (err) {
      if (err.status === 409 || err.message === 'Seat already reserved' || err.code === 'SEAT_TAKEN') {
        return res.status(409).json({ message: 'Seat is already reserved' });
      }
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getFullScreeningInfoById: async (req, res) => {
    const movie_id = req.params.id;
    const screening = await screeningService.getFullScreeningInfoById(movie_id);
    res.json(screening);
  }
};

module.exports = screeningController;
