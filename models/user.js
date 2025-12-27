const db = require("../config/db");
const bcrypt = require('bcrypt');
const saltRounds = 10;

User = {
    reateUser: (email, password) => {
        return db.query('INSERT INTO Users (email, password) VALUES (?, ?)', [email, password]);
    }
};

module.exports = User;