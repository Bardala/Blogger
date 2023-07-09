const asyncHandler = require("express-async-handler");

const {
  getAllBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  // getBlogsByUserId,
  getBlogsByUsername,
  addAuthorName,
  likeBlog,
} = require("../controllers/blogsController");
const express = require("express");
const router = express.Router();

router.put("/blogs/:id/like", asyncHandler(likeBlog));
router.get("/blogs", asyncHandler(getAllBlogs));
router.get("/personalBlogs/:username", asyncHandler(getBlogsByUsername));
router.post("/createBlog", asyncHandler(createBlog));
router.get("/blogs/:id", asyncHandler(getBlog));
router.delete("/blogs/:id/delete", asyncHandler(deleteBlog));

module.exports = router;
