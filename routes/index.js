// routes/index.js
const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { getItems } = require("../controllers/clothingItems"); // Import the specific controller

// 1. PUBLIC ROUTES
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems); // Call the controller function directly here

// 2. PROTECT EVERYTHING BELOW
router.use(auth); 

// 3. PROTECTED ROUTES
router.use("/users", userRouter); 
router.use("/items", itemRouter); // This handles POST and DELETE /items

module.exports = router;