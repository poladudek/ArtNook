const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "sekret"

const userService = {
  createUser: async (email, password) => {
    try {
      const hash = await bcrypt.hash(password, 10);
      await userModel.createUser(email, hash);

      return {success: true, message: 'Rejestracja przebiegła pomyślnie.'};
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return {success: false, message: 'Konto o podanym adresie e-mail już istnieje.'};
        }
        console.error(err);
        return {success: false, message: 'Błąd serwera.'};
    }
  }
,
    loginUser: async (email, password) => {
    const [rows] = await userModel.getUserByEmail(email);

    if (!rows || rows.length === 0) {
      return { success: false, message: 'User not found' };
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { success: false, message: 'Invalid email or password' };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: '1h' }
    );

    return {
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role
      }
    };
  }
};

module.exports = userService;
