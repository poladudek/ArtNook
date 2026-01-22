const db = require("../config/db");

const User = {
    createUser: (first_name, last_name, email, password) => {
        return db.query('INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, email, password]);
    },

    getUserByEmail: (email) => {
        return db.query('SELECT * FROM Users WHERE email = ?', [email]);
    }
};

module.exports = User;