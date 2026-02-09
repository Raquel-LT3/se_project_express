// middlewares/auth.js

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // Instead of res.status(401), use next() with our new error
    return next(new UnauthorizedError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // If the token is invalid or expired, pass the error to the handler
    return next(new UnauthorizedError('Authorization required'));
  }

  req.user = payload; // assigning the payload to the request object
  return next(); // sending the request to the next middleware
};