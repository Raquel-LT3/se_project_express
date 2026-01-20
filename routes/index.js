// routes/index.js
const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

// 1. PUBLIC ROUTES
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", itemRouter); // This allows GET /items without a token

// 2. PROTECT EVERYTHING BELOW
router.use(auth); 

// 3. PROTECTED ROUTES
router.use("/users", userRouter); // Handles /users/me
router.use("/items", itemRouter); // Handles POST, DELETE, etc. for /items

module.exports = router;