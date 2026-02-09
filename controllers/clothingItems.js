const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err"); // You'll want to create this one too!

// 1. Get all items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items)) // status(200) is default
    .catch(next); // Rule: Pass all errors to the centralized handler
};

// 2. Create an item
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data passed to create item"));
      } else {
        next(err);
      }
    });
};

// 3. Delete an item (Consolidated version)
// controllers/clothingItems.js

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("No item with matching ID found");
    })
    .then((item) => {
      // --- THIS IS THE BLOCK ---
      if (item.owner.toString() !== userId) {
        return next(new ForbiddenError("You do not have permission to delete this item"));
      }
      
      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.send({ message: "Item deleted" })
      );
      // --- END OF BLOCK ---
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// 4. Like an item
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// 5. Dislike an item
const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};