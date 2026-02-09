// app.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate"); 
const { requestLogger, errorLogger } = require("./middlewares/logger");
const NotFoundError = require("./errors/not-found-err");
const UnauthorizedError = require('../errors/unauthorized-err');
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middlewares 
app.use(cors());
app.use(express.json());

// Logging middleware 
app.use(requestLogger);

// Routes
app.use(routes);

// 404 Not Found handler
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});
// Error logging middleware
app.use(errorLogger);

// Celebrate error handler - catches Joi validation errors
app.use(errors());

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err); // Rule: Always log errors
  
  // Rule: If the error has no status, return 500
  const { statusCode = 500, message } = err;
  
  res.status(statusCode).send({
    message: statusCode === 500 
      ? "An error occurred on the server" 
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

