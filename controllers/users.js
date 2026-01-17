// controllers/users.js

const User = require("../models/user");
const {
  SUCCESS_CODE,
  CREATED_CODE,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/constants");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS_CODE).send(users))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "User ID not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid user ID format" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data passed to create user" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};