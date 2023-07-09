const asyncHandler = require("express-async-handler");

const {
  createComment,
  getComments,
} = require("../controllers/commentController");
const express = require("express");
const router = express.Router();

router.post("/createComment", asyncHandler(createComment));
router.get("/getComments", asyncHandler(getComments));

module.exports = router;
