const { postOrDeleteLike } = require("../controllers/likesController");
const express = require("express");
const router = express.Router();

router.post("/blogs/:id/like", postOrDeleteLike);

module.exports = router;
