const {
  createComment,
  getComments,
} = require("../controllers/commentController");
const express = require("express");
const router = express.Router();

router.post("/createComment", createComment);
router.get("/getComments", getComments);

module.exports = router;
