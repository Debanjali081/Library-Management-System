const jwt = require("jsonwebtoken");

const generateToken = (userId, isAdmin) => {
  return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { generateToken };