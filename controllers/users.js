// controllers/users.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  SUCCESS_CODE,
  CREATED_CODE,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  CONFLICT_ERROR, 
  UNAUTHORIZED_ERROR, 
} = require("../utils/constants");


const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST_ERROR).send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      res.status(SUCCESS_CODE).send({ token });
    })
    .catch((err) => {
      // Use UNAUTHORIZED_ERROR instead of 401
      res.status(UNAUTHORIZED_ERROR).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({ name, avatar, email, password: hashedPassword })
        .then((user) => {
          const userObject = user.toObject();
          delete userObject.password;
          res.status(CREATED_CODE).send(userObject);
        })
        .catch((err) => {
          if (err.code === 11000) {
            // Use CONFLICT_ERROR instead of 409
            return res.status(CONFLICT_ERROR).send({ message: "User with this email already exists" });
          }
          if (err.name === "ValidationError") {
            return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
          }
          return res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
        });
    });
};


const getCurrentUser = (req, res) => {
  const { _id } = req.user; // From Auth Middleware

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" }));
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
    });
};

module.exports = {
  login,
  createUser,
  getCurrentUser,
  updateProfile,
};