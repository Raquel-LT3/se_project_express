// routes/clothingItems.js

const router = require("express").Router();
const auth = require("../middlewares/auth"); // 1. Import auth
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Public route
router.get("/", getItems);

const { validateCardBody, validateId } = require("../middlewares/validation");

// 2. Add 'auth' before the validator
router.post("/", auth, validateCardBody, createItem); 
router.delete("/:itemId", auth, validateId, deleteItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;