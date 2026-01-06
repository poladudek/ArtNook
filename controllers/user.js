const path = require('path');
const userService = require('../services/user');

const userController = {
  createUser: async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.createUser(email, password);
    res.json(result);
  },

   loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);

      if (!result.success) {
        return res.status(401).json(result);
      }

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};

module.exports = userController;

