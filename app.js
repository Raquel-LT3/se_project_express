// app.js 

const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require("./routes");


const { PORT = 3001 } = process.env;
const app = express();


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // You will replace this with a real ID from Postman later
  };
  next();
});

app.use("/", mainRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
