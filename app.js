// app.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const { PORT = 3001 } = process.env;
const { NOT_FOUND_ERROR } = require("./utils/constants"); // Add this import

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Requested resource not found" });
});


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

