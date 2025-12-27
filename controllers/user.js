const userService = require('../services/user');

const userController = {
  createUser: async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.createUser(email, password);
    res.json(result);
  }
};

module.exports = userController;

