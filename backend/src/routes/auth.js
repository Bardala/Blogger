const asyncHandler = require("express-async-handler");

const { signup, login } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));
module.exports = router;
