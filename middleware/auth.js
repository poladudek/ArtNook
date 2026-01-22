require('dotenv').config(); // Loads from .env into process.env
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET; // Key to validate tokens
if (!SECRET) {
  throw new Error('JWT_SECRET is not defined in .env');
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

function authorizeAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
}

module.exports = { authenticateToken, authorizeAdmin }; 