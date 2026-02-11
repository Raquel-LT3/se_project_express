// middlewares/error-handler.js

const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "An error has occurred on the server" : err.message;
  res.status(statusCode).send({ message });
};

module.exports = errorHandler;