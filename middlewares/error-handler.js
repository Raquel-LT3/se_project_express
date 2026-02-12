// middlewares/error-handler.js

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "An error has occurred on the server" : err.message;
  res.status(statusCode).send({ message });
};