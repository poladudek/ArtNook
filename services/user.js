const userModel = require('../models/user');
const bcrypt = require('bcrypt');

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
};

module.exports = userService;
