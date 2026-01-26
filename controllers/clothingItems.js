// controllers/clothingItems.js

const ClothingItem = require("../models/clothingItem");
const {
  SUCCESS_CODE,
  CREATED_CODE,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  FORBIDDEN_ERROR, 
  INTERNAL_SERVER_ERROR,
} = require("../utils/constants");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS_CODE).send(items))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_CODE).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data passed to create item" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; 

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      
      if (item.owner.toString() !== userId) {
        
        return res.status(FORBIDDEN_ERROR).send({ message: "You do not have permission to delete this item" });
      }

     return ClothingItem.findByIdAndDelete(itemId)
        .then((deletedItem) => res.status(SUCCESS_CODE).send(deletedItem));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid item ID" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(SUCCESS_CODE).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item ID not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid item ID format" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(SUCCESS_CODE).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item ID not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid item ID format" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};