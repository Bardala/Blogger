const asyncHandler = require("express-async-handler");

const { postOrDeleteLike } = require("../controllers/likesController");
const express = require("express");
const router = express.Router();

router.post("/blogs/:id/like", asyncHandler(postOrDeleteLike));

module.exports = router;
