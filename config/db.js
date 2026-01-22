require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true, // Wait for conneciton instead of throwing error
  connectionLimit: Number(process.env.DB_CONN_LIMIT),
  queueLimit: 0
});

module.exports = pool; 
