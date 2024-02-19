require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY
const generateToken = (payload) => {
    if(!payload) return null;
    else return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return null; 
    }
  };

module.exports = { 
    generateToken,
    verifyToken
}