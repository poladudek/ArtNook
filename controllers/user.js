const userService = require('../services/user');

const userController = {
  createUser: async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name) return res.status(400).json({ success: false, message: 'Imię i nazwisko są wymagane.' });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: 'Niepoprawny adres email.' });
    if (!password || password.length < 7) return res.status(400).json({ success: false, message: 'Hasło musi mieć minimum 7 znaków.' });

    const result = await userService.createUser(first_name, last_name, email, password);
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
  },

  getMe: async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    res.json({ success: true, user: req.user });
  }
};

module.exports = userController;

