// app.js

require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate"); 
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const routes = require("./routes");
const NotFoundError = require("./errors/not-found-err");

const app = express();
const { PORT = 3001, MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI || "mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Error connecting to MongoDB:", err);
  });

// 1. Pre-route Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// 2. Crash Test (must be before routes and auth)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// 3. Main Routes
app.use(routes);

// 4. 404 Handler (Runs if no routes above match)
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// 5. Error Handling
app.use(errorLogger); // Logs the error first
app.use(errors());      // Celebrate/Joi validation errors
app.use(errorHandler); // Centralized custom error handler

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
