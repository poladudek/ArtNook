const db = require("../config/db");

const User = {
    createUser: (email, password) => {
        return db.query('INSERT INTO Users (email, password) VALUES (?, ?)', [email, password]);
    },

    getUserByEmail: (email) => {
        return db.query('SELECT * FROM Users WHERE email = ?', [email]);
    }
};

module.exports = User;