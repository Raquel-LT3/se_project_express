// app.js 

const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;
const app = express();

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});